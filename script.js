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
})();
