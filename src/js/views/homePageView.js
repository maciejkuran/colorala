class HomePageView {
  #whatsNewBtn = document.querySelector('.whatsNewBtn');
  #section1 = document.querySelector('.home-section-1');

  scrollIntoSection() {
    if (!this.#whatsNewBtn) return;
    this.#whatsNewBtn.addEventListener('click', e => {
      e.preventDefault();
      this.#section1.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

export default new HomePageView();
