import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            window.alert('FORM NOT SUBMITTED!');
            this.validateCampos(event);
        });
    }

    validateCampos(event) {
        const el = event.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            this.createMsgErro('Invalid email', emailInput);
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.createMsgErro('Password must be between 3 and 50 characters', passwordInput);
            error = true;
        }

        if (!error) el.submit();
    }

    createMsgErro(msg, elemento) {
        const divNova = document.createElement('div');
        divNova.style.backgroundColor = 'red';
        divNova.classList.add('error-text');
        divNova.innerHTML = msg;
        elemento.insertAdjacentElement('afterend', divNova);
    }
}
