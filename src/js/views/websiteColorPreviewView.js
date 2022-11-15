import View from './View.js';

class WebsiteColorPreviewView extends View {
  #simulatorContainer = document.querySelector('.wcp-simulator');
  #manualSettingsContainer = document.querySelector('.wcp-settings-container');
  #popupSettingsContainer = document.querySelector('.inserted-popup-settings');
  #hamburgerBtn = document.querySelector('.wcp-hamburger-btn');
  #instructionBtn = document.querySelector('.instruction-btn');
  #instructionContainer = document.querySelector('.wcp-instructions-container');
  #viewBtns = document.querySelectorAll('.view-btn');
  #deviceViews = document.querySelectorAll('.wcp-device');
  #laptopContainer = document.querySelector('.wcp-laptop-view-container');
  #mobileContainer = document.querySelector('.wcp-mobile-view-container');
  #resetBtn = document.querySelector('.reset-btn');
  #mobileViewport = window.matchMedia('(max-width: 588.98px)');
  #popupContainer;
  #filteredAttribute;
  #prevScroll;

  addHandler() {
    //Load entire laptop/mobile container on delay
    document.addEventListener('DOMContentLoaded', () =>
      this.#simulatorOnDelay()
    );
    //Toggle manual settings container
    this.#hamburgerBtn?.addEventListener('click', e =>
      this.#toggleManualSettingsCont(e)
    );
    //Toggle palettes in settings
    const paletteBtns = document.querySelectorAll('.wcp-open-palette-btn');
    paletteBtns.forEach(btn =>
      btn.addEventListener('click', e =>
        this.#togglePaletteinSettings(e, paletteBtns)
      )
    );

