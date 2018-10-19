if (window.customElements.define && document.head.attachShadow) {
  class Demo extends HTMLElement {
    constructor() {
      super();
      this.code = this.querySelector('template').content.cloneNode(true);
      const random = + new Date();
      this.uniq = 'demo-' + random;

      this.js = this.code.querySelector('script');
      if (this.js) {
        this.jsText = this.js.textContent;
        this.js.textContent = `(function() { const demo = document.getElementById('${this.uniq}').shadowRoot; ${this.jsText} })();`;
      }
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('live-demo');
      this.wrapper.id = this.uniq;
      this.wrapper.style.all = 'initial';
      this.wrapper.attachShadow({ mode: 'open' });
      this.wrapper.shadowRoot.appendChild(document.importNode(this.code, true));
      this.appendChild(this.wrapper);
    }
  }

  customElements.define('live-demo', Demo);
}