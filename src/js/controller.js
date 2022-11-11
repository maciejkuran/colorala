//Importing views
import navbarView from './views/web-components/navbarView.js';
import footerView from './views/web-components/footerView.js';
import cookiesPopupView from './views/web-components/popups/cookiesPopupView.js';
import creatorPopupView from './views/web-components/popups/creatorPopupView.js';
import localStoragePopupView from './views/web-components/popups/localStoragePopupView.js';
import homePageView from './views/homePageView.js';
import colorGeneratorView from './views/colorGeneratorView.js';
import View from './views/View.js';
const view = new View();

//Importing model
import * as model from './model.js';

//Controlling aplication navigation/NAVBAR
const controlWebNav = () => {
  navbarView.showMyPalette();
  navbarView.closeMyPalette();
  navbarView.toggleToolsContainer();
  navbarView.closeToolsContainerOnBodyClick();
};

controlWebNav();

//Controlling home page
const controlHomePage = () => {
  homePageView.scrollIntoSection();
};
controlHomePage();

//Controlling popups
const controlPopups = () => {
  creatorPopupView.addHandler();

  cookiesPopupView.addHandler(
    model.data.locStorageCookies,
    model.data.locStorageCookiesState,
    model.data.locStorageWelcomeMsg
  );
  localStoragePopupView.addHandler(
    model.data.locStorageCookies,
    model.data.locStorageWelcomeMsg,
    model.data.locStorageWelcomeMsgState
  );
};
controlPopups();

//Controlling color generator
const controlColorGenerator = () => {
  colorGeneratorView.addHandler(
    model.RGBtoHEX,
    model.copyToClipboard,
    model.saveToLocalStorage,
    model.data.locStoragePalette
  );
  colorGeneratorView.addIntroDivMobile();
};
controlColorGenerator();

//Load data from local storage when DOM loads
const controlLoadData = () => {
  const colors = model.getDataLocalStorage();
  colors.forEach(color => {
    //render clrs in palette
    view.renderAddedColorInPalette(color);
    //render clrs count
    view.renderColorsCounter();
  });
  //init copy functionality from palette
  colorGeneratorView.copyHEXFromPalette(model.copyToClipboard);
};
controlLoadData();

//Control removing colors from palette
const controlRemoveColorPalette = e => {
  e.stopPropagation();
  const btn = e.target;
  const container = btn.parentElement;

  if (btn.className === 'remove-color-my-palette-btn') {
    //This function updates 'colors in library setting' - WCP
    // updateWCPLibraries(btn);
    ////////////////
    container.remove();
    model.removeColorLocalStorage(container);
  }
  view.renderColorsCounter();
  //WCP - Website Color Preview
  // informIfNoColors(getColors());
};

view.addHandler(controlRemoveColorPalette);

//Init color picker
const initPicker = () => {
  view.renderPickers();
  view.pickerAttributes();
  colorGeneratorView.renderColorFromPicker();
};
initPicker();

//Initialize globally tooltip functionality
const controlTooltip = () => {
  view.initTooltip();
};
controlTooltip();

// Initialize PDF generation
const initPDFGen = () => {
  view.generatePDF(model.generatePDF);
};

initPDFGen();
