export const data = {
  //Cookies accept is saved in the local storage
  locStorageCookies: 'colorala-cookies-accepted',
  locStorageCookiesState: true,
  //Welcome msg display is stored in local storage
  locStorageWelcomeMsg: 'colorala-welcome-message',
  locStorageWelcomeMsgState: 'read',
  //User colors
  myPalette: [],
  // Get colors from local storage
  getColors() {
    return localStorage.getItem('myPalette');
  },
  //Saving colors to local storage
  saveColors() {
    return localStorage.setItem('myPalette', JSON.stringify(this.myPalette));
  },
};

//Retreiving random colors
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
