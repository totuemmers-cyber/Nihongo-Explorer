// === Section Class: Generic reusable section manager ===
// Each section (kanji, grammar, vocab, counters, radicals) is an instance
// configured via a config object from section-configs.js.

function Section(config) {
  this.name = config.name;
  this.config = config;
  this.allItems = [];
  this.filteredItems = [];
  this.currentDetailIndex = -1;
  this.filters = {};
  this.currentSort = config.defaultSort || null;
  this.batchSize = config.batchSize || 0;
  this.renderedCount = 0;
  this.isRendering = false;
  this.scrollObserver = null;
  this.scrollSentinel = null;
  this.renderTimer = null;
  this.renderGeneration = 0;
  this.searchTimeout = null;
  this.initialized = false;
  this.isLoaded = false;
  this.isLoading = false;
  this.isComplete = false;

  // Resolve DOM elements from config.dom (map of key -> element ID)
  this.dom = {};
  var domMap = config.dom || {};
  for (var key in domMap) {
    if (domMap.hasOwnProperty(key)) {
      this.dom[key] = document.getElementById(domMap[key]);
    }
  }

  // Initialize filter state from filterGroups
  var groups = config.filterGroups || [];
  for (var i = 0; i < groups.length; i++) {
    this.filters[groups[i].stateKey] = groups[i].defaultValue || 'all';
  }

  this._initEvents();
}

// --- Public Methods ---

Section.prototype.setItems = function (items, options) {
  this.allItems = this._prepareItems(items || []);
  this.isLoaded = true;
  this.isLoading = false;
  this.applyFilters(options);
};

Section.prototype.appendItems = function (items, options) {
  var nextItems = this._prepareItems(items || []);
  if (!nextItems.length) return;
  this.allItems = this.allItems.concat(nextItems);
  this.isLoaded = true;
  this.isLoading = false;
  this.applyFilters(options);
};

Section.prototype.applyFilters = function (options) {
  options = options || {};
  var query = this.dom.search ? this.dom.search.value.trim().toLowerCase() : '';
  var self = this;
  this._usingSearchRanking = false;
  this._preserveGridUntilRendered = !!options.preserveGrid;
  this._resetRenderState();

  if (query && this.config.searchScoreFn) {
    var scoredItems = [];
    for (var i = 0; i < this.allItems.length; i++) {
      var item = this.allItems[i];
      if (!this.config.filterFn(item, '', this.filters, this)) continue;
      var match = this.config.searchScoreFn(item, query, this);
      if (!match) continue;
      scoredItems.push({ item: item, match: match });
    }

    var activeItems = scoredItems;
    var compareFn = this.config.searchCompareFn;

    activeItems.sort(function (a, b) {
      if (a.match.score !== b.match.score) return b.match.score - a.match.score;
      if (compareFn) return compareFn(a.item, b.item, self.currentSort);
      return 0;
    });

    activeItems = activeItems.slice(0, this.config.searchResultLimit || 8);

    this.filteredItems = activeItems.map(function (entry) {
      return entry.item;
    });
    this._usingSearchRanking = true;
  } else {
    this.filteredItems = this.allItems.filter(function (item) {
      return self.config.filterFn(item, query, self.filters, self);
    });
    this.sort();
  }

  this.renderedCount = 0;
  if (this.dom.grid && !this._preserveGridUntilRendered) this.dom.grid.innerHTML = '';
  this.render();
  if (window.app && typeof window.app.updateCount === 'function') {
    window.app.updateCount();
  }
};

Section.prototype.sort = function () {
  if (this.config.sortFn) {
    this.config.sortFn(this.filteredItems, this.currentSort);
  }
};

Section.prototype.render = function () {
  if (this.batchSize > 0) {
    this.renderBatch();
  } else {
    this._renderAll();
  }
};

Section.prototype._renderAll = function () {
  var grid = this.dom.grid;
  if (!grid) return;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < this.filteredItems.length; i++) {
    fragment.appendChild(this.config.createCard(this.filteredItems[i], i, this));
  }
  if (this._preserveGridUntilRendered) {
    grid.replaceChildren(fragment);
  } else {
    grid.innerHTML = '';
    grid.appendChild(fragment);
  }
  this._preserveGridUntilRendered = false;
  if (this.dom.noResults) {
    this.dom.noResults.classList.toggle('hidden', this.filteredItems.length > 0);
  }
};

