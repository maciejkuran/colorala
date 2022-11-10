export default class View {
  #actionBtns = document.querySelectorAll('.action-button');
  #divTooltip = document.querySelector('.div-tooltip');
  #mediaQueryMobile = window.matchMedia('(max-width: 700px)');
  #timeoutHolder;

  initTooltip() {
    this.#actionBtns.forEach(btn =>
      btn.addEventListener('mouseenter', e => this.#showTooltip(e))
    );

    this.#actionBtns.forEach(btn =>
      btn.addEventListener('mouseleave', () => this.#hideTooltip())
    );
  }

  #showTooltip(e) {
    this.#divTooltip.style.display = 'none';
    let target = e.target;
    let targetAttr = target.dataset.tooltip;
    //Target coords
    let targetTop = target.getBoundingClientRect().top + 'px';
    let targetLeft = target.getBoundingClientRect().left + 30 + 'px';

    this.#timeoutHolder = setTimeout(() => {
      if (!this.#mediaQueryMobile.matches && this.#divTooltip) {
        this.#divTooltip.textContent = targetAttr;
        this.#divTooltip.style.top = targetTop;
        this.#divTooltip.style.left = targetLeft;
        this.#divTooltip.style.display = 'inline';
      }
    }, 700);
  }

  #hideTooltip() {
    clearTimeout(this.#timeoutHolder);
    setTimeout(() => {
      this.#divTooltip.style.display = 'none';
    }, 0);
  }

  //Displaying status when copied to clipboard or added to palette
  displayStatus(el, classname) {
    const display = setTimeout(() => {
      el.classList.add(classname);

      this.hideStatus(el, classname);
    }, 100);
  }

  hideStatus(el, classname) {
    const hide = setTimeout(() => {
      el.classList.remove(classname);
    }, 700);
  }
}
