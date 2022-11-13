import View from '../views/View.js';

class preMadePalettesView extends View {
  #palettesContainer = document.querySelector('.pre-made-palettes-container');
  #filterBtns = document.querySelectorAll('.filter-btn');

  addHandler(saveToLocalStorage, locStoragePalette, copyToClipboard, palettes) {
    //Initializing bar
    this.#initBar();

    //Initialize adding to palette
    this.#initAddToPalette(
      saveToLocalStorage,
      locStoragePalette,
      copyToClipboard
    );

    // Allow copying to clipboard
    this.#initCopyHEX(copyToClipboard);

    //Init filtering colors
    this.#filterBtns.forEach(btn =>
      btn.addEventListener('click', e =>
        this.#filterPalettes(
          e,
          palettes,
          saveToLocalStorage,
          locStoragePalette,
          copyToClipboard
        )
      )
    );
  }

  //Rendering palettes in DOM
  renderPalettes(palettes) {
    palettes.forEach(pal => {
      const palette = document.createElement('div');
      palette.classList.add('pre-made-palette');

      pal.colors.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('single-color-container');
        div.style.backgroundColor = `${color}`;
        div.innerHTML = `<div class="single-color-internal-wrapper">
          <p class="hex-label">${color}</p>
          <button data-tooltip="Copy" class="copy-hex-btn action-button">
            <i class="fa-solid fa-copy copy-icon"></i>
          </button>
          <button data-tooltip="Add to Library" class="add-pre-clr-to-palette-btn action-button">
            <i class="fa-solid fa-heart heart"></i>
          </button>
        </div>`;
        palette.append(div);

        if (!this.#palettesContainer) return;
        this.#palettesContainer.append(palette);
      });
    });
  }
  //show bar over color
  #showBar(e) {
    let target = e.target;
    let bar = e.target.children[0];

    if (!target) return;

    if (target && bar) {
      bar.classList.add('single-color-internal-wrapper-active');
    }
  }
  //hide bar over color
  #hideBar() {
    const bars = document.querySelectorAll('.single-color-internal-wrapper');
    bars.forEach(bar =>
      bar.classList.remove('single-color-internal-wrapper-active')
    );
  }

  // Init bar
  #initBar() {
    //Show / hide bar on color mouseenter / mouseleave
    const singleColorContainer = document.querySelectorAll(
      '.single-color-container'
    );

    singleColorContainer.forEach(container =>
      container.addEventListener('mouseenter', e => this.#showBar(e))
    );

    singleColorContainer.forEach(container =>
      container.addEventListener('mouseleave', () => this.#hideBar())
    );
  }

  //adding to palette
  #addToPalette(e, saveToLocalStorage, locStoragePalette, copyToClipboard) {
    let getHEX =
      e.target.previousElementSibling.previousElementSibling.textContent;
    let heart = e.target.children[0];
    this.validateColor(getHEX, saveToLocalStorage, locStoragePalette);
    this.highlightHeart(heart);
    this.renderColorsCounter();
    this.copyHEXFromPalette(copyToClipboard);
  }

  #initAddToPalette(saveToLocalStorage, locStoragePalette, copyToClipboard) {
    const addToPaletteBtns = document.querySelectorAll(
      '.add-pre-clr-to-palette-btn'
    );

    addToPaletteBtns.forEach(btn =>
      btn.addEventListener('click', e =>
        this.#addToPalette(
          e,
          saveToLocalStorage,
          locStoragePalette,
          copyToClipboard
        )
      )
    );
  }

  //copy to clipboard
  #copyHEX(e, copyToClipboard) {
    let hex = e.target.previousElementSibling.textContent;
    copyToClipboard(hex);
    this.displayStatus(this.copiedLabel, 'copied-to-clipboard-label-active');
  }

  #initCopyHEX(copyToClipboard) {
    const copyBtns = document.querySelectorAll('.copy-hex-btn');
    copyBtns.forEach(btn =>
      btn.addEventListener('click', e => this.#copyHEX(e, copyToClipboard))
    );
  }
  //removing all palettes
  #removePalettes() {
    const allPalettes = document.querySelectorAll('.pre-made-palette');
    allPalettes.forEach(pal => pal.remove());
  }
  //filtering functionality
  //prettier-ignore
  #filterPalettes(e,palettes,saveToLocalStorage,locStoragePalette,copyToClipboard) {
    let target = e.target;
    this.#filterBtns.forEach(btn => btn.classList.remove('active-filter-btn'));

    this.#removePalettes();

    target.classList.add('active-filter-btn');
    let tagName = e.target.textContent;

    const filteredPalettes = palettes.filter(arr => arr.type.includes(tagName));

    this.renderPalettes(filteredPalettes);
    this.#initBar();
    this.#initAddToPalette(
      saveToLocalStorage,
      locStoragePalette,
      copyToClipboard
    );
    this.#initCopyHEX(copyToClipboard);
  }
}

export default new preMadePalettesView();
