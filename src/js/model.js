//img for PDFjs
import { img } from './helpers.js';
//Importing pre-made palettes;
import { palettes } from './pre-made-palettes/preMadePalettes.js';
//importing settings - Website Color Preview
import { settings } from './website-color-preview/settings.js';

export const data = {
  //Cookies accept name in local storage
  locStorageCookies: 'colorala-cookies-accepted',
  locStorageCookiesState: true,
  //Welcome msg popup name in local storage
  locStorageWelcomeMsg: 'colorala-welcome-message',
  locStorageWelcomeMsgState: 'read',
  //My palette name in local storage
  locStoragePalette: 'myPalette',
  //jsPDF
  PDFfileName: 'colorala-My-Library.pdf',
  PDFDocumentTitle: 'Generated with love by colorala.com',
  //All pre made palettes are stored here
  preMadePalettes: palettes,
  //Website Color Preview Settings
  wcpSettings: settings,
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

//Removing from local storage
export const removeColorLocalStorage = container => {
  let colors = getDataLocalStorage();

  const containerIndex = container.children[1].children[0].textContent;
  colors.splice(colors.indexOf(containerIndex), 1);
  localStorage.setItem(data.locStoragePalette, JSON.stringify(colors));
};

//PDF Generation
export const generatePDF = wrapper => {
  window.jsPDF = window.jspdf.jsPDF;

  const doc = new jsPDF('p', 'pt', 'a4');
  doc.addImage(img, 'JPEG', 367, 13, 40, 50);
  doc.setTextColor(24, 49, 83);
  doc.setFontSize(20);
  doc.text(35, 55, data.PDFDocumentTitle);

  doc.html(wrapper, {
    margin: [60, 60, 115, 60],
    callback: function (doc) {
      doc.save(data.PDFfileName);
    },
    x: 10,
    y: 10,
  });
};