    //Toggle instruction container
    this.#instructionBtn?.addEventListener('click', e =>
      this.#toggleInstruction(e)
    );

    //Switching device view
    this.#viewBtns.forEach(btn =>
      btn.addEventListener('click', e => this.#switchView(e))
    );

    //Hiding laptop container if mobile viewport
    window.addEventListener('resize', () => this.#hideLaptopContainer());
    document.addEventListener('DOMContentLoaded', () =>
      this.#hideLaptopContainer()
    );

    //Rendering colors 'select' btns click in palette
    const paletteSelectBtns = document.querySelectorAll(
      '.wcp-my-library-select-btn'
    );
    paletteSelectBtns.forEach(btn =>
      btn.addEventListener('click', e => this.#renderSelectedColorPalette(e))
    );

    //Changing color on input change
    const inputFields = document.querySelectorAll('.hex-code-input');
    inputFields.forEach(input =>
      input.addEventListener('keyup', e => this.#changeColorOnInputChange(e))
    );

    //Displaying setting popup on theme element click
    const bodyThemes = document.querySelectorAll('.user-choice--body');
    bodyThemes.forEach(theme =>
      theme.addEventListener('click', e => this.#displaySettingPopup(e))
    );

    //Closing popup setting container on close btn click & manual settings hamburger btn click
    const closeBtns = document.querySelectorAll('.close-setting-popup-btn');
    closeBtns.forEach(btn =>
      btn.addEventListener('click', e => this.#closePopupSetting(e))
    );

    this.#hamburgerBtn.addEventListener('click', e =>
      this.#closePopupSetting(e)
    );

    //Reset app = reload browser
    this.#resetBtn?.addEventListener('click', () => this.#resetApp());
  }

  #simulatorOnDelay() {
    if (!this.#simulatorContainer) return;
    setTimeout(() => {
      this.#simulatorContainer.style.opacity = '1';
    }, 400);
  }

  renderManualSettings(settings) {
    settings.forEach(el => {
      const internalContainer = document.createElement('div');
      internalContainer.classList.add('wcp-setting-internal-container');
      internalContainer.innerHTML = `
        <div data-styleproperty="${el.styleProperty}" data-classname="${el.classname}" class="wcp-setting">
                <p>${el.name}</p>
                <div>
                  <input
                    class="hex-code-input"
                    spellcheck="false"
                    type="text"
                    placeholder="${el.placeholder}"
                  />
                  <button data-tooltip="Your Library" class="action-button wcp-open-palette-btn clr-picker-placement">
                    <i class="fa-solid fa-heart-circle-plus"></i>
                  </button>
          
                </div>
              </div>`;
      this.#manualSettingsContainer?.append(internalContainer);
    });
  }

  renderPopupSettings(settings) {
    settings.forEach(el => {
      const popupContainer = document.createElement('div');
      popupContainer.className = 'wcp-setting-popup-container hide';
      popupContainer.setAttribute('data-classname', el.classname);
      popupContainer.setAttribute('data-styleproperty', el.styleProperty);
      popupContainer.innerHTML = `
        <button class="close-setting-popup-btn">
          <i class="ri-close-circle-fill"></i>
        </button>
        <div class="wcp-setting wcp-setting-popup" data-classname="${el.classname}" data-styleproperty="${el.styleProperty}">
            <p>${el.name}</p>
            <div>
              <input
                class="hex-code-input"
                spellcheck="false"
                type="text"
                placeholder="${el.placeholder}"
              />
              <button
                data-tooltip="Your Library"
                class="action-button wcp-open-palette-btn clr-picker-placement"
              >
                <i class="fa-solid fa-heart-circle-plus"></i>
              </button>
            </div>
          </div>
        `;

      this.#popupSettingsContainer?.append(popupContainer);
    });
  }

  #informIfNoColors(getDataLocalStorage) {
    const notificationLabels = document.querySelectorAll(
      '.library-no-colors-notification'
    );

    const locStorageData = getDataLocalStorage();

    notificationLabels.forEach(label => {
      if (locStorageData === null || locStorageData.length === 0) {
        label.textContent =
          '🔴 Your library is empty. Use color picker or other colorala tools to get the colors you want!';
      } else {
        label.textContent = '';
      }
    });
  }

  //Retreiving and rendering user colors from local storage
  renderPaletteColors(getDataLocalStorage) {
    const settingContainers = document.querySelectorAll('.wcp-setting');

    const locStorageData = getDataLocalStorage();

    if (locStorageData === null) return;

    settingContainers.forEach(cont => {
      const libraryContainer = document.createElement('div');
      libraryContainer.className = 'wcp-my-library-container hide';
      libraryContainer.innerHTML = `
        <h4>👇 Your Library</h4>
        <p class="library-no-colors-notification"></p>
        <div class="wcp-my-library-colors-container">
        </div>`;
      cont.after(libraryContainer);

      //Insert colors to DOM
      locStorageData.forEach(color => {
        const colorWrapper = document.createElement('div');

        colorWrapper.classList.add('wcp-my-library-color-wrapper');
        colorWrapper.innerHTML = `
         <div style="background-color: ${color}"></div>
          <p>${color}</p>
         <button class="wcp-my-library-select-btn">select</button>`;
        libraryContainer.children[2].prepend(colorWrapper);
      });
    });

    this.#informIfNoColors(getDataLocalStorage);
  }
  //Update 'setting user colors palette' if user removed color from palette.
  updatePaletteColors(btn) {
    const wcpColorsContainers = document.querySelectorAll(
      '.wcp-my-library-colors-container'
    );

    wcpColorsContainers?.forEach(cont => {
      let clickedIndex = [
        ...document.querySelectorAll('.remove-color-my-palette-btn'),
      ].indexOf(btn);

      cont.children[clickedIndex].remove();
    });
  }

  //Toggling manual settings container
  #toggleManualSettingsCont(e) {
    //prettier-ignore
    this.#hideElement(this.#instructionContainer, 'wcp-instructions-container--active', '.ri-information-fill', 'ri-information-fill--active')

    let target = e.target;
    target.children[0].classList.toggle('ri-menu-add-line--active');
    this.#manualSettingsContainer.classList.toggle(
      'wcp-settings-container--active'
    );

    this.#updateManualSettingInput();
  }

  #togglePaletteinSettings(e, paletteBtns) {
    const libraryContainers = document.querySelectorAll(
      '.wcp-my-library-container'
    );
    const wcpPaletteIcons = document.querySelectorAll('.fa-heart-circle-plus');

    let target = e.target;

    let targetIndex = [...paletteBtns].findIndex(el => el === target);
    libraryContainers[targetIndex];

    libraryContainers[targetIndex].classList.toggle('hide');
    target.children[0].classList.toggle('icon-active');

    //Untoggling previously clicked library btn & container (hiding)
    Array.from(libraryContainers)
      .filter(el => el !== libraryContainers[targetIndex])
      .forEach(cont => cont.classList.add('hide'));

    Array.from(wcpPaletteIcons)
      .filter(icon => icon !== target.children[0])
      .forEach(i => i.classList.remove('icon-active'));
  }

  #toggleInstruction(e) {
    //prettier-ignore
    this.#hideElement(this.#manualSettingsContainer, 'wcp-settings-container--active', '.ri-menu-add-line', 'ri-menu-add-line--active')

    e.stopPropagation();
    let target = e.target;
    this.#instructionContainer.classList.toggle(
      'wcp-instructions-container--active'
    );
    target.children[0].classList.toggle('ri-information-fill--active');
  }

  #hideElement(el, elClassnameActive, iClassname, iClassNameActive) {
    if (el.classList.contains(elClassnameActive)) {
      el.classList.toggle(elClassnameActive);
      document.querySelector(iClassname).classList.toggle(iClassNameActive);
    }
  }

  #switchView(e) {
    this.#removeAllDeviceViews();
    this.#removePrevActiveBtn();
    let target = e.target;

    let targetViewtype = target.dataset.viewtype;
    let deviceType = document.querySelector(
      `section[data-viewtype="${targetViewtype}"]`
    );

    deviceType.classList.add('view-active');
    target.classList.add('active-view-btn');
  }

  #removeAllDeviceViews() {
    this.#deviceViews.forEach(device => device.classList.remove('view-active'));
  }

  #removePrevActiveBtn() {
    let previousActiveBtn = [...this.#viewBtns].filter(btn =>
      btn.classList.contains('active-view-btn')
    );

    previousActiveBtn[0].classList.remove('active-view-btn');
  }

  #hideLaptopContainer() {
    if (this.#mobileViewport.matches && this.#laptopContainer) {
      this.#laptopContainer?.classList.remove('view-active');
      this.#mobileContainer?.classList.add('view-active');

      //Removing active btns from all viewBtns
      this.#viewBtns.forEach(btn => btn.classList.remove('active-view-btn'));
      //Adding active style to viewBtn that matches attribute value with mobileContainer
      //prettier-ignore
      document.querySelector(`button[data-viewtype="${this.#mobileContainer.dataset.viewtype}"]`).classList.add('active-view-btn');
    }
  }

  #renderSelectedColorPalette(e) {
    let target = e.target;
    let getHEX = target.previousElementSibling.textContent;

    //I did DOM traversing to locate closest input when 'select' btn is clicked. As the path is different between 'manual settings' and 'popup settings', I had to include if conditions, to avoid errors and let JS find seperately inputs.

    //'inputManualSett' stands for input in manual settings
    let inputManualSett = target.parentElement?.closest(
      '.wcp-setting-internal-container'
    )?.children[0]?.children[1]?.children[0];

    //'inputPopupSett' stands for input in popup settings
    let inputPopupSett =
      target.parentElement?.parentElement.parentElement?.closest(
        '.wcp-setting-popup-container'
      )?.children[1]?.children[1]?.children[0];

    if (inputManualSett) {
      inputManualSett.value = getHEX;

      let styleProperty =
        inputManualSett.parentElement.parentElement.dataset.styleproperty;
      let classname =
        inputManualSett.parentElement.parentElement.dataset.classname;

      //Change elements color in DOM
      this.#changeElColor(inputManualSett.value, classname, styleProperty);
    }

    if (inputPopupSett) {
      inputPopupSett.value = getHEX;

      let styleProperty =
        inputPopupSett.parentElement.closest('.wcp-setting-popup').dataset
          .styleproperty;
      let classname =
        inputPopupSett.parentElement.closest('.wcp-setting-popup').dataset
          .classname;

      this.#changeElColor(inputPopupSett.value, classname, styleProperty);
    }
  }

  //Change element color
  #changeElColor(input, classname, styleProperty) {
    document.querySelectorAll(`${classname}`).forEach(el => {
      el.style[styleProperty] = input;
    });
  }

  //Change color of the element when user inputs
  #changeColorOnInputChange(e) {
    let target = e.target;
    let classname = e.target.parentElement.parentElement.dataset.classname;

    let styleProperty =
      e.target.parentElement.parentElement.dataset.styleproperty;

    this.#changeElColor(target.value, classname, styleProperty);
  }

  //Update 'popup input' if user made changes to 'manual setting input value'. Find related 'manual setting' to just clicked popup setting and update value of placeholder
  #updatePopupInput(popupContainer, classname) {
    let locateRelatedDiv = document.querySelector(
      `.wcp-setting-internal-container .wcp-setting[data-classname=".${classname}"]`
    );

    let locateInputInDiv = locateRelatedDiv.children[1].children[0]?.value;

    let eTargetInput = popupContainer.children[1].children[1].children[0];

    if (!locateInputInDiv) return;

    if (!eTargetInput.value)
      eTargetInput.setAttribute('placeholder', locateInputInDiv);

    if (eTargetInput.value) eTargetInput.value = locateInputInDiv;
  }
  //Update 'manual settings input' if any changes made on the side of popup setting
  #updateManualSettingInput() {
    const manualSettingsInputs = document.querySelectorAll(
      '.wcp-setting-internal-container input'
    );

    const popupSettingsInputs = document.querySelectorAll(
      '.wcp-setting-popup input'
    );

    popupSettingsInputs.forEach((_, i) => {
      if (popupSettingsInputs[i].value)
        manualSettingsInputs[i].value = popupSettingsInputs[i].value;

      if (!popupSettingsInputs[i].value) return;
    });
  }

  //Displaying setting popup when on theme element click
  #displaySettingPopup(e) {
    this.#removeRedBorderElement(this.#filteredAttribute);
    this.#closeManualSettings();
    e.preventDefault();

    this.#popupContainer?.classList.add('hide');
    let targetAttributes = e.target.getAttribute('class');
    //As some elements contain more than one class that I am interested in, I wanna filter classes and retrieve that one desired;
    this.#filteredAttribute = targetAttributes
      ?.split(' ')
      .filter(classname => classname.includes('user'))
      .join('');

    this.#popupContainer = document.querySelector(
      `.wcp-setting-popup-container[data-classname=".${
        this.#filteredAttribute
      }"]`
    );

    if (!this.#popupContainer) return;
    if (this.#popupContainer) {
      this.#popupContainer.classList.remove('hide');
      this.#addRedBorderElement(this.#filteredAttribute);
    }

    this.#updatePopupInput(this.#popupContainer, this.#filteredAttribute);
  }

  //Edited element is highlighted with red border
  #addRedBorderElement(classname) {
    const elements = document.querySelectorAll(`.${classname}`);
    elements.forEach(el => el.classList.add('active-el'));
  }
  //Remove red border
  #removeRedBorderElement(classname) {
    if (!classname || classname === undefined) {
      return;
    } else {
      const elements = document.querySelectorAll(`.${classname}`);
      elements.forEach(el => el.classList.remove('active-el'));
    }
  }
  //Close popup setting
  #closePopupSetting(e) {
    const popupContainers = document.querySelectorAll(
      '.wcp-setting-popup-container'
    );
    e.stopPropagation();

    popupContainers.forEach(cont => cont.classList.add('hide'));
    document
      .querySelectorAll(`.${this.#filteredAttribute}`)
      .forEach(el => el.classList.remove('active-el'));
  }
  //Close Manual settings container
  #closeManualSettings() {
    this.#manualSettingsContainer.classList.remove(
      'wcp-settings-container--active'
    );
    document
      .querySelector('.ri-menu-add-line')
      .classList.remove('ri-menu-add-line--active');
  }
  //Reset app  = reload browser
  #resetApp() {
    location.reload();
  }

  //_______________________________________________________________
  // PICKER FUNCTIONALITY
  //Hide color picker when user scrolls in manual settings container
  #hidePicker(e) {
    const pickerContainers = document.querySelectorAll('.pcr-app');

    let target = e.target;
    let curScroll = target.scrollTop;

    if (curScroll > this.#prevScroll || curScroll < this.#prevScroll) {
      pickerContainers.forEach(cont => {
        if (cont.classList.contains('visible')) {
          cont.classList.remove('visible');
        }
      });
    }

    this.#prevScroll = curScroll;
  }

  initHidePicker() {
    const settingsContainer = document.querySelector('.wcp-settings-container');
    settingsContainer?.addEventListener('scroll', e => this.#hidePicker(e));
  }

  //Render picked color from color picker
  #renderColorFromPicker(e, saveBtns) {
    const hexInputs = document.querySelectorAll('.hex-code-input');

    let target = e.target;
    let hex = target.parentElement.children[0].value;
    let clickedIndex = [...saveBtns].map(btn =>
      [...saveBtns].indexOf(target)
    )[0];
    if (hexInputs[clickedIndex] && hexInputs)
      hexInputs[clickedIndex].value = hex;

    //prettier-ignore
    let classname = hexInputs[clickedIndex]?.parentElement.parentElement.dataset.classname;
    //prettier-ignore
    let styleProperty = hexInputs[clickedIndex]?.parentElement.parentElement.dataset.styleproperty;

    //Change elements color in DOM
    this.#changeElColor(
      hexInputs[clickedIndex]?.value,
      classname,
      styleProperty
    );
  }

  initRenderColorFromPicker() {
    const saveBtns = document.querySelectorAll('.pcr-save');
    saveBtns.forEach(btn =>
      btn.addEventListener('click', e =>
        this.#renderColorFromPicker(e, saveBtns)
      )
    );
  }

  //Close palette container if color picker is clicked + remove active class from palette btn icon

  #closePalettesIfPicker(libraryContainers) {
    const heartIcons = document.querySelectorAll('.fa-heart-circle-plus');

    if (libraryContainers) {
      libraryContainers.forEach(cont => cont.classList.add('hide'));
      heartIcons.forEach(heart => heart.classList.remove('icon-active'));
    }
  }

  initClosePalettesIfPicker() {
    const pickerBtns = document.querySelectorAll('.pcr-button');
    const libraryContainers = document.querySelectorAll(
      '.wcp-my-library-container'
    );
    pickerBtns.forEach(btn =>
      btn.addEventListener('click', () =>
        this.#closePalettesIfPicker(libraryContainers)
      )
    );
  }
}

export default new WebsiteColorPreviewView();
