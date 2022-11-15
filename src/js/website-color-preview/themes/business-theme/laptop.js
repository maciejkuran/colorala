import logo from '/src/img/Brand logo.png';
import newYork1 from '/src/img/new york city img.jpg';
import newYork2 from '/src/img/new york city img2.jpg';

class BusinessThemeLaptop extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="business-theme-desktop user-choice--body">
      <div class="business-theme-desktop--nav">
        <img src="${logo}" alt="" />
        <div class="user-choice--a">
        <a class="user-choice--a" href="">About &lt;a&gt;</a>
        <a class="user-choice--a" href="">Services</a>
        <a class="user-choice--a" href="">Contact</a>
        </div>
      </div>
      <div class="business-theme-desktop--header user-choice--header">
        <div class="user-choice--header">
          <h5 class="user-choice--h1">This is &lt;h1&gt;!</h5>
          <p class="user-choice--p">
            This is a paragraph. In the HTML any paragraph is marked as a
            &lt;p&gt; tag. The entire field including the picture is a
            &lt;header&gt; tag.
          </p>
          <button class="user-choice--button">&lt;button&gt;</button>
        </div>
        <img src="${newYork1}" alt="" />
      </div>
      <div class="business-theme-desktop-undefined--section user-choice--body">
        <h6 class="user-choice--h2">This is &lt;h2&gt;!</h6>
        <div class="business-theme-desktop-undefined--section---wrapper">
          <div class="business-theme-desktop--div user-choice--div">
            <i
              class="ri-information-fill business-theme-desktop--i user-choice--i"
            ></i>
            <p class="business-theme--p user-choice--p">
              This is a &lt;p&gt; tag and it's all wrapped in a
              &lt;div&gt;. Icon is represented by &lt;i&gt; tag.
            </p>
          </div>
          <div class="business-theme-desktop--div user-choice--div">
            <i
              class="ri-information-fill business-theme-desktop--i user-choice--i"
            ></i>
            <p class="business-theme--p user-choice--p">
              This is a &lt;p&gt; tag and it's all wrapped in a
              &lt;div&gt;. Icon is represented by &lt;i&gt; tag.
            </p>
          </div>
          <div class="business-theme-desktop--div user-choice--div">
            <i
              class="ri-information-fill business-theme-desktop--i user-choice--i"
            ></i>
            <p class="business-theme--p user-choice--p">
              This is a &lt;p&gt; tag and it's all wrapped in a
              &lt;div&gt;. Icon is represented by &lt;i&gt; tag.
            </p>
          </div>
        </div>
      </div>
      <div class="business-theme-desktop--section user-choice--section">
        <div>
          <h6 class="user-choice--h3">This is &lt;h3&gt;!</h6>
          <p class="user-choice--p-section">
            This is a &lt;p&gt; tag with a class of 'p-section'.
          </p>
          <p class="user-choice--p-section">
            The entire field including the picture is a &lt;section&gt;
            tag.
          </p>
        </div>
        <img src="${newYork2}" alt="" />
      </div>
      <div class="business-theme-desktop--footer user-choice--footer">
        <h6 class="user-choice--h3">&lt;footer&gt;</h6>
      </div>
    </div>`;
  }
}

customElements.define('business-theme-laptop', BusinessThemeLaptop);

export default new BusinessThemeLaptop();
