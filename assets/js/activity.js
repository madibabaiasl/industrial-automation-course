/* =========================================================
   MENG 4450 — shared activity engine
   Small helpers every in-class interactive uses, so a new
   activity is a data file plus a render function, not a rewrite.
   No dependencies. No storage. Nothing leaves the page.
   ========================================================= */
(function (global) {
  'use strict';

  /* ---- DOM ---- */
  function el(id) { return document.getElementById(id); }
  function make(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---- Fisher-Yates. Unbiased, in place, returns a new array. ---- */
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---- progress dots ---- */
  function dots(container, total, index) {
    clear(container);
    for (var i = 0; i < total; i++) {
      var d = make('i');
      if (i < index) d.className = 'done';
      else if (i === index) d.className = 'now';
      container.appendChild(d);
    }
  }

  /* ---- scoring ---- */
  function Score() {
    this.right = 0;
    this.asked = 0;
  }
  Score.prototype.tally = function (ok) {
    this.asked += 1;
    if (ok) this.right += 1;
    return ok;
  };
  Score.prototype.pct = function () {
    return this.asked === 0 ? 0 : Math.round((this.right / this.asked) * 100);
  };
  Score.prototype.render = function (node) {
    node.innerHTML = 'Score <b>' + this.right + '</b> / <b>' + this.asked + '</b>';
  };

  /* ---- feedback panel ----
     verdict: true = correct, false = not correct.
     body:   explanation, plain text or HTML.
     source: optional { label, text } quoted from the governing document. */
  function reveal(mount, verdict, body, source) {
    var box = make('div', 'reveal');
    var v = make('p', 'verdict ' + (verdict ? 'y' : 'n'),
      (verdict ? '✓' : '✕') + ' ' + (verdict ? 'Correct' : 'Not quite'));
    box.appendChild(v);
    box.appendChild(make('p', null, body));
    if (source) {
      box.appendChild(make('div', 'quote', '<b>' + source.label + '</b>' + source.text));
    }
    mount.appendChild(box);
    return box;
  }

  /* ---- a deck of cards played one at a time ----
     opts: { deck, mount, render(card, api), onDone(score) }
     render() draws one card and calls api.answered(ok) then api.next(). */
  function Deck(opts) {
    this.cards = opts.shuffle === false ? opts.deck.slice() : shuffle(opts.deck);
    this.mount = opts.mount;
    this.render = opts.render;
    this.onDone = opts.onDone;
    this.i = 0;
    this.score = opts.score || new Score();
  }
  Deck.prototype.total = function () { return this.cards.length; };
  Deck.prototype.index = function () { return this.i; };
  Deck.prototype.start = function () { this.step(); };
  Deck.prototype.step = function () {
    if (this.i >= this.cards.length) { this.onDone(this.score); return; }
    var self = this;
    clear(this.mount);
    this.render(this.cards[this.i], {
      score: this.score,
      index: this.i,
      total: this.cards.length,
      answered: function (ok) { return self.score.tally(ok); },
      next: function () { self.i += 1; self.step(); }
    });
  };

  /* ---- build one option button ---- */
  function option(text, onPick) {
    var b = make('button', 'opt', '<span class="mark"> </span><span>' + text + '</span>');
    b.type = 'button';
    b.addEventListener('click', function () { onPick(b); });
    return b;
  }

  /* ---- lock every button inside a node ---- */
  function lock(node) {
    var bs = node.querySelectorAll('button');
    for (var i = 0; i < bs.length; i++) bs[i].disabled = true;
  }

  global.Activity = {
    el: el, make: make, clear: clear, shuffle: shuffle,
    dots: dots, Score: Score, reveal: reveal, Deck: Deck,
    option: option, lock: lock
  };
})(window);
