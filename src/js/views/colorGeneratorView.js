import { blurBtns } from '../helpers.js';
import View from './View.js';

class ColorGeneratorView extends View {
  #colorAreas = document.querySelectorAll('.color');
  #hexLabels = document.querySelectorAll('.hex-label');
  #generateColorsBtn = document.querySelectorAll('.generate-colors-btn');
  #lockUnlockColorBtns = document.querySelectorAll('.lock-unlock-color-btn');
  #copyHEXbtns = document.querySelectorAll('.copy-hex-btn');
  #addToPaletteBtns = document.querySelectorAll('.add-to-palette-btn');
  #mainTag = document.querySelector('.main-app');
  #introAppDesktop = document.querySelector('.intro-app');
  #holdGeneratedColors;

  addHandler(RGBtoHEX, copyToClipboard, saveToLocalStorage, locStoragePalette) {
    //Generating colors on btns click
    const generateBtns = document.querySelectorAll('.generate-colors-btn');
    generateBtns?.forEach(btn =>
      btn.addEventListener('click', () => this.#generateColors(RGBtoHEX))
    );
    //Generating colors on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () =>
      this.#generateColors(RGBtoHEX)
    );

    //Generating colors on 'space' button
    document.addEventListener('keydown', e => {
      //bluring other btns while 'space' is pressed
      blurBtns(this.#lockUnlockColorBtns);
      blurBtns(this.#copyHEXbtns);
      blurBtns(this.#addToPaletteBtns);
      blurBtns(this.#generateColorsBtn);

      if (e.code === 'Space') {
        this.#generateColors(RGBtoHEX);
      }
    });

    //Switching intro div section based on device viewport
    document.addEventListener('DOMContentLoaded', () => this.switchIntroDiv());
    window.addEventListener('resize', () => this.switchIntroDiv());

    //Locking/unlocking color
    this.#lockUnlockColorBtns.forEach(btn =>
      btn.addEventListener('click', e => this.#lockColor(e))
    );

    //Copy to clipboard from generated colors
    this.#copyHEXbtns.forEach(btn =>
      btn.addEventListener('click', e =>
        this.#copyHEXFromGenerated(e, copyToClipboard)
      )
    );
    //Add color to palette
    this.#addToPaletteBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        let HEX =
          e.target.parentElement.previousElementSibling.children[0].textContent;
        let heartIcon = Array.from(e.target.children)[0];
        this.highlightHeart(heartIcon);
        this.validateColor(HEX, saveToLocalStorage, locStoragePalette);
        this.renderColorsCounter();
        this.copyHEXFromPalette(copyToClipboard);
      });
    });
  }

  #generateColors(RGBtoHEX) {
    this.#colorAreas.forEach((area, i) => {
      if (!this.#colorAreas[i].classList.contains('locked')) {
        this.#holdGeneratedColors = RGBtoHEX();

        area.style.backgroundColor = this.#holdGeneratedColors;
        this.#hexLabels[i].textContent = this.#holdGeneratedColors;
      } else {
        this.#holdGeneratedColors = ' ';
        area.style.backgroundColor = ' ';
      }
    });
  }

  #lockColor(e) {
    let target = e.target;

    let grandParent = e.target.parentElement.parentElement;
    let targetIcon = target.children[0];

    if (targetIcon.className === 'ri-lock-unlock-fill') {
      targetIcon.classList.replace('ri-lock-unlock-fill', 'ri-lock-fill');
      grandParent.classList.add('locked');
    } else {
      targetIcon.classList.replace('ri-lock-fill', 'ri-lock-unlock-fill');
      grandParent.classList.remove('locked');
    }
  }

  #copyHEXFromGenerated(e, copyToClipboard) {
    let target = e.target;
    let hex = target.previousElementSibling.textContent;

    copyToClipboard(hex);
    this.displayStatus(this.copiedLabel, 'copied-to-clipboard-label-active');
  }

  //render color from color picker library
  renderColorFromPicker() {
    const saveBtns = document.querySelectorAll('.pcr-save');

    const init = e => {
      let target = e.target;
      let hex = target.parentElement.children[0].value;
      let clickedIndex = [...saveBtns].map(btn =>
        [...saveBtns].indexOf(target)
      )[0];

      if (!this.#colorAreas[clickedIndex]) return;

      if (!this.#colorAreas[clickedIndex].classList.contains('locked')) {
        this.#colorAreas[clickedIndex].style.backgroundColor = hex;
        this.#hexLabels[clickedIndex].textContent = hex;
      } else {
        this.#colorAreas[clickedIndex].style.backgroundColor = ' ';
      }
    };

    saveBtns.forEach(btn => btn.addEventListener('click', init));
  }

  //There's a special view for mobile
  addIntroDivMobile() {
    const markup = `<div class="intro-app-mobile">
    <h1>👉Push the <span class="highlight">button</span> to start!</h1>
    <button class="primary-button generate-colors-btn">Generate</button>
  </div>`;

    if (this.#mainTag) this.#mainTag.insertAdjacentHTML('afterbegin', markup);
  }

  //Switching view if viewport width < 700 px
  switchIntroDiv() {
    const introAppMobile = document.querySelector('.intro-app-mobile');

    if (!introAppMobile || !this.#introAppDesktop) return;

    if (this.mediaQueryMobile.matches) {
      this.#introAppDesktop.style.display = 'none';
      introAppMobile.style.display = 'flex';
    } else {
      this.#introAppDesktop.style.display = 'flex';
      introAppMobile.style.display = 'none';
    }
  }
}

export default new ColorGeneratorView();
