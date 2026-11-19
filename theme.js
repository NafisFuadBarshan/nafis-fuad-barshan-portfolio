/* theme.js — mode (light|dark) and colour theme are independent.
   The <head> snippet already set data-mode / data-theme before first paint;
   this file owns changing them, persisting them, and the switcher UI. */
(function () {
  'use strict';
  var MODES = ['light', 'dark'];
  var THEMES = ['editorial', 'studio', 'botanical', 'amber'];
  var LABELS = { editorial: 'Editorial', studio: 'Precision Studio', botanical: 'Botanical Sage', amber: 'Cyber Amber' };
  var KEY_MODE = 'portfolio-mode', KEY_THEME = 'portfolio-theme';
  var root = document.documentElement;

  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function getMode() { return root.getAttribute('data-mode') === 'light' ? 'light' : 'dark'; }
  function getTheme() { var t = root.getAttribute('data-theme'); return THEMES.indexOf(t) > -1 ? t : 'studio'; }

  function announce() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var bg = getComputedStyle(root).getPropertyValue('--bg-primary').trim();
      if (bg) meta.setAttribute('content', bg);
    }
    syncUI();
    document.dispatchEvent(new CustomEvent('portfolio:themechange', { detail: { mode: getMode(), theme: getTheme() } }));
  }
  function setMode(m, persist) {
    if (MODES.indexOf(m) < 0) return;
    root.setAttribute('data-mode', m);       // data-theme is left untouched
    if (persist !== false) save(KEY_MODE, m);
    announce();
  }
  function setTheme(t, persist) {
    if (THEMES.indexOf(t) < 0) return;
    root.setAttribute('data-theme', t);      // data-mode is left untouched
    if (persist !== false) save(KEY_THEME, t);
    announce();
  }
  function toggleMode() { setMode(getMode() === 'light' ? 'dark' : 'light'); }

  /* ---------- UI ---------- */
  var modeBtn, sw, swBtn, pop, opts;

  function syncUI() {
    if (modeBtn) {
      var label = getMode() === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
      modeBtn.setAttribute('aria-label', label); modeBtn.setAttribute('title', label);
    }
    if (swBtn) {
      var l = 'Colour theme: ' + LABELS[getTheme()];
      swBtn.setAttribute('aria-label', l); swBtn.setAttribute('title', l);
    }
    (opts || []).forEach(function (o) {
      var on = o.getAttribute('data-theme-opt') === getTheme();
      o.setAttribute('aria-checked', on ? 'true' : 'false');
      o.tabIndex = on ? 0 : -1;
    });
  }
  function openPop() {
    pop.hidden = false; swBtn.setAttribute('aria-expanded', 'true');
    var cur = pop.querySelector('[aria-checked="true"]') || opts[0]; cur.focus();
  }
  function closePop(returnFocus) {
    if (pop.hidden) return;
    pop.hidden = true; swBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) swBtn.focus();
  }

  function init() {
    modeBtn = document.getElementById('themeToggle');
    if (modeBtn) modeBtn.addEventListener('click', toggleMode);

    sw = document.querySelector('.theme-switcher');
    if (sw) {
      swBtn = sw.querySelector('.ts-btn'); pop = sw.querySelector('.ts-pop');
      opts = [].slice.call(sw.querySelectorAll('.ts-opt'));
      swBtn.addEventListener('click', function () { pop.hidden ? openPop() : closePop(false); });
      opts.forEach(function (o, i) {
        o.addEventListener('click', function () { setTheme(o.getAttribute('data-theme-opt')); });
        o.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = opts[(i + 1) % opts.length];
          else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = opts[(i - 1 + opts.length) % opts.length];
          else if (e.key === 'Home') n = opts[0];
          else if (e.key === 'End') n = opts[opts.length - 1];
          if (n) { e.preventDefault(); n.focus(); }
          else if (e.key === 'Tab') closePop(false);
        });
      });
      sw.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); closePop(true); } });
      document.addEventListener('pointerdown', function (e) { if (!sw.contains(e.target)) closePop(false); });
    }
    syncUI();
    announce();
  }

  /* keep several tabs / both pages in step */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY_MODE && MODES.indexOf(e.newValue) > -1) setMode(e.newValue, false);
    if (e.key === KEY_THEME && THEMES.indexOf(e.newValue) > -1) setTheme(e.newValue, false);
  });
  /* follow the OS only while the visitor hasn't chosen a mode */
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onOS = function (e) { if (!load(KEY_MODE)) setMode(e.matches ? 'dark' : 'light', false); };
    mq.addEventListener ? mq.addEventListener('change', onOS) : mq.addListener && mq.addListener(onOS);
  }

  window.PortfolioTheme = { getMode: getMode, getTheme: getTheme, setMode: setMode, setTheme: setTheme, toggleMode: toggleMode, THEMES: THEMES };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
