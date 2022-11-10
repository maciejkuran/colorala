import { blurBtns } from '../helpers.js';
import View from './View.js';

class ColorGeneratorView extends View {
  #colorAreas = document.querySelectorAll('.color');
  #hexLabels = document.querySelectorAll('.hex-label');
  #generateColorsBtn = document.querySelectorAll('.generate-colors-btn');
  #lockUnlockColorBtns = document.querySelectorAll('.lock-unlock-color-btn');
  #copyHEXbtns = document.querySelectorAll('.copy-hex-btn');
  #addToPaletteBtns = document.querySelectorAll('.add-to-palette-btn');
  #copiedLabel = document.querySelector('.copied-to-clipboard-label');
  #holder;

  addHandler(RGBtoHEX, copyToClipboard) {
    //Generating colors on btns click
    this.#generateColorsBtn.forEach(btn =>
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
  }

  #generateColors(RGBtoHEX) {
    this.#colorAreas.forEach((area, i) => {
      if (!this.#colorAreas[i].classList.contains('locked')) {
        this.#holder = RGBtoHEX();

        area.style.backgroundColor = this.#holder;
        this.#hexLabels[i].textContent = this.#holder;
      } else {
        this.#holder = ' ';
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
    this.displayStatus(this.#copiedLabel, 'copied-to-clipboard-label-active');
  }
}

export default new ColorGeneratorView();
