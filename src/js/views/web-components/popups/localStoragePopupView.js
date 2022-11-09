import img from '/src/img/colorala how to save to palette animation.gif';

class LocalStoragePopup extends HTMLElement {
  #popupContainer = document.querySelector(
    '.add-to-palette-local-storage-info-popup'
  );
  #backgroundOverlay = document.querySelector('.overlay-modal');
  #closeBtn = document.querySelector('.close-about-local-storage-popup-btn');

  addHandler(cookies, welcomeMsgLocStorage, welcomeMsgState) {
    this.#closeBtn?.addEventListener('click', e =>
      this.closePopup(e, welcomeMsgLocStorage, welcomeMsgState)
    );

    this.#backgroundOverlay?.addEventListener('click', e =>
      this.closePopup(e, welcomeMsgLocStorage, welcomeMsgState)
    );

    document.addEventListener('DOMContentLoaded', () =>
      this.showPopup(cookies, welcomeMsgLocStorage)
    );
  }

  showPopup(cookies, welcomeMsgLocStorage) {
    if (!this.#popupContainer) return;

    setTimeout(() => {
      if (
        !localStorage.getItem(welcomeMsgLocStorage) &&
        localStorage.getItem(cookies)
      ) {
        this.#popupContainer.classList.remove('hide');

        this.#backgroundOverlay.classList.remove('hide');
        this.#backgroundOverlay.style.pointerEvents = 'all';
      }
    }, 500);
  }

  closePopup(e, welcomeMsgLocStorage, welcomeMsgState) {
    if (e.target) {
      localStorage.setItem(welcomeMsgLocStorage, welcomeMsgState);
      this.#popupContainer?.classList.add('hide');
      this.#backgroundOverlay.classList.add('hide');
    }
  }

  connectedCallback() {
    this.innerHTML = `<div class="add-to-palette-local-storage-info-popup hide">
      <div class="close-local-storage-info-content-area">
        <button class="close close-about-local-storage-popup-btn">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
      <h3>Hello there 😉</h3>
      <img
        src="${img}"
        alt="colorala how to save color to palette"
      />
      <p>
        When creating your color palette, save the colors in
        <b>'My Palette'</b>. All colors are
        <strong>saved in your browser's local storage</strong>. Unless you
        delete the data from your browser, the
        <b> added colors will NOT disappear! </b> 🟢
      </p>
      <p>Export your palette to <b>PDF format</b> at any time.</p>
    </div>`;
  }
}

customElements.define('about-local-storage-popup', LocalStoragePopup);

export default new LocalStoragePopup();
