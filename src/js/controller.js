//Imports
import navbarView from './views/web-components/navbarView.js';
import footerView from './views/web-components/footerView.js';
import cookiesPopupView from './views/web-components/popups/cookiesPopupView.js';
import creatorPopupView from './views/web-components/popups/creatorPopupView.js';
import localStoragePopupView from './views/web-components/popups/localStoragePopupView.js';

import homePageView from './views/homePageView.js';
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
    model.state.locStorageCookies,
    model.state.locStorageCookiesState,
    model.state.locStorageWelcomeMsg
  );
  localStoragePopupView.addHandler(
    model.state.locStorageCookies,
    model.state.locStorageWelcomeMsg,
    model.state.locStorageWelcomeMsgState
  );
};

controlPopups();
