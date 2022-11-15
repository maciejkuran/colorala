////Creating a Class and its instances (used for displaying dynamically settings and then finding certain elements in the HTML for user's further modification)

export const settings = [];

const Element = class {
  constructor(name, classname, placeholder, styleProperty) {
    this.name = name;
    this.classname = classname;
    this.placeholder = placeholder;
    this.styleProperty = styleProperty;

    settings.push(this);
  }
  //encoding 'name' values as they will be inserted in the HTML document
  set name(name) {
    this._name = name.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  get name() {
    return this._name;
  }
};

const element_1 = new Element(
  '<body>',
  '.user-choice--body',
  '#E3E3E3',
  'background-color'
);
const element_2 = new Element('<h1>', '.user-choice--h1', '#000000', 'color');
const element_3 = new Element('<h2>', '.user-choice--h2', '#000000', 'color');
const element_4 = new Element('<h3>', '.user-choice--h3', '#FFFFFF', 'color');
const element_5 = new Element('<p>', '.user-choice--p', '#000000', 'color');
const element_6 = new Element('<a>', '.user-choice--a', '#000000', 'color');
//prettier-ignore
const element_7 = new Element('<header>','.user-choice--header',
'#F2F5F5','background-color');
//prettier-ignore
const element_8 = new Element('<button>','.user-choice--button','#262626','background-color');
//prettier-ignore
const element_9 = new Element('<section>', '.user-choice--section','#262626', 'background-color');
//prettier-ignore
const element_10 = new Element('.p-section', '.user-choice--p-section', '#D1D1D1', 'color');
//prettier-ignore
const element_11 = new Element('<div>','.user-choice--div','#F2F5F5',
  'background-color');
const element_12 = new Element('<i>', '.user-choice--i', '#262626', 'color');
//prettier-ignore
const element_13 = new Element('<footer>','.user-choice--footer','#262626','background-color');
