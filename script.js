(function () {
  var form = document.getElementById('regForm');
  var tabs = document.querySelectorAll('.form-tab');
  var emailInputWrap = document.querySelector('.input-wrap--email');
  var passwordInput = document.getElementById('passwordInput');
  var togglePasswordBtn = document.getElementById('togglePassword');

  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var tabName = this.getAttribute('data-tab');
        tabs.forEach(function (t) {
          t.classList.remove('form-tab--active');
          t.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('form-tab--active');
        this.setAttribute('aria-pressed', 'true');

        if (emailInputWrap) {
          var input = emailInputWrap.querySelector('.form-input');
          if (input) {
            if (tabName === 'phone') {
              input.type = 'tel';
              input.placeholder = 'Phone number';
            } else {
              input.type = 'email';
              input.placeholder = 'Email address';
            }
          }
        }
      });
    });
  }

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', function () {
      var isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('Form submit (prevented)');
    });
  }

  (function wheelFortune() {
    // --- НАСТРОЙКИ: на каких секторах останавливается колесо ---
    // 12 секторов (0–11), по 30° каждый. Указатель сверху.
    // LIGHT_SECTOR_INDICES — индексы СВЕТЛЫХ секторов (призы). Колесо останавливается только на них.
    // Красные сектора (1, 3, 5, 7, 9, 11) — не используются.
    var SECTORS_COUNT = 12;
    var DEG_PER_SECTOR = 360 / SECTORS_COUNT;
    var LIGHT_SECTOR_INDICES = [1, 3, 5, 7, 9, 11]; // Меняй здесь: какие сектора выигрышные

    var LIGHT_TARGET_ANGLES = LIGHT_SECTOR_INDICES.map(function (i) {
      var centerAngle = i * DEG_PER_SECTOR + DEG_PER_SECTOR / 2;
      return (360 - centerAngle) % 360;
    });

    function randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    var wheelInner = document.getElementById('wheelInner');
    var spinBtn = document.getElementById('wheelSpinBtn');
    var wheelSection = document.querySelector('.wheel-section');
    var pageBlock = document.querySelector('.page');
    var currentRotation = 0;

    if (!wheelInner || !spinBtn) return;

    spinBtn.addEventListener('click', function () {
      spinBtn.disabled = true;
      wheelInner.style.transition = 'transform 9s ease-out';
      var targetAngle = randomChoice(LIGHT_TARGET_ANGLES);
      var extraSpins = 5 + Math.floor(Math.random() * 4);
      var delta = (targetAngle - (currentRotation % 360) + 360) % 360;
      var totalRotation = currentRotation + 360 * extraSpins + delta;

      wheelInner.style.transform = 'rotate(' + totalRotation + 'deg)';
      currentRotation = totalRotation;
    });

    wheelInner.addEventListener('transitionend', function () {
      wheelInner.style.transition = 'none';
      spinBtn.disabled = false;
      requestAnimationFrame(function () {
        wheelInner.style.transition = 'transform 9s ease-out';
      });

      if (wheelSection) wheelSection.classList.add('wheel-section--hidden');
      if (pageBlock) pageBlock.classList.add('page--visible');
    });
  })();
})();
