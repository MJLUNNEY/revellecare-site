/* RevelleCare — concern-first homepage */
(function () {
  var CONCERNS = [
    { id: 'hormonal', name: 'Hormonal skin changes', value: 'Hormonal skin changes', img: 'concern-hormonal.jpg',
      alt: 'A woman in her late forties with deep brown skin and short natural hair, looking calmly at the camera',
      short: 'Thinning, dryness and loss of firmness as estrogen shifts.',
      intro: 'As estrogen declines through perimenopause and menopause, many women notice their skin behaves differently: drier, thinner and less resilient than before.',
      signs: ['Skin that feels drier or tighter than it used to', 'Thinner, more fragile-looking skin', 'Loss of firmness or bounce', 'Products that used to work no longer do'],
      approach: 'Your clinician will review your life stage, hormonal history and skin goals to decide whether a personalized prescription is appropriate for you.' },
    { id: 'lines', name: 'Fine lines & texture', value: 'Fine lines & texture', img: 'concern-lines.jpg',
      alt: 'A woman in her late forties with dark wavy hair and soft smile lines',
      short: 'Fine lines, rough texture and dullness.',
      intro: 'Changes in collagen and cell turnover over time can show up as fine lines, uneven texture and skin that looks less luminous.',
      signs: ['Fine lines around the eyes and mouth', 'Rough or uneven texture', 'Dullness or loss of glow', 'Visible pores'],
      approach: 'Your clinician will consider your skin type, sensitivity and routine to decide whether prescription care is right for you, and adjust it at follow-up.' },
    { id: 'acne', name: 'Adult & hormonal acne', value: 'Adult & hormonal acne', img: 'concern-acne.jpg',
      alt: 'A woman in her mid-twenties with dark hair in a loose bun and a few breakouts along her jaw and chin',
      short: 'Breakouts along the jaw and chin, well past your teens.',
      intro: 'Acne doesn\u2019t always end with adolescence. Hormonal shifts can bring breakouts in your twenties and thirties, or bring them back in your forties and beyond.',
      signs: ['Breakouts along the jaw, chin or neck', 'Flares linked to your cycle', 'Tender, deeper spots', 'Marks that linger after breakouts'],
      approach: 'Your clinician will look at patterns, triggers and your health history to decide on a personalized plan, if treatment is appropriate.' },
    { id: 'pigmentation', name: 'Melasma & pigmentation', value: 'Melasma & pigmentation', img: 'concern-pigmentation.jpg',
      alt: 'A woman in her early thirties with medium-brown skin and darker patches of melasma on her cheeks',
      short: 'Dark patches, sun spots and uneven tone.',
      intro: 'Hormones, birth control, pregnancy, sun exposure and genetics can all play a part in melasma and uneven pigmentation at any age, and every skin tone deserves care designed for it.',
      signs: ['Darker patches on the cheeks, forehead or upper lip', 'Sun spots or uneven tone', 'Marks that darken in summer', 'Pigmentation after pregnancy or hormonal changes'],
      approach: 'Your clinician will consider your skin tone, history and sun habits before deciding whether a personalized prescription is appropriate.' },
    { id: 'redness', name: 'Rosacea & redness', value: 'Rosacea & redness', img: 'concern-redness.jpg',
      alt: 'A woman in her early thirties with fair skin, strawberry-blonde hair and natural redness across her cheeks',
      short: 'Flushing, persistent redness and sensitivity.',
      intro: 'Rosacea and redness can begin in your twenties or thirties and often become more noticeable during hormonal transitions. Sensitive skin needs a gentler, considered approach.',
      signs: ['Flushing that comes and goes', 'Persistent redness on the cheeks or nose', 'Skin that stings or reacts easily', 'Small bumps or visible vessels'],
      approach: 'Your clinician will review your triggers and sensitivities to decide on care that is appropriate for your skin.' },
    { id: 'intimate', name: 'Intimate wellness', value: 'Intimate wellness', img: 'concern-intimate.jpg',
      alt: 'A woman in her fifties wrapped in a soft blanket holding a cup of tea, eyes closed and relaxed',
      short: 'Dryness and discomfort linked to menopause.',
      intro: 'Changes in intimate comfort are common with menopause and are part of the genitourinary syndrome of menopause (GSM). They are a health concern, not something to put up with quietly.',
      signs: ['Vaginal dryness or irritation', 'Discomfort during intimacy', 'Changes in comfort day to day', 'Changes that began around perimenopause or menopause'],
      approach: 'Your clinician will have a private, judgment-free conversation with you about your symptoms and history to decide on appropriate care.' },
    { id: 'hair', name: 'Hair thinning', value: 'Hair thinning', img: 'concern-hair.jpg', soon: true,
      alt: 'A woman in her fifties running her fingers through her hair near the part',
      short: 'A wider part or less fullness than before.',
      intro: 'Many women notice thinning hair during hormonal transitions. We\u2019re building care for this concern and will open it after launch.',
      signs: ['A wider part', 'Less fullness or volume', 'More shedding than usual', 'Changes that began with hormonal shifts'],
      approach: 'Join The Collective with this concern selected and we\u2019ll let you know when hair care opens.' }
  ];

  var grid = document.getElementById('concern-grid');
  var dlg = document.getElementById('concern-dialog');
  if (!grid) return;

  grid.innerHTML = CONCERNS.map(function (c) {
    return '<button type="button" class="cf-card" data-id="' + c.id + '" aria-haspopup="dialog">' +
      '<span class="cf-card-media"><img src="assets/images/home/' + c.img + '" alt="' + c.alt + '" loading="lazy" width="900" height="1200" />' +
      (c.soon ? '<span class="cf-badge">Coming later</span>' : '') + '</span>' +
      '<span class="cf-card-body"><span class="cf-card-title">' + c.name + '</span>' +
      '<span class="cf-card-text">' + c.short + '</span>' +
      '<span class="cf-card-cta">Learn more <span aria-hidden="true">→</span></span></span></button>';
  }).join('');

  var current = null;
  function openConcern(id) {
    var c = CONCERNS.find(function (x) { return x.id === id; });
    if (!c || !dlg) return;
    current = c;
    document.getElementById('dlg-img').src = 'assets/images/home/' + c.img;
    document.getElementById('dlg-img').alt = c.alt;
    document.getElementById('dlg-label').textContent = c.soon ? 'Coming later' : 'Concern';
    document.getElementById('dlg-title').textContent = c.name;
    document.getElementById('dlg-intro').textContent = c.intro;
    document.getElementById('dlg-signs').innerHTML = c.signs.map(function (s) { return '<li>' + s + '</li>'; }).join('');
    document.getElementById('dlg-approach').textContent = c.approach;
    document.getElementById('dlg-start').textContent = c.soon ? 'Notify me when it opens' : 'Start with this concern';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }
  function closeDlg() {
    if (dlg.close) dlg.close(); else dlg.removeAttribute('open');
  }

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.cf-card');
    if (card) openConcern(card.dataset.id);
  });
  if (dlg) {
    dlg.addEventListener('close', function () { document.body.style.overflow = ''; });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) closeDlg();
    });
    document.getElementById('dlg-start').addEventListener('click', function () {
      var sel = document.getElementById('field-concern');
      if (sel && current) sel.value = current.value;
      closeDlg();
      document.getElementById('collective').scrollIntoView({ behavior: 'smooth' });
      setTimeout(function () { var em = document.getElementById('field-email'); if (em) em.focus({ preventScroll: true }); }, 600);
    });
  }

  // Symptom matcher
  var chips = document.querySelectorAll('.cf-chip');
  var result = document.querySelector('.cf-matcher-result');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      var ids = {};
      document.querySelectorAll('.cf-chip[aria-pressed="true"]').forEach(function (c) {
        c.dataset.match.split(' ').forEach(function (m) { ids[m] = true; });
      });
      var keys = Object.keys(ids);
      grid.querySelectorAll('.cf-card').forEach(function (card) {
        card.classList.toggle('is-match', keys.length > 0 && !!ids[card.dataset.id]);
        card.classList.toggle('is-dim', keys.length > 0 && !ids[card.dataset.id]);
      });
      if (!keys.length) { result.textContent = ''; return; }
      var names = CONCERNS.filter(function (c) { return ids[c.id]; }).map(function (c) { return c.name; });
      result.textContent = 'You may want to start with: ' + names.join(', ') + '. Your clinician will look at the full picture.';
    });
  });

  // Collective form (Netlify + welcome email; honeypot preserved)
  var form = document.getElementById('collective-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('[name="bot-field"]').value) return;
      var name = document.getElementById('field-name').value.trim();
      var email = document.getElementById('field-email').value.trim();
      var concern = document.getElementById('field-concern').value;
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).catch(function () {});
      fetch('/.netlify/functions/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || 'Collective Member', email: email, concern: concern })
      }).catch(function () {});
      form.innerHTML = '<p class="cf-form-done">You\u2019re in. Welcome to The Collective.</p>' +
        '<p class="cf-form-done-sub">We\u2019ll be in touch the moment assessments open in Ontario &amp; British Columbia.</p>';
    });
  }
})();
