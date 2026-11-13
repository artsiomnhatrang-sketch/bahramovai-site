/* Account Doctor (EN): free diagnosis quiz for bahramovai.com/en/. */
(function () {
  'use strict';

  // Checkout link. Empty = Gumroad is not set up yet, the button shows a "coming soon" note.
  var GUMROAD_URL = 'https://artsiom8.gumroad.com/l/account-report';
  var PRICE = '$19';

  function goal(name) { try { if (window.ym) window.ym(110081984, 'reachGoal', name); } catch (e) {} }

  var P = { instagram: 'Instagram', facebook: 'Facebook', threads: 'Threads' };
  var HACKED_URL = { instagram: 'instagram.com/hacked', facebook: 'facebook.com/hacked', threads: 'instagram.com/hacked' };

  var NOTE = {
    facebook: 'This is about a Facebook account. Do the steps below in the Facebook app or on facebook.com - menu names can differ slightly from Instagram. If your Instagram is in the same Accounts Center, check its Account Status too.',
    threads: 'Threads has its own Account Status and appeal button. Login and hacked-account recovery go through your Instagram account, so check Instagram\'s Account Status as well.'
  };

  // Kinds of restriction. {P} = platform name, {HACKED} = recovery address.
  var KINDS = {
    suspended: {
      title: 'Account suspended - you can still appeal',
      what: 'Nobody can see the account and you can\'t use it, but this is not final yet. There is a deadline to appeal, usually 180 days. If you don\'t appeal, or the appeal is rejected, the account is disabled permanently.',
      when: 'Appeal before the deadline on the screen runs out (usually 180 days from the suspension date). Sooner is better.',
      steps: [
        'Log into the account in the {P} app and tap Appeal or Disagree with decision.',
        'Enter the code from SMS or email and complete whatever check you\'re asked for (video selfie, ID).',
        'If there is a text field, write 2-3 calm sentences: who you are, what the account is for, and that you believe the decision is a mistake. Facts only, no threats or emotions.',
        'Then wait: the answer usually comes within a day to a few weeks, in the app and by email. Check your email every day, including Spam.',
        'While the review is running, don\'t create new accounts and don\'t log in from lots of different devices.'
      ],
      dont: [
        'Don\'t create a new account in the meantime - that\'s a separate violation (circumventing enforcement), and it can get both the new and the linked accounts blocked',
        'Don\'t send the appeal many times',
        'Don\'t pay anyone who promises to get the account back - no one outside Meta can restore it'
      ],
      paid: true
    },
    disabled_appeal: {
      title: 'Account disabled - but the appeal window is still open',
      what: 'The screen says the account is disabled, but there is still an Appeal / Disagree with decision button or a number of days left. That means the decision is not final yet: act the same way as with a suspension.',
      when: 'Appeal before the deadline on the screen runs out (often 180 days).',
      steps: [
        'Tap Appeal or Disagree with decision in the {P} app and complete every check you\'re asked for (code, video selfie, ID).',
        'If there is a text field, write 2-3 calm sentences: who you are, what the account is for, why you believe it\'s a mistake.',
        'Wait for the answer in the app and by email (check Spam). Don\'t send the appeal again while it\'s under review.',
        'Remove whatever could have caused it as soon as you can: automation and growth services, links in your bio that look like spam, other people\'s logins.'
      ],
      dont: [
        'Don\'t create new accounts - Meta treats them as circumvention, and they usually get disabled along with linked accounts',
        'Don\'t send the appeal many times',
        'Don\'t pay anyone who promises a "100% recovery"'
      ],
      paid: true
    },
    disabled_final: {
      title: 'Account disabled',
      what: 'The account is disabled: nobody can see it, and you can\'t log in or use it. If the screen has no Appeal / Request review button and no deadline, the appeal was already reviewed and rejected, the time for it ran out, or the decision was made without an appeal option. In that case the account usually can\'t be restored the normal way in the app.',
      when: 'If the screen shows no deadline and no appeal button, the in-app appeal window has already closed.',
      steps: [
        'Check whether the decision is really final: no Appeal button on the screen, and the email says another review isn\'t possible. If the screen still shows an Appeal button, start over and answer accordingly.',
        'If you live in the European Union, you can file a dispute with an independent out-of-court dispute settlement body under the EU Digital Services Act (DSA), for example Appeals Centre Europe.',
        'If you have a Meta Verified subscription on a linked account (Facebook or another Instagram), you can ask support there - but they often can\'t act on a different account.',
        'If the account had money, contracts or ads on it, keep the evidence (screenshots, payments): you\'ll need it for ads support and, as a last resort, for a lawyer.',
        'If none of this applies, the honest answer is that the chances are low. Keep in mind: {P}\'s terms don\'t allow a new account after one was disabled without permission, and a new account linked to the old one is usually disabled as circumvention.'
      ],
      dont: [
        'Don\'t trust anyone who promises a "100% recovery" for money',
        'Don\'t create new accounts - Meta treats them as circumvention, and they usually get disabled along with linked accounts'
      ],
      paid: false,
      noPaid: 'We don\'t sell a report for this case: when Meta\'s decision is final, a paid PDF won\'t change it. The steps above are everything we\'d tell you.'
    },
    disabled_check: {
      title: 'Account disabled - first check whether you can still appeal',
      what: 'Whether a disabled account can still come back depends on one thing: is there an Appeal / Disagree with decision button or a number of days left on the screen. Until you see that, don\'t assume it\'s over.',
      when: 'If there is an appeal window, it is often 180 days - but check today.',
      steps: [
        'Log in from the phone you always use, on your home network, VPN off, and read the screen to the end.',
        'Look for an email from @mail.instagram.com or @facebookmail.com about the decision, and compare it with Accounts Center → Password and security → Recent emails.',
        'If you can\'t log in because the password or email was changed, it may be a hacked account: use {HACKED}.',
        'Then run this check again and answer whether there is an Appeal button.'
      ],
      dont: [
        'Don\'t create new accounts while you find out - Meta treats them as circumvention',
        'Don\'t pay anyone who promises to get the account back'
      ],
      paid: false,
      noPaid: 'Find out first whether the appeal window is open - then run the check again. If it is, the personal report can help with the appeal.'
    },
    check: {
      title: 'Identity check or login confirmation',
      what: 'This is not a ban for a violation, it\'s a check: {P} noticed something unusual (a new phone, a VPN, another country, a sudden spike in activity) and asks you to prove the owner is using the account.',
      when: 'Usually from a few hours to 2-3 days after you send the code or the video selfie.',
      steps: [
        'Complete the check inside the app: enter the code from SMS or email, or record a video selfie - turn your head slowly as the screen asks, in good light, without glasses or a hat.',
        'Do it from the phone and network you usually log in from; turn your VPN off.',
        'After the video selfie, wait. You don\'t need to send it again or log out during the check.',
        'Once you\'re back in, turn on two-factor authentication. If someone else may have had your password, change it too.'
      ],
      dont: [
        'Don\'t create a new account while the check is running',
        'Don\'t send the selfie many times in a row',
        'Don\'t turn on a VPN or switch phones during the check'
      ],
      paid: true
    },
    age: {
      title: 'Age check',
      what: '{P} isn\'t sure the owner is at least 13 (or that the age on the account is real) and asks you to confirm it. Until you do, the account may be suspended.',
      when: 'If the screen shows an appeal deadline (usually 180 days), complete the check before it ends.',
      steps: [
        'Complete the age check in the app: a video selfie (age is estimated from your face) or a photo of an ID.',
        'Use only an ID that shows your name, date of birth and photo; the name should match the account or be easy to explain.',
        'If a company runs the account, say so in the appeal and submit the ID of the person who owns the account - an SMM manager should not submit their own.'
      ],
      dont: [
        'Don\'t keep changing your date of birth back and forth',
        'Don\'t send someone else\'s documents'
      ],
      paid: true
    },
    hacked: {
      title: 'Signs that the account was hacked',
      what: 'It looks like someone else logged into the account or tried to change the password, email or phone number. Act within hours, not days.',
      when: 'The sooner the better: the "revert this change" link in the email works only for a limited time.',
      steps: [
        'If an email from security@mail.instagram.com or security@facebookmail.com has a "This wasn\'t me" / "revert this change" link, tap it as soon as possible: it restores your old email and password.',
        'Go to {HACKED} (or on the login screen: Forgot password? → Need more help?) and follow the recovery steps: a code to your email or phone, a video selfie if asked.',
        'Once you\'re back in: a new password you don\'t use anywhere else, two-factor authentication with an authenticator app, log out of unknown devices in Accounts Center.',
        'Check that the hacker didn\'t leave their email, phone number or connected apps, and delete their posts or messages if there are any.'
      ],
      dont: [
        'Don\'t message or pay the people who took the account',
        'Don\'t use "recovery" services from ads or DMs'
      ],
      paid: false,
      noPaid: 'We don\'t sell a report for a hacked account: recovery goes through {P}\'s own hacked-account flow above, and every hour counts. Start there now.'
    },
    action_block: {
      title: 'Temporary action block',
      what: '{P} temporarily blocked some actions (follows, likes, comments, messages) because there were too many of them or they looked automated. This is not an account ban.',
      when: 'Usually from a few hours to a few days; longer if it repeats.',
      steps: [
        'Stop: for 24-48 hours don\'t follow people, don\'t like in bulk and don\'t send mass messages.',
        'Turn off automation, growth and "mass follow" services and remove their access to the account.',
        'Change your password if a service or another person had access to the account.',
        'If the block lasts longer than a week or appeared for no reason, tap "Tell us" / "Let us know if you think we made a mistake" in the block window, or shake your phone in the app → Report a problem.',
        'Then return to normal activity gradually, without sudden spikes.'
      ],
      dont: [
        'Don\'t repeat the blocked action again and again - the block gets longer',
        'Don\'t log in through a VPN or other people\'s phones',
        'Don\'t buy followers or likes'
      ],
      paid: false,
      noPaid: 'Nothing to buy here: an action block usually lifts on its own within days if you follow the steps above. If it turns into a suspension, run the check again.'
    },
    reach: {
      title: 'Account removed from recommendations ("shadowban")',
      what: 'The account isn\'t blocked, but {P} stopped showing it to people who don\'t follow you (Explore, Reels, suggestions). That\'s why your reach dropped sharply.',
      when: 'Lifted after the flagged content is removed or after a successful appeal.',
      steps: [
        'Open Account Status in the app\'s settings and look at the recommendations section: it shows which post is the problem.',
        'For each flagged post: if it doesn\'t break the rules, tap Appeal / Disagree; if it does, delete it.',
        'While the status is red, don\'t post similar content (same type of video, topics, music, links).',
        'Check the status every few days: after the removal or a successful appeal it usually turns green.'
      ],
      dont: [
        'Don\'t delete or re-upload all your content in bulk',
        'Don\'t buy followers or engagement - it makes things worse'
      ],
      paid: true
    },
    removed: {
      title: 'Content removed / warning for a post',
      what: '{P} removed one or more posts and most likely counted a warning (a "strike"). On their own they don\'t block the account, but they add up: many warnings in a row lead to restrictions and disabling.',
      when: 'Warnings stop counting after about a year; it\'s best to appeal a removal right away.',
      steps: [
        'Open Account Status → Removed content: see how many removals and for which rules.',
        'For every removal you believe is a mistake, tap Appeal / Disagree with decision and briefly explain the context (humor, education, news, your own photo).',
        'If the appeal is rejected and the answer includes a reference number for the Oversight Board, you can submit it there within the stated time (usually 15 days).',
        'Delete or hide other similar posts yourself before they\'re found - each new removal adds a warning.'
      ],
      dont: [
        'Don\'t re-upload removed content',
        'Don\'t post the same thing repackaged'
      ],
      paid: true
    },
    at_risk: {
      title: 'Account at risk of being disabled',
      what: 'There are already so many violations that one or two more can get the account disabled. This is the last warning.',
      when: 'Warnings stop counting after about a year.',
      steps: [
        'Open Account Status right away and appeal every removal you believe is wrong: reversed warnings stop counting.',
        'Delete or hide similar posts yourself before they\'re found.',
        'For 1-2 months avoid anything risky: controversial topics, other people\'s music and videos, links, mass messages, automation.',
        'Turn on two-factor authentication and remove third-party apps: if the account gets disabled because of a hack, it\'s harder to get back.'
      ],
      dont: [
        'Don\'t post anything borderline until the status turns green'
      ],
      paid: true
    },
    copyright: {
      title: 'Rights holder complaint (copyright / trademark)',
      what: 'Content was removed after a complaint from a person or company who says it\'s theirs (music, video, photo, logo). These removals add up: repeat violations get the account disabled.',
      when: 'File a counter-notice or appeal as soon as possible, before more complaints add up.',
      steps: [
        'In the notice, find who complained (name and email are often shown) and the report number.',
        'If you have the rights (your own video, a purchased license, the author\'s permission), write to the complainant and ask them to withdraw the complaint, or file a counter-notice through the link in the notice.',
        'If you don\'t have the rights, don\'t argue; delete similar posts that use the same material.',
        'From now on use music only from the app\'s own library (on a business account it is limited to tracks cleared for business use) and your own photos and videos.'
      ],
      dont: [
        'Don\'t re-upload removed content',
        'Don\'t file a counter-notice without the rights - that\'s a false statement'
      ],
      paid: true
    },
    features: {
      title: 'Features restricted for a period',
      what: 'The account works, but some features are turned off for a while (links, messages, live, ads, monetization). This is how {P} penalizes accumulated violations or actions that look like spam or scams. It lasts from a day to about 30 days.',
      when: 'Until the end date shown in Account Status.',
      steps: [
        'Open Account Status → Features you can\'t use: write down what is restricted and until when.',
        'Tap the restriction → See more / Why: it shows the rule it was applied for.',
        'If you didn\'t break the rule, tap Appeal; you\'re often asked to complete a check (selfie) - do it.',
        'Remove the cause: links to questionable sites, mass identical messages, auto-replies with links, "easy money" offers, giveaways with money transfers.',
        'Wait for the end date without trying to get around the restriction (another account, messaging services).'
      ],
      dont: [
        'Don\'t get around the restriction with a second account',
        'Don\'t send the same links through bots and automations'
      ],
      paid: true
    },
    scam: {
      title: 'Looks like scammers, not Meta',
      what: 'Signs of a fake message: "Meta support" writes to you in DMs or by email, threatens to delete your account within hours and asks you to click a link, fill in a form or enter your password. Meta doesn\'t do this: it tells you about violations inside the app (Account Status, notifications) and by email from @mail.instagram.com or @facebookmail.com.',
      when: 'No deadline - this is not a Meta decision.',
      steps: [
        'Don\'t tap anything in this message, don\'t enter your password or codes, don\'t pay.',
        'Check whether the email exists inside the app: Accounts Center → Password and security → Recent emails. If it isn\'t there, it\'s fake.',
        'Open Account Status in the app: if everything is green, there is no restriction.',
        'Report the sender and block them.'
      ],
      dont: [
        'Don\'t click links in messages like this',
        'Don\'t share codes from SMS or an authenticator app',
        'Don\'t pay "for account recovery" to anyone who messaged you first'
      ],
      paid: false,
      noPaid: 'Nothing to buy here: if it\'s a fake message, your account is fine. Just don\'t click anything.'
    },
    other: {
      title: 'We can\'t tell from these answers',
      what: 'Your case doesn\'t match the common types closely enough to name it honestly. The fastest way to find out is to look at what the app itself says.',
      when: 'Some restrictions have deadlines (often 180 days to appeal), so check today.',
      steps: [
        'Open Account Status in the app\'s settings: it lists removed content, restricted features and whether the account is at risk.',
        'Look for an email from @mail.instagram.com or @facebookmail.com and compare it with Accounts Center → Password and security → Recent emails.',
        'If the app shows an Appeal / Disagree with decision button, that\'s your official path - use it once and complete any check.',
        'Then run this check again and pick the option closest to what you saw.'
      ],
      dont: [
        'Don\'t create new accounts until you know what happened',
        'Don\'t pay anyone who messaged you first offering to help'
      ],
      paid: false,
      noPaid: 'When the type is unclear, we\'d rather not sell you a report. Check Account Status and run the diagnosis again.'
    }
  };

  var Q_PLATFORM = {
    id: 'platform', q: 'Which account is it?', hint: 'Pick the app where you see the problem.',
    opts: [['instagram', 'Instagram'], ['facebook', 'Facebook'], ['threads', 'Threads']]
  };
  var Q_SEE = {
    id: 'see', q: 'What do you see?', hint: 'Pick the closest one. If nothing fits, choose "Something else".',
    opts: [
      ['suspended', '"We suspended your account"', 'with a number of days to disagree'],
      ['disabled', '"Your account has been disabled"', 'or "We disabled your account"'],
      ['check', 'Asked for a code, video selfie or ID', '"Confirm it\'s you", age check'],
      ['hacked', 'Hacked: password or email changed', 'I can\'t log in, someone else is in'],
      ['action_block', 'Can\'t follow, like, comment or message', '"Try again later", "We restrict certain activity"'],
      ['reach', 'Reach suddenly dropped', 'non-followers don\'t see my posts'],
      ['removed', 'A post was removed or I got a warning', 'Community Guidelines, copyright report'],
      ['features', 'Some features are blocked until a date', 'links, DMs, live, ads'],
      ['scam', '"Meta support" messaged me', 'in DMs or email, with a link and a deadline'],
      ['other', 'Something else']
    ]
  };
  var Q_DISABLED = {
    id: 'appealbtn', q: 'Is there an Appeal button or a deadline on the screen?',
    hint: 'For example "Disagree with decision", "Request a review" or "You have 180 days to appeal".',
    opts: [['yes', 'Yes, there is a button or days left'], ['no', 'No - no button, no deadline'], ['unsure', 'I can\'t tell / can\'t log in to check']]
  };
  var Q_CHECK = {
    id: 'checktype', q: 'What does the screen ask for?', hint: '',
    opts: [['code', 'A code from SMS or email'], ['selfie', 'A video selfie'], ['id', 'A photo of an ID to confirm it\'s you'], ['age', 'Proof of age']]
  };
  var Q_HACKED = {
    id: 'access', q: 'Do you still have the email or phone number linked to the account?', hint: '',
    opts: [['yes', 'Yes, I still get emails / SMS'], ['no', 'No, the hacker changed them'], ['unsure', 'Not sure']]
  };
  var Q_REMOVED = {
    id: 'removedtype', q: 'What does the notice or Account Status say?', hint: '',
    opts: [['rules', 'It went against Community Guidelines'], ['copyright', 'A copyright or trademark report'], ['risk', '"Your account may be disabled" / at risk']]
  };
  var Q_SCAM = {
    id: 'clicked', q: 'Did you click the link or enter your password or a code?', hint: '',
    opts: [['no', 'No'], ['yes', 'Yes']]
  };
  var Q_APPEALED = {
    id: 'appealed', q: 'Have you already appealed or requested a review?', hint: '',
    opts: [['no', 'Not yet'], ['waiting', 'Yes, waiting for an answer'], ['rejected', 'Yes, and it was rejected']]
  };
  var Q_CAUSES = {
    id: 'causes', multi: true, q: 'Did any of this happen in the last few weeks?', hint: 'Pick all that apply. It helps find the likely trigger.',
    opts: [
      ['growth', 'Growth, auto-follow or mass-DM services, auto-replies with links'],
      ['vpn', 'A VPN, a new phone or a new country'],
      ['linked', 'Several accounts on one phone or in one Accounts Center'],
      ['team', 'Other people log into the account (team, agency, SMM)'],
      ['none', 'None of these']
    ]
  };

  var CAUSE_NOTE = {
    growth: 'Growth, auto-follow and mass-messaging services, and auto-replies that send links, are among the most common triggers for restrictions like this. Turn them off and remove their access before you appeal.',
    vpn: 'A VPN, a new phone or a new country often triggers identity checks. Appeal and complete checks from your usual phone and home network, with the VPN off.',
    linked: 'Accounts linked by one phone, one Accounts Center or one Facebook are often restricted together. While the links remain, a block on one can spread to the others - don\'t create new accounts during the review.',
    team: 'Several people logging into one account from different devices and countries can look like a takeover or a fake-account network. One account, one person, their own phone; teams work through Meta Business Suite.'
  };

  var state, history, root, bar;

  function kindFromAnswers(a) {
    var k = a.see;
    if (k === 'disabled') k = a.appealbtn === 'yes' ? 'disabled_appeal' : (a.appealbtn === 'unsure' ? 'disabled_check' : 'disabled_final');
    if (k === 'check' && a.checktype === 'age') k = 'age';
    if (k === 'removed') k = a.removedtype === 'copyright' ? 'copyright' : (a.removedtype === 'risk' ? 'at_risk' : 'removed');
    if ((k === 'suspended' || k === 'disabled_appeal') && a.appealed === 'rejected') k = 'disabled_final';
    return k;
  }

  function nextQuestion(a) {
    if (!a.platform) return Q_PLATFORM;
    if (!a.see) return Q_SEE;
    var s = a.see;
    if (s === 'disabled' && !a.appealbtn) return Q_DISABLED;
    if (s === 'check' && !a.checktype) return Q_CHECK;
    if (s === 'hacked' && !a.access) return Q_HACKED;
    if (s === 'removed' && !a.removedtype) return Q_REMOVED;
    if (s === 'scam' && !a.clicked) return Q_SCAM;
    var k = kindFromAnswers(a);
    var needAppeal = ['suspended', 'disabled_appeal', 'removed', 'at_risk', 'copyright', 'features', 'reach'];
    if (needAppeal.indexOf(k) >= 0 && !a.appealed) return Q_APPEALED;
    var needCauses = ['suspended', 'disabled_appeal', 'check', 'action_block', 'features', 'reach', 'at_risk'];
    if (needCauses.indexOf(k) >= 0 && !a.causes) return Q_CAUSES;
    return null;
  }

  function fill(t) {
    var p = state.platform || 'instagram';
    return t.replace(/\{P\}/g, P[p]).replace(/\{HACKED\}/g, HACKED_URL[p]);
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function progress(n) { if (bar) bar.style.width = Math.min(100, n) + '%'; }

  function renderQuestion(q) {
    root.innerHTML = '';
    var step = history.length + 1;
    progress(step * 18);
    root.appendChild(el('div', 'quiz-step', 'Question ' + step));
    var h = el('h2', 'quiz-q'); h.textContent = q.q; h.id = 'quiz-q'; h.tabIndex = -1; root.appendChild(h);
    if (q.hint) { var hn = el('p', 'quiz-hint'); hn.textContent = q.hint; root.appendChild(hn); }
    var box = el('div', 'opts' + (q.opts.length > 4 && !q.multi ? ' two' : ''));
    var picked = [];
    q.opts.forEach(function (o) {
      var b = el('button', 'opt');
      b.type = 'button';
      b.setAttribute('aria-pressed', 'false');
      b.textContent = o[1];
      if (o[2]) { var s = el('small'); s.textContent = o[2]; b.appendChild(s); }
      b.addEventListener('click', function () {
        if (!q.multi) { answer(q, o[0]); return; }
        if (o[0] === 'none') { picked = ['none']; }
        else { picked = picked.filter(function (x) { return x !== 'none'; });
          var i = picked.indexOf(o[0]); if (i >= 0) picked.splice(i, 1); else picked.push(o[0]); }
        Array.prototype.forEach.call(box.children, function (c, idx) {
          c.setAttribute('aria-pressed', picked.indexOf(q.opts[idx][0]) >= 0 ? 'true' : 'false');
        });
        cont.disabled = !picked.length;
      });
      box.appendChild(b);
    });
    root.appendChild(box);
    var nav = el('div', 'quiz-nav');
    if (history.length) {
      var back = el('button', 'linkbtn', '← Back'); back.type = 'button';
      back.addEventListener('click', goBack); nav.appendChild(back);
    } else nav.appendChild(el('span'));
    if (q.multi) {
      var cont = el('button', 'btn', 'Show my diagnosis'); cont.type = 'button'; cont.disabled = true;
      cont.addEventListener('click', function () { answer(q, picked.slice()); });
      nav.appendChild(cont);
    }
    root.appendChild(nav);
  }

  function answer(q, v) {
    history.push(q.id);
    state[q.id] = v;
    if (!state._started) { state._started = 1; goal('en_diag_start'); }
    step();
  }

  function goBack() {
    var id = history.pop();
    delete state[id];
    step(true);
  }

  function step(fromBack) {
    var q = nextQuestion(state);
    if (q) renderQuestion(q); else renderResult();
    if (fromBack !== undefined || history.length) {
      var f = root.querySelector('#quiz-q, .res-title');
      if (f) { f.focus({ preventScroll: true }); }
      var top = document.getElementById('check').getBoundingClientRect().top + window.scrollY - 70;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'instant' });
    }
  }

  function list(items, ordered) {
    var l = el(ordered ? 'ol' : 'ul');
    items.forEach(function (t) { var li = el('li'); li.textContent = fill(t); l.appendChild(li); });
    return l;
  }

  function renderResult() {
    progress(100);
    var k = kindFromAnswers(state), d = KINDS[k];
    goal('en_diag_done');
    goal('en_diag_' + k);
    root.innerHTML = '';
    var res = el('div', 'res');
    res.appendChild(el('div', 'res-label', k === 'other' ? 'Free diagnosis' : 'Most likely'));
    var h = el('h2', 'res-title'); h.textContent = fill(d.title); h.tabIndex = -1; res.appendChild(h);

    if (NOTE[state.platform]) { var n = el('p', 'note'); n.textContent = NOTE[state.platform]; res.appendChild(n); }

    var w = el('div', 'res-box'); var wp = el('p'); wp.textContent = fill(d.what); w.appendChild(wp); res.appendChild(w);
    var when = el('p'); when.innerHTML = '<strong>Timing:</strong> '; when.appendChild(document.createTextNode(fill(d.when))); res.appendChild(when);

    // Notes from answers
    var extra = [];
    if (state.appealed === 'waiting') extra.push('You already appealed: don\'t send it again. Check the app and your email every day, including Spam.');
    if (state.appealed === 'rejected' && (state.see === 'suspended' || state.see === 'disabled')) extra.push('You said the appeal was already rejected - that usually makes the decision final in the app.');
    if (k === 'hacked' && state.access === 'no') extra.push('The hacker changed your email or phone: look in your old email for the message about that change - it usually has a "revert this change" link. If there is none, use the recovery flow below and choose the option to confirm your identity.');
    if (k === 'scam' && state.clicked === 'yes') extra.push('If you entered your password or a code there: change your password now, turn on two-factor authentication, and log out of unknown devices in Accounts Center → Password and security → Where you\'re logged in.');
    if (state.checktype === 'id') extra.push('Use an ID that shows your name, date of birth and photo; the name should match the account or be easy to explain. Only your own document.');
    if (state.checktype === 'selfie') extra.push('For the video selfie: one calm attempt in good light usually works better than several quick ones.');
    if (Array.isArray(state.causes)) state.causes.forEach(function (c) { if (CAUSE_NOTE[c]) extra.push(CAUSE_NOTE[c]); });
    extra.forEach(function (t) { var x = el('div', 'warn'); x.textContent = t; res.appendChild(x); });

    res.appendChild(el('h3', null, 'What to do now'));
    res.appendChild(list(d.steps, true));
    res.appendChild(el('h3', null, 'What not to do'));
    res.appendChild(list(d.dont, false));

    var small = el('p', 'note', 'This is a first diagnosis from your answers, not from your screenshots. The final decision on any account is made only by Meta.');
    res.appendChild(small);

    var paid = d.paid && !(k === 'check' && state.checktype === 'code');
    if (paid) {
      var o = el('div', 'offer');
      o.innerHTML =
        '<h3>Personal report + appeal letter · <span class="price">' + PRICE + '</span></h3>' +
        '<p>Send screenshots of what you see (the restriction screen, Account Status, the email). You get a PDF made for your case:</p>' +
        '<ul>' +
        '<li>which restriction it is and which Meta rule it refers to - read from your screenshots</li>' +
        '<li>deadlines and what happens if you miss them</li>' +
        '<li>a step-by-step plan for your situation, and what not to do</li>' +
        '<li>an appeal text for your case, for wherever a text field is available (appeal screen, Help Center form, Oversight Board)</li>' +
        '<li>similar real cases and what worked in them</li>' +
        '</ul>' +
        '<p>Delivered by email within 24 hours. If it doesn\'t arrive in 24 hours, you get a full refund. One-time payment, no subscription. We never ask for your password. <a href="/en/privacy.html">Privacy and refunds</a></p>' +
        '<a class="btn btn-fill" id="buy" href="#">Get my report · ' + PRICE + '</a>' +
        '<p class="soon" id="soon">Checkout opens soon. For now, follow the free steps above - they are the same first steps the report starts with.</p>' +
        '<p class="note">Honest note: no one outside Meta can restore an account, and no one can promise the outcome. The report helps you understand what happened and appeal correctly; the decision is Meta\'s.</p>';
      res.appendChild(o);
      var buy = o.querySelector('#buy');
      if (GUMROAD_URL) { buy.href = GUMROAD_URL + (GUMROAD_URL.indexOf('?') < 0 ? '?' : '&') + 'kind=' + k; buy.target = '_blank'; buy.rel = 'noopener'; }
      buy.addEventListener('click', function (e) {
        goal('en_buy_click'); goal('en_buy_click_' + k);
        if (!GUMROAD_URL) { e.preventDefault(); o.querySelector('#soon').classList.add('on'); }
      });
    } else if (d.noPaid || k === 'check') {
      var np = el('p', 'warn'); np.textContent = fill(d.noPaid || 'Nothing to buy here: a login code usually resolves this within minutes. If the check fails or you end up suspended, run the diagnosis again.'); res.appendChild(np);
    }

    var nav = el('div', 'quiz-nav');
    var back = el('button', 'linkbtn', '← Change last answer'); back.type = 'button'; back.addEventListener('click', goBack);
    var again = el('button', 'linkbtn', 'Start over'); again.type = 'button'; again.addEventListener('click', start);
    nav.appendChild(back); nav.appendChild(again);
    res.appendChild(nav);
    root.appendChild(res);
  }

  function start() {
    state = {}; history = [];
    renderQuestion(Q_PLATFORM);
    progress(4);
  }

  document.addEventListener('DOMContentLoaded', function () {
    root = document.getElementById('quiz-body');
    bar = document.querySelector('.quiz-progress i');
    if (!root) return;
    start();
    // Articles link here with ?see=<kind> to skip the first questions
    var m = /[?&]see=([a-z_]+)/.exec(location.search);
    var p = /[?&]p=(instagram|facebook|threads)/.exec(location.search);
    if (p) { history.push('platform'); state.platform = p[1]; }
    if (m && state.platform && Q_SEE.opts.some(function (o) { return o[0] === m[1]; })) { history.push('see'); state.see = m[1]; }
    if (history.length) step();
  });
})();
