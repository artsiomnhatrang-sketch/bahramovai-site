/* ИИ-консультант bahramovai.com - окно чата на странице.
   Подключение: <script src="/chat/konsultant.js" data-topic="registraciya|razblokirovka" defer></script>
   Ответы даёт сервер-посредник (scripts/konsultant/main.ts), ключ нейросети на сайте не лежит.
   Цели Метрики: ai_chat_open, ai_chat_message, ai_chat_telegram. */
(function () {
  'use strict';
  if (window.__bhrChat) return;
  window.__bhrChat = true;

  var API = 'https://konsultant.bahramovai.deno.net/chat';
  var TG = 'https://t.me/bahramovartsiom';
  var COUNTER = 110081984;
  var MAX = 500;
  var STORE = 'bhr_chat_v1';

  var me = document.currentScript;
  var topic = (me && me.getAttribute('data-topic')) || 'razblokirovka';
  try {
    // Проба с локальным сервером: localStorage.bhr_chat_api = 'http://localhost:8000/chat'
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) && localStorage.getItem('bhr_chat_api')) {
      API = localStorage.getItem('bhr_chat_api');
    }
  } catch (e) {}

  var CHIPS = {
    registraciya: [
      'Не приходит код при регистрации',
      'Пишет: создание учётной записи заблокировано',
      'Новый аккаунт заблокировали сразу',
      'Что в плане Прогрев за 999 ₽?'
    ],
    razblokirovka: [
      'Аккаунт отключили - что делать?',
      'Сколько стоит разблокировка?',
      'Взломали, сменили почту и номер',
      'Есть ли гарантия?'
    ],
    // Главная - по всем продуктам
    glavnaya: [
      'Заблокировали инстаграм - что делать?',
      'Взломали аккаунт - можно вернуть?',
      'Что умеет ИИ-агент и сколько стоит?',
      'Как работает трафик + воронка?',
      'Что входит в пакет СИСТЕМА?'
    ]
  };
  var HELLO = 'Здравствуйте 👋🏻 Я ИИ-консультант Артёма Бахрамова. Подскажу про регистрацию, блокировки и взломы инстаграма и телеграма, ИИ-агентов и чат-ботов, продвижение в инстаграме\n\nПароли и коды из СМС сюда не пишите';

  function goal(name) {
    try { if (typeof window.ym === 'function') window.ym(COUNTER, 'reachGoal', name); } catch (e) {}
  }

  var state = { msgs: [], busy: false, opened: false };
  try {
    var saved = JSON.parse(sessionStorage.getItem(STORE) || 'null');
    if (saved && Array.isArray(saved.msgs)) state.msgs = saved.msgs.slice(-30);
  } catch (e) {}
  function save() {
    try { sessionStorage.setItem(STORE, JSON.stringify({ msgs: state.msgs.slice(-30) })); } catch (e) {}
  }

  var css = '' +
    '.bhrc-btn{position:fixed;right:16px;bottom:16px;z-index:190;display:flex;align-items:center;gap:8px;height:48px;padding:0 18px 0 14px;' +
    'border:0;border-radius:100px;background:#f4672a;color:#000;font:600 15px/1 Inter,system-ui,sans-serif;cursor:pointer;' +
    'box-shadow:0 6px 24px rgba(0,0,0,.45);transition:transform .28s ease,opacity .2s ease,bottom .28s ease;-webkit-tap-highlight-color:transparent}' +
    '.bhrc-btn:hover{background:#ff7a40}.bhrc-btn svg{width:22px;height:22px;flex:none}' +
    '.bhrc-btn.bhrc-hide{opacity:0;transform:translateY(140%);pointer-events:none}' +
    '.bhrc-btn.bhrc-alt{background:#0d0d0d;color:#fff;box-shadow:inset 0 0 0 1.5px #f4672a,0 6px 24px rgba(0,0,0,.45)}.bhrc-btn.bhrc-alt svg{color:#f4672a}' +
    '.bhrc-panel{position:fixed;right:20px;bottom:20px;z-index:1000;width:380px;height:min(600px,calc(100vh - 40px));display:none;flex-direction:column;' +
    'background:#0d0d0d;color:#eee;border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,.6);' +
    'font:400 15px/1.5 Inter,system-ui,sans-serif}' +
    '.bhrc-panel.bhrc-open{display:flex}' +
    '.bhrc-head{display:flex;align-items:center;gap:10px;padding:14px 14px 12px 16px;border-bottom:1px solid rgba(255,255,255,.08)}' +
    '.bhrc-title{flex:1;min-width:0}.bhrc-title b{display:block;font:800 21px/1.1 "Fira Sans Extra Condensed",Inter,sans-serif;color:#fff}' +
    '.bhrc-title span{display:block;font-size:12.5px;color:#8f8f8f;margin-top:2px}' +
    '.bhrc-x{width:40px;height:40px;border:0;border-radius:100px;background:rgba(255,255,255,.06);color:#ddd;font-size:22px;line-height:1;cursor:pointer}' +
    '.bhrc-x:hover{background:rgba(255,255,255,.12)}' +
    '.bhrc-log{flex:1;overflow-y:auto;padding:14px 14px 6px;overscroll-behavior:contain}' +
    '.bhrc-m{max-width:88%;margin:0 0 10px;padding:10px 13px;border-radius:14px;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word}' +
    '.bhrc-bot{background:#1a1a1a;color:#e8e8e8;border-top-left-radius:4px}' +
    '.bhrc-me{margin-left:auto;background:#f4672a;color:#000;border-top-right-radius:4px}' +
    '.bhrc-bot a{color:#f4672a;text-decoration:underline;text-underline-offset:2px}' +
    '.bhrc-chips{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 10px}' +
    '.bhrc-chip{border:1.5px solid rgba(244,103,42,.7);background:transparent;color:#f4f4f4;border-radius:100px;padding:7px 12px;font:500 13.5px/1.3 Inter,system-ui,sans-serif;cursor:pointer;text-align:left}' +
    '.bhrc-chip:hover{background:#f4672a;color:#000}' +
    '.bhrc-dots{display:inline-flex;gap:4px}.bhrc-dots i{width:6px;height:6px;border-radius:50%;background:#8f8f8f;animation:bhrc 1s infinite}' +
    '.bhrc-dots i:nth-child(2){animation-delay:.15s}.bhrc-dots i:nth-child(3){animation-delay:.3s}' +
    '@keyframes bhrc{0%,60%,100%{opacity:.3}30%{opacity:1}}' +
    '.bhrc-tg{display:none;margin:0 14px 8px;align-self:flex-start;align-items:center;min-height:38px;padding:7px 16px;border:1.5px solid #f4672a;border-radius:100px;' +
    'color:#f4672a;font:600 14px/1.2 Inter,system-ui,sans-serif;text-decoration:none}' +
    '.bhrc-tg.bhrc-on{display:inline-flex}.bhrc-tg:hover{background:#f4672a;color:#000}' +
    '.bhrc-form{display:flex;gap:8px;align-items:flex-end;padding:8px 12px 6px;border-top:1px solid rgba(255,255,255,.08)}' +
    '.bhrc-in{flex:1;min-height:44px;max-height:120px;resize:none;padding:11px 13px;border:1px solid rgba(255,255,255,.14);border-radius:14px;' +
    'background:#151515;color:#fff;font:400 16px/1.4 Inter,system-ui,sans-serif;outline:none}' +
    '.bhrc-in:focus{border-color:#f4672a}' +
    '.bhrc-send{flex:none;width:44px;height:44px;border:0;border-radius:100px;background:#f4672a;color:#000;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
    '.bhrc-send:disabled{opacity:.45;cursor:default}.bhrc-send svg{width:20px;height:20px}' +
    '.bhrc-note{padding:0 14px 10px;font-size:11.5px;line-height:1.4;color:#777}' +
    '@media (max-width:600px){.bhrc-panel{right:0;bottom:0;left:0;top:0;width:auto;height:100%;height:100dvh;border-radius:0;border:0}' +
    '.bhrc-btn{right:12px;bottom:12px}}';

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Ссылками становятся только свои адреса: сайт и Telegram Артёма
  function linkify(text) {
    return esc(text).replace(/(https?:\/\/(?:www\.)?bahramovai\.com\/[^\s<]*|(?:https?:\/\/)?t\.me\/(?:bahramovartsiom|bahramovartem_bot|artsiombahram)[^\s<]*)/g, function (m) {
      var tail = (m.match(/[.,;:!?)]+$/) || [''])[0];
      var url = m.slice(0, m.length - tail.length);
      var href = url.indexOf('http') === 0 ? url.replace(/^http:/, 'https:') : 'https://' + url;
      var ext = href.indexOf('t.me/') !== -1;
      return '<a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + url + '</a>' + tail;
    });
  }

  var btn, panel, log, input, send, tgLink;

  function tgHref() {
    var first = '';
    for (var i = 0; i < state.msgs.length; i++) if (state.msgs[i].role === 'user') { first = state.msgs[i].content; break; }
    var text = 'Здравствуйте, Артём! Пишу с сайта bahramovai.com' + (first ? '. Вопрос: ' + first.slice(0, 300) : '');
    return TG + '?text=' + encodeURIComponent(text);
  }

  function addMsg(role, text) {
    var m = el('div', 'bhrc-m ' + (role === 'user' ? 'bhrc-me' : 'bhrc-bot'));
    if (role === 'user') m.textContent = text; else m.innerHTML = linkify(text);
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
    return m;
  }

  function render() {
    log.innerHTML = '';
    addMsg('assistant', HELLO);
    if (!state.msgs.length) {
      var chips = el('div', 'bhrc-chips');
      (CHIPS[topic] || CHIPS.razblokirovka).forEach(function (q) {
        var c = el('button', 'bhrc-chip');
        c.type = 'button';
        c.textContent = q;
        c.addEventListener('click', function () { ask(q); });
        chips.appendChild(c);
      });
      log.appendChild(chips);
    }
    state.msgs.forEach(function (m) { addMsg(m.role, m.content); });
    updateTg();
  }

  function updateTg() {
    var answered = state.msgs.some(function (m) { return m.role === 'assistant'; });
    tgLink.href = tgHref();
    tgLink.classList.toggle('bhrc-on', answered);
  }

  function ask(text) {
    text = String(text || '').trim();
    if (!text || state.busy) return;
    if (text.length > MAX) text = text.slice(0, MAX);
    var chips = log.querySelector('.bhrc-chips');
    if (chips) chips.remove();
    state.msgs.push({ role: 'user', content: text });
    addMsg('user', text);
    input.value = '';
    autosize();
    goal('ai_chat_message');
    state.busy = true;
    send.disabled = true;
    var wait = addMsg('assistant', '');
    wait.innerHTML = '<span class="bhrc-dots" aria-label="Печатает"><i></i><i></i><i></i></span>';

    var history = state.msgs.filter(function (m) { return !m.local; }).map(function (m) {
      return { role: m.role, content: m.content };
    });
    var ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 35000);
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, page: location.pathname }),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; });
    }).then(function (d) {
      var reply = d && typeof d.reply === 'string' ? d.reply : '';
      if (!reply) throw new Error('empty');
      finish(reply, !!(d && d.limited));
    }).catch(function () {
      finish('Не получилось ответить. Попробуйте ещё раз или напишите Артёму в Telegram - кнопка ниже', true);
    }).then(function () { clearTimeout(timer); });

    function finish(reply, local) {
      wait.remove();
      // Служебные ответы (лимит, сбой) в историю для модели не идут
      state.msgs.push(local ? { role: 'assistant', content: reply, local: true } : { role: 'assistant', content: reply });
      addMsg('assistant', reply);
      state.busy = false;
      send.disabled = false;
      updateTg();
      if (local) tgLink.classList.add('bhrc-on');
      save();
    }
  }

  function autosize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }

  var lockScroll = '';
  function open() {
    panel.classList.add('bhrc-open');
    btn.classList.add('bhrc-hide');
    if (window.matchMedia('(max-width:600px)').matches) {
      lockScroll = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    if (!state.opened) { state.opened = true; goal('ai_chat_open'); }
    log.scrollTop = log.scrollHeight;
    // На телефоне клавиатура сама не выскакивает: человек сначала видит подсказки
    if (!window.matchMedia('(max-width:600px)').matches) input.focus();
  }
  function close() {
    panel.classList.remove('bhrc-open');
    document.documentElement.style.overflow = lockScroll;
    placeBtn();
    btn.focus();
  }

  // Кнопка не закрывает блок покупки Прогрева и кнопки заявки страницы, встаёт над липкой кнопкой заявки на телефоне
  var trip = null;
  // Футер - блоком целиком: в конце страницы прокрутить дальше нельзя, а по отдельным ссылкам кнопка мигала бы
  // 20.10: и кнопки-таблетки со стилем в самом теге (в статьях), вопросы FAQ и карточки «Читайте также» -
  // кнопка лежала на «Подключить трафик», вплотную к «Прислать скриншот» и закрывала «+» у вопросов.
  // .svc-pick - кнопки выбора проблемы, [data-offer-box] - «Все услуги и цены →» под кнопкой предложения;
  // на главной - «Забрать бонусы», «кейсы» и «портфолио», видеоотзывы, карточки услуг и публикаций
  var AVOID = '.svc-btns a, .svc-pick a, [data-offer-box] a, .btn-primary, .btn-ghost, .btn-outline, .svx-extra a, .case-link, ' +
    'a[style*="border-radius:100px"], a[style*="border-radius: 100px"], summary, .related-card, .sf-nav, footer, ' +
    '.cta-bonus a, .proof-links a, .vrev-play, .svx-card, .trust-item';
  // Ложится ли кнопка на кнопку заявки (на телефоне - «Написать - разбор бесплатно» на первом экране /uslugi/) или на футер.
  // Место считаем по углу экрана, а не по getBoundingClientRect: спрятанная кнопка уехала вниз
  // Низ - куда кнопка встанет, а не где она сейчас: bottom плавно едет 0,28 с, и посреди хода кнопка заявки
  // под ней не находилась (20.10: «Обсудить мой случай» на /uslugi/razblokirovka-instagram). 12 и 16 - как в css выше
  function overCta(lift) {
    var cs = getComputedStyle(btn), pad = 8;
    var base = window.matchMedia('(max-width:600px)').matches ? 12 : 16;
    var right = document.documentElement.clientWidth - parseFloat(cs.right) + pad;
    var bottom = document.documentElement.clientHeight - (lift || base) + pad;
    var left = right - btn.offsetWidth - 2 * pad, top = bottom - btn.offsetHeight - 2 * pad;
    var els = document.querySelectorAll(AVOID);
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.width && r.right > left && r.left < right && r.bottom > top && r.top < bottom) return true;
    }
    return false;
  }
  function placeBtn() {
    if (panel.classList.contains('bhrc-open')) return;
    // Пока на экране хоть край блока покупки - кнопки нет
    var r = trip && trip.getBoundingClientRect();
    var overTrip = !!r && r.bottom > 0 && r.top < window.innerHeight;
    var cta = document.querySelector('.mobile-cta.visible');
    var lift = cta && cta.offsetHeight ? cta.offsetHeight + 10 : 0;
    btn.style.bottom = lift ? lift + 'px' : '';
    // Над липкой оранжевой кнопкой заявки - в рамке, чтобы не спорить с ней
    btn.classList.toggle('bhrc-alt', !!lift);
    btn.classList.toggle('bhrc-hide', overTrip || !shown || overCta(lift));
  }

  var shown = false;
  function build() {
    var style = el('style');
    style.textContent = css;
    document.head.appendChild(style);

    btn = el('button', 'bhrc-btn bhrc-hide', ICON_CHAT + '<span>Спросить ИИ</span>');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Открыть чат с ИИ-консультантом');
    btn.addEventListener('click', open);

    panel = el('div', 'bhrc-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'ИИ-консультант');
    var head = el('div', 'bhrc-head', '<div class="bhrc-title"><b>ИИ-консультант</b><span>Артём Бахрамов · отвечает нейросеть</span></div>');
    var x = el('button', 'bhrc-x', '&times;');
    x.type = 'button';
    x.setAttribute('aria-label', 'Закрыть чат');
    x.addEventListener('click', close);
    head.appendChild(x);

    log = el('div', 'bhrc-log');
    log.setAttribute('aria-live', 'polite');
    log.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href*="t.me/bahramovartsiom"]');
      if (a) goal('ai_chat_telegram');
    });

    tgLink = el('a', 'bhrc-tg', 'Написать Артёму в Telegram →');
    tgLink.target = '_blank';
    tgLink.rel = 'noopener noreferrer';
    tgLink.href = TG;
    tgLink.addEventListener('click', function () { goal('ai_chat_telegram'); });

    var form = el('form', 'bhrc-form');
    input = el('textarea', 'bhrc-in');
    input.rows = 1;
    input.maxLength = MAX;
    input.placeholder = 'Ваш вопрос';
    input.setAttribute('aria-label', 'Ваш вопрос');
    send = el('button', 'bhrc-send', ICON_SEND);
    send.type = 'submit';
    send.setAttribute('aria-label', 'Отправить');
    form.appendChild(input);
    form.appendChild(send);
    form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
    input.addEventListener('input', autosize);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); ask(input.value); }
    });

    var note = el('div', 'bhrc-note', 'Отвечает нейросеть, она может ошибаться. Ваш случай разберёт Артём - бесплатно, в Telegram');

    panel.appendChild(head);
    panel.appendChild(log);
    panel.appendChild(tgLink);
    panel.appendChild(form);
    panel.appendChild(note);
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    trip = document.querySelector('[data-tripwire]');
    render();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('bhrc-open')) close();
    });

    // Кнопка появляется после первой прокрутки или через 3 секунды - первый экран чистый
    function reveal() { if (shown) return; shown = true; placeBtn(); }
    window.addEventListener('scroll', function () { reveal(); placeBtn(); }, { passive: true });
    window.addEventListener('resize', placeBtn);
    setTimeout(reveal, 3000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