Section.prototype.renderBatch = function () {
  if (this.isRendering) return;
  if (!this.dom.grid) return;
  this.isRendering = true;

  var end = Math.min(this.renderedCount + this.batchSize, this.filteredItems.length);
  var fragment = document.createDocumentFragment();

  for (var i = this.renderedCount; i < end; i++) {
    fragment.appendChild(this.config.createCard(this.filteredItems[i], i, this));
  }

  if (this._preserveGridUntilRendered && this.renderedCount === 0) {
    this.dom.grid.replaceChildren(fragment);
    this._preserveGridUntilRendered = false;
  } else {
    this.dom.grid.appendChild(fragment);
  }
  this.renderedCount = end;
  this.isRendering = false;

  if (this.dom.noResults) {
    this.dom.noResults.classList.toggle('hidden', this.filteredItems.length > 0);
  }

  if (this.renderedCount < this.filteredItems.length) {
    this._scheduleScrollObserver();
  }
};

Section.prototype._prepareItems = function (items) {
  if (!this.config.prepareItem) return items;
  for (var i = 0; i < items.length; i++) {
    this.config.prepareItem(items[i]);
  }
  return items;
};

Section.prototype._resetRenderState = function () {
  this.renderGeneration += 1;
  this.isRendering = false;
  if (this.renderTimer) {
    if (window.cancelIdleCallback) window.cancelIdleCallback(this.renderTimer);
    else clearTimeout(this.renderTimer);
    this.renderTimer = null;
  }
  if (this.scrollObserver) {
    this.scrollObserver.disconnect();
    this.scrollObserver = null;
  }
  if (this.scrollSentinel && this.scrollSentinel.parentNode) {
    this.scrollSentinel.parentNode.removeChild(this.scrollSentinel);
  }
  this.scrollSentinel = null;
};

Section.prototype._scheduleScrollObserver = function () {
  var self = this;
  var generation = this.renderGeneration;
  var schedule = window.requestIdleCallback || function (cb) { return setTimeout(cb, 0); };
  this.renderTimer = schedule(function () {
    self.renderTimer = null;
    if (generation !== self.renderGeneration) return;
    self._setupScrollObserver();
  });
};

Section.prototype._setupScrollObserver = function () {
  if (this.scrollObserver) this.scrollObserver.disconnect();
  if (!this.dom.grid || this.renderedCount >= this.filteredItems.length) return;

  var sentinel = document.createElement('div');
  sentinel.className = 'scroll-sentinel';
  this.dom.grid.appendChild(sentinel);
  this.scrollSentinel = sentinel;

  var self = this;
  var generation = this.renderGeneration;
  this.scrollObserver = new IntersectionObserver(function (entries) {
    if (generation !== self.renderGeneration) return;
    if (entries[0].isIntersecting) {
      self.scrollObserver.disconnect();
      self.scrollObserver = null;
      sentinel.remove();
      self.scrollSentinel = null;
      self.renderBatch();
    }
  }, { rootMargin: '200px' });

  this.scrollObserver.observe(sentinel);
};

Section.prototype.openDetail = function (index) {
  if (index < 0 || index >= this.filteredItems.length) return;
  this._triggerEl = document.activeElement;
  this.currentDetailIndex = index;
  var item = this.filteredItems[index];
  this.config.openDetail(item, this.dom, this);
  if (this.dom.overlay) this.dom.overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (window.app && typeof window.app.playPop === 'function') {
    window.app.playPop();
  }
  // Focus the close button so keyboard users land inside the overlay
  if (this.dom.closeBtn) this.dom.closeBtn.focus();
};

// Open the detail overlay for a specific item, regardless of the active tab or the
// current filter. If the item is in the filtered view, use openDetail (keeps prev/next
// navigation); otherwise open the overlay directly with navigation disabled. Used by
// the Lernpfad so a to-learn item opens in place and closing returns to the Lernpfad.
Section.prototype.showItem = function (item) {
  if (!item) return false;
  var idx = this.filteredItems.indexOf(item);
  if (idx !== -1) { this.openDetail(idx); return true; }
  this._triggerEl = document.activeElement;
  this.currentDetailIndex = -1;
  this.config.openDetail(item, this.dom, this);
  if (this.dom.overlay) this.dom.overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (window.app && typeof window.app.playPop === 'function') window.app.playPop();
  if (this.dom.closeBtn) this.dom.closeBtn.focus();
  return true;
};

