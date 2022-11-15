import cookie from '/src/img/cookies img.png';
import localStoragePopupView from './localStoragePopupView.js';

class CookiesPopup extends HTMLElement {
  #cookiesContainer = document.querySelector('.cookies-container');
  #cookiesAcceptBtn = document.querySelector('.accept-cookies-btn');
  #overlayCookies = document.querySelector('.overlay-modal-cookies');

  addHandler(name, state, locStorageWelcomeMsg) {
    document.addEventListener('DOMContentLoaded', () =>
      this.#showCookies(name)
    );

    this.#cookiesAcceptBtn?.addEventListener('click', () => {
      this.#acceptCookies(name, state, locStorageWelcomeMsg);
    });
  }

  #showCookies(name) {
    if (!localStorage.getItem(name)) {
      this.#cookiesContainer?.classList.remove('hide');
      this.#overlayCookies?.classList.remove('hide');
    } else {
      this.#cookiesContainer?.classList.add('hide');
      this.#overlayCookies?.classList.add('hide');
    }
  }

  #acceptCookies(name, state, locStorageWelcomeMsg) {
    this.#cookiesContainer.classList.add('hide');
    this.#overlayCookies.classList.add('hide');
    localStorage.setItem(name, JSON.stringify(state));

    localStoragePopupView.showPopup(name, locStorageWelcomeMsg);
  }

  connectedCallback() {
    this.innerHTML = `<div class="cookies-container hide">
      <div>
        <h3>Cookies!</h3>
        <img src="${cookie}" alt="" />
      </div>
      <p>
        By using colorala website, you agree to the use of cookies.
        <a target="_blank" href="/privacy-policy"
          >Find out more about cookies</a
        >
        or launch the app now!
      </p>
      <button class="accept-cookies-btn primary-button">ACCEPT</button>
    </div>`;
  }
}

customElements.define('cookies-popup', CookiesPopup);

export default new CookiesPopup();
