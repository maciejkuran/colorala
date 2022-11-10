export const data = {
  //Cookies accept is saved in the local storage
  locStorageCookies: 'colorala-cookies-accepted',
  locStorageCookiesState: true,
  //Welcome msg display is stored in local storage
  locStorageWelcomeMsg: 'colorala-welcome-message',
  locStorageWelcomeMsgState: 'read',
  //Read colors from local storage
  locStoragePalette: 'myPalette',
};

//RETREIVING RANDOM COLORS
//generating random number
export const randomNb = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};
// Returning RGB as string
export const randomRGBString = () => {
  return `rgb(${randomNb(0, 250)},${randomNb(0, 250)},${randomNb(0, 250)})`;
};

//returning RGB values as array
export const randomRGBArray = () => {
  return [randomNb(0, 250), randomNb(0, 250), randomNb(0, 250)];
};

export const RGBtoHEX = () => {
  const RGB = randomRGBArray();
  const HEX = RGB.map(nb => {
    const number = nb.toString(16);
    return number.length === 1 ? number + 0 : number;
  });

  return `#${HEX.join('').toUpperCase()}`;
};

//Copy to clipboard
export const copyToClipboard = text => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
};

//Save colors to local storage
export const saveToLocalStorage = color => {
  let colors;
  if (localStorage.getItem(data.locStoragePalette) === null) {
    colors = [];
  } else {
    colors = JSON.parse(localStorage.getItem(data.locStoragePalette));
  }

  colors.push(color);
  localStorage.setItem(data.locStoragePalette, JSON.stringify(colors));
};

//Getting data from local storage - returns array of hex
export const getDataLocalStorage = () => {
  let colors;
  if (localStorage.getItem(data.locStoragePalette) === null) {
    colors = [];
  } else {
    colors = JSON.parse(localStorage.getItem(data.locStoragePalette));
  }

  return colors;
};