Section.prototype.closeDetail = function () {
  if (this.dom.overlay) this.dom.overlay.classList.add('hidden');
  document.body.style.overflow = '';
  this.currentDetailIndex = -1;
  // Return focus to the element that opened the overlay
  if (this._triggerEl && this._triggerEl.focus) {
    this._triggerEl.focus();
    this._triggerEl = null;
  }
};

Section.prototype.navigateDetail = function (direction) {
  var newIndex = this.currentDetailIndex + direction;
  if (newIndex >= 0 && newIndex < this.filteredItems.length) {
    this.openDetail(newIndex);
  }
};

Section.prototype.isOverlayOpen = function () {
  return this.dom.overlay && !this.dom.overlay.classList.contains('hidden');
};

// Reset a filter group's UI + state (used for cross-section navigation)
Section.prototype.resetFilterGroup = function (stateKey) {
  this.filters[stateKey] = 'all';
  var groups = this.config.filterGroups || [];
  for (var i = 0; i < groups.length; i++) {
    if (groups[i].stateKey === stateKey) {
      var selector = groups[i].selector;
      var controlsEl = this.dom.controls || document;
      controlsEl.querySelectorAll(selector).forEach(function (btn) {
        btn.classList.toggle('active',
          btn.getAttribute(groups[i].dataAttr) === 'all');
      });
      break;
    }
  }
};

// --- Private: Event Wiring ---

Section.prototype._initEvents = function () {
  var self = this;

  // Search input with 200ms debounce
  if (this.dom.search) {
    this.dom.search.addEventListener('input', function () {
      clearTimeout(self.searchTimeout);
      if (self.dom.clearSearch) {
        self.dom.clearSearch.classList.toggle('visible', self.dom.search.value.length > 0);
      }
      self.searchTimeout = setTimeout(function () {
        self.applyFilters();
      }, 200);
    });
  }

  // Clear search button
  if (this.dom.clearSearch) {
    this.dom.clearSearch.addEventListener('click', function () {
      self.dom.search.value = '';
      self.dom.clearSearch.classList.remove('visible');
      self.applyFilters();
      self.dom.search.focus();
    });
  }

  // Sort select
  if (this.dom.sort) {
    this.dom.sort.addEventListener('change', function () {
      self.currentSort = this.value;
      self.applyFilters();
    });
  }

  // Filter button groups
  var groups = this.config.filterGroups || [];
  var controlsEl = this.dom.controls || document;
  for (var i = 0; i < groups.length; i++) {
    (function (group) {
      controlsEl.querySelectorAll(group.selector).forEach(function (btn) {
        btn.addEventListener('click', function () {
          controlsEl.querySelectorAll(group.selector).forEach(function (b) {
            b.classList.remove('active');
          });
          this.classList.add('active');
          self.filters[group.stateKey] = this.getAttribute(group.dataAttr);
          if (window.app && typeof window.app.playSwoosh === 'function') {
            window.app.playSwoosh();
          }
          self.applyFilters();
        });
      });
    })(groups[i]);
  }

  // Overlay close button
  if (this.dom.closeBtn) {
    this.dom.closeBtn.addEventListener('click', function () {
      self.closeDetail();
    });
  }

  // Overlay backdrop click
  if (this.dom.overlay) {
    this.dom.overlay.addEventListener('click', function (e) {
      if (e.target === self.dom.overlay) self.closeDetail();
    });

    // Focus trap: keep Tab within overlay while open
    this.dom.overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = self.dom.overlay.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // Navigation buttons
  if (this.dom.prevBtn) {
    this.dom.prevBtn.addEventListener('click', function () {
      self.navigateDetail(-1);
    });
  }
  if (this.dom.nextBtn) {
    this.dom.nextBtn.addEventListener('click', function () {
      self.navigateDetail(1);
    });
  }
};
