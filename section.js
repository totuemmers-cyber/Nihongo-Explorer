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
  this.searchTimeout = null;
  this.initialized = false;

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

Section.prototype.setItems = function (items) {
  this.allItems = items;
  this.applyFilters();
};

Section.prototype.applyFilters = function () {
  var query = this.dom.search ? this.dom.search.value.trim().toLowerCase() : '';
  var self = this;
  this.filteredItems = this.allItems.filter(function (item) {
    return self.config.filterFn(item, query, self.filters, self);
  });
  this.sort();
  this.renderedCount = 0;
  if (this.dom.grid) this.dom.grid.innerHTML = '';
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
  grid.innerHTML = '';
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < this.filteredItems.length; i++) {
    fragment.appendChild(this.config.createCard(this.filteredItems[i], i, this));
  }
  grid.appendChild(fragment);
  if (this.dom.noResults) {
    this.dom.noResults.classList.toggle('hidden', this.filteredItems.length > 0);
  }
};

Section.prototype.renderBatch = function () {
  if (this.isRendering) return;
  this.isRendering = true;

  var end = Math.min(this.renderedCount + this.batchSize, this.filteredItems.length);
  var fragment = document.createDocumentFragment();

  for (var i = this.renderedCount; i < end; i++) {
    fragment.appendChild(this.config.createCard(this.filteredItems[i], i, this));
  }

  this.dom.grid.appendChild(fragment);
  this.renderedCount = end;
  this.isRendering = false;

  if (this.dom.noResults) {
    this.dom.noResults.classList.toggle('hidden', this.filteredItems.length > 0);
  }

  if (this.renderedCount < this.filteredItems.length) {
    this._setupScrollObserver();
  }
};

Section.prototype._setupScrollObserver = function () {
  if (this.scrollObserver) this.scrollObserver.disconnect();

  var sentinel = document.createElement('div');
  sentinel.className = 'scroll-sentinel';
  this.dom.grid.appendChild(sentinel);

  var self = this;
  this.scrollObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      self.scrollObserver.disconnect();
      sentinel.remove();
      self.renderBatch();
    }
  }, { rootMargin: '200px' });

  this.scrollObserver.observe(sentinel);
};

Section.prototype.openDetail = function (index) {
  if (index < 0 || index >= this.filteredItems.length) return;
  this.currentDetailIndex = index;
  var item = this.filteredItems[index];
  this.config.openDetail(item, this.dom, this);
  if (this.dom.overlay) this.dom.overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (window.app && typeof window.app.playPop === 'function') {
    window.app.playPop();
  }
};

Section.prototype.closeDetail = function () {
  if (this.dom.overlay) this.dom.overlay.classList.add('hidden');
  document.body.style.overflow = '';
  this.currentDetailIndex = -1;
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
