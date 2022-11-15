import logo from '/src/img/Colorala logo.png';
import colorGenerator from '/src/img/Generate colors colorala.gif';
import liveWebsitePreview from '/src/img/live website preview.gif';
import preMadePalettes from '/src/img/pre-made color palettes colorala.jpg';

class AppNav extends HTMLElement {
  #myPalette = document.querySelector('.my-palette-open');
  #myPaletteContent = document.querySelector('.my-palette');
  #overlayModal = document.querySelector('.overlay-modal');
  #closeBtn = document.querySelectorAll('.close');
  #toolsBtn = document.querySelector('.tools-popup-btn');
  #toolsContainer = document.querySelector('.tools-container');
  #arrowDownIcon = document.querySelector('.arrow-down-icon');

  #displayContent(el, el2) {
    el.classList.remove('hide');
    el2.classList.remove('hide');
    this.#overlayModal.style.pointerEvents = 'all';
  }

  #hideContent(el, el2) {
    el.classList.add('hide');
    el2.classList.add('hide');
  }

  showMyPalette() {
    this.#myPalette.addEventListener('click', e => {
      e.preventDefault();
      this.#toolsContainer.classList.add('hide');
      this.#displayContent(this.#myPaletteContent, this.#overlayModal);
    });
  }

  closeMyPalette() {
    //on button click
    this.#closeBtn.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.#hideContent(this.#myPaletteContent, this.#overlayModal);
      });
    });
    //on overlay modal click
    this.#overlayModal.addEventListener('click', e => {
      this.#hideContent(this.#myPaletteContent, this.#overlayModal);
    });
  }

  toggleToolsContainer() {
    this.#toolsBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      this.#toolsContainer.classList.toggle('hide');
      this.#arrowDownIcon.classList.toggle('arrow-down-icon-red');
    });
  }

  closeToolsContainerOnBodyClick() {
    document.querySelector('body').addEventListener('click', e => {
      e.stopPropagation();
      this.#toolsContainer.classList.add('hide');
      this.#arrowDownIcon.classList.remove('arrow-down-icon-red');
    });
  }

  connectedCallback() {
    this.innerHTML = `
      <nav class="app-nav">
      <a href="/"
        ><img
          src="${logo}"
          alt="colorala logo"
      /></a>
      <div class="nav-wrapper">
        <div class="nav-subwrapper">
          <ul>
            <li>
              <a class="tools-popup-btn" href=""
                >Tools<i class="ri-arrow-drop-down-line arrow-down-icon"></i></a
              >
            </li>
            <li>
              <a class="my-palette-open" href=""
                ><i class="fa-solid fa-heart heart-icon"></i
              ></a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/maciejkuran/colorala.com"
                ><i class="ri-github-line github-icon"></i
              ></a>
            </li>
          </ul>
        </div>
        <div class="tools-container hide">
          <a href="/color-palette-generator">
            <div class="tool">
              <img
                src="${colorGenerator}"
                alt="colors generator colorala"
              />
              <div>
                <h4>Color Palette Generator!</h4>
                <p>Generate colors and add to your library!</p>
              </div>
            </div>
          </a>
          <a href="/pre-made-color-palettes">
            <div class="tool">
              <img src="${preMadePalettes}" alt="pre-made color palettes colorala" />
              <div>
                <h4><span>NEW!</span> Pre-made Palettes!</h4>
                <p>Expore amazing pre-made color palettes!</p>
              </div>
            </div>
          </a>
          <a href="/website-color-preview">
            <div class="tool">
              <img src="${liveWebsitePreview}" alt="live website preview" />
              <div>
                <h4><span>NEW!</span> Website Color Preview!</h4>
                <p>Are you a website designer? Preview your colors!</p>
              </div>
            </div>
          </a>
        </div>
        <div class="my-palette hide">
          <div class="flex-my-palette">
            <button class="export-btn">
              <i class="fa-solid fa-file-export export-icon"></i>Export palette
              to PDF
            </button>
            <button class="close close-my-palette-btn">
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
          <p class="my-palette-label-counter">0 colors in your palette! 😌</p>
          <div class="colors-container-my-palette"></div>
        </div>
      </div>
    </nav>`;
  }
}

customElements.define('app-nav', AppNav);

export default new AppNav();
