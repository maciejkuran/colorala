class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer>
      <div class="footer-links">
        <a class="from-creator-btn" href="">From Creator 😀</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      <p>
        Copyright ©,
        <a target="_blank" href="https://maciejkuran.com">maciejkuran.com</a>,
        All Rights Reserved
      </p>
    </footer>`;
  }
}

customElements.define('app-footer', AppFooter);

export default new AppFooter();
