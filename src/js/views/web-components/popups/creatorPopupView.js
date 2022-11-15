class FromCreatorPopup extends HTMLElement {
  #fromCreatorOpenBtn = document.querySelector('.from-creator-btn');
  #fromCreatorCloseBtn = document.querySelector(
    '.close-from-creator-content-btn'
  );
  #fromCreatorContent = document.querySelector('.from-creator-content');
  #backgroundOverlay = document.querySelector('.overlay-modal');

  addHandler() {
    this.#fromCreatorOpenBtn?.addEventListener('click', e =>
      this.#displayFromCreatorContent(e)
    );

    this.#fromCreatorCloseBtn?.addEventListener('click', () =>
      this.#closeFromCreatorContent('hide')
    );

    this.#backgroundOverlay?.addEventListener('click', () =>
      this.#closeFromCreatorContent('hide')
    );
  }

  #displayFromCreatorContent(e) {
    e.preventDefault();
    this.#fromCreatorContent?.classList.remove('hide');
    this.#backgroundOverlay.classList.remove('hide');
  }

  #closeFromCreatorContent(classname) {
    this.#fromCreatorContent?.classList.add(classname);
    this.#backgroundOverlay.classList.add(classname);
  }

  connectedCallback() {
    this.innerHTML = `<div class="from-creator-content hide">
      <div class="close-from-creator-content-area">
        <button class="close-from-creator-content-btn">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
      <h3>Dear Community,</h3>
      <p>
        Thank you 💗 for using my app. I created it with you in mind 🥰.
      <p>Help me to develop this app further!</p>
      <p>I want to remain objective and meet your expectations. Therefore, feel free to submit your request via <a target="_blank" href="https://github.com/maciejkuran/colorala.com/issues">GitHub -> issues.</a></p>
      <p>New features or something else?</p>
      <p>All requests are considered important.</p>
    </div>`;
  }
}

customElements.define('from-creator-popup', FromCreatorPopup);

export default new FromCreatorPopup();
