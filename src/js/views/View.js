export default class View {
  #actionBtns = document.querySelectorAll('.action-button');
  #divTooltip = document.querySelector('.div-tooltip');
  #mediaQueryMobile = window.matchMedia('(max-width: 700px)');
  #myPalette = document.querySelector('.colors-container-my-palette');
  #colorCounterLabel = document.querySelector('.my-palette-label-counter');
  #addedSuccessLabel = document.querySelector(
    '.added-to-palette-confirmation-label'
  );
  #addedErrorLabel = document.querySelector('.added-to-palette-error-label');
  #timeoutHolder;

  //Initializing tooltip
  initTooltip() {
    this.#actionBtns.forEach(btn =>
      btn.addEventListener('mouseenter', e => this.#showTooltip(e))
    );

    this.#actionBtns.forEach(btn =>
      btn.addEventListener('mouseleave', () => this.#hideTooltip())
    );
  }

  #showTooltip(e) {
    this.#divTooltip.style.display = 'none';
    let target = e.target;
    let targetAttr = target.dataset.tooltip;
    //Target coords
    let targetTop = target.getBoundingClientRect().top + 'px';
    let targetLeft = target.getBoundingClientRect().left + 30 + 'px';

    this.#timeoutHolder = setTimeout(() => {
      if (!this.#mediaQueryMobile.matches && this.#divTooltip) {
        this.#divTooltip.textContent = targetAttr;
        this.#divTooltip.style.top = targetTop;
        this.#divTooltip.style.left = targetLeft;
        this.#divTooltip.style.display = 'inline';
      }
    }, 700);
  }

  #hideTooltip() {
    clearTimeout(this.#timeoutHolder);
    setTimeout(() => {
      this.#divTooltip.style.display = 'none';
    }, 0);
  }

  //Displaying status when copied to clipboard or added to palette
  displayStatus(el, classname) {
    const display = setTimeout(() => {
      el.classList.add(classname);

      this.#hideStatus(el, classname);
    }, 100);
  }

  #hideStatus(el, classname) {
    const hide = setTimeout(() => {
      el.classList.remove(classname);
    }, 700);
  }

  //Rendering color in palette
  renderAddedColorInPalette(color) {
    const colorWrapper = document.createElement('div');
    colorWrapper.classList.add('color-wrapper-my-palette');
    colorWrapper.innerHTML = `
      <div
            class="color-my-palette"
            style="background-color: ${color}"
          ></div>
          <div class="divider-my-palette">
            <p class="label-hex-code-my-palette">${color}</p>
            <button class="copy-hex-my-palette-btn">
              <i class="fa-solid fa-copy off-pointer-event"></i>
            </button>
          </div>
          <button class="remove-color-my-palette-btn">
            <i class="ri-close-circle-line off-pointer-event"></i>
          </button>
    `;
    this.#myPalette.prepend(colorWrapper);
  }

  //Counting colors in palette
  #paletteColorsCounter() {
    const labelsMyPalette = document.querySelectorAll(
      '.label-hex-code-my-palette'
    );

    const arr = [];
    labelsMyPalette.forEach(label => {
      arr.push(label.textContent);
    });

    return arr.length;
  }

  //Render colors count
  renderColorsCounter() {
    const value = this.#paletteColorsCounter();

    if (value === 0)
      this.#colorCounterLabel.textContent = `${value} colors in your library! 😌`;

    if (value === 1)
      this.#colorCounterLabel.textContent = `${value} color in your library! 😀`;

    if (value > 1)
      this.#colorCounterLabel.textContent = `${value} colors in your library! 😀`;
  }

  // Color validation, if color exists in palette, display error label, if not, add to palette
  validateColor(hex, saveToLocalStorage, locStoragePalette) {
    let data;
    if (localStorage.getItem(locStoragePalette) === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem(locStoragePalette));
    }

    if (data.indexOf(hex) === -1 || data === '[]') {
      this.renderAddedColorInPalette(hex);
      saveToLocalStorage(hex);
      this.displayStatus(
        this.#addedSuccessLabel,
        'added-to-palette-confirmation-label-active'
      );
    }
    if (data.indexOf(hex) > -1)
      this.displayStatus(
        this.#addedErrorLabel,
        'added-to-palette-error-label-active'
      );
  }

  highlightHeart(el) {
    setTimeout(() => {
      el.classList.add('heart-highlight');
      setTimeout(() => {
        document
          .querySelectorAll('.heart')
          .forEach(heart => heart.classList.remove('heart-highlight'));
      }, 1000);
    }, 100);
  }
}
