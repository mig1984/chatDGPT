SucklessViewList = class {

  constructor(sw, container_selector, item_selector) {
    this.sw = sw;
    if (container_selector) {
      this.container = this.sw.dom.querySelector(container_selector);
      this.items = this.container.querySelectorAll(item_selector);
    } else {
      this.items = this.sw.dom.querySelectorAll(item_selector);
      this.container = this.items[0].parentNode;
    }
    this.container.querySelectorAll(item_selector).forEach( el => el.remove() ); // remove all items
  }
  
  container() {
    return this.container;
  }

  cloneItem(num) {
    if (!num) num = 0;
    return this.items[num].cloneNode(true);
  }

  append(item) {
    this.container.appendChild(item);
  }

}

SucklessView = class {

  constructor(url) {
    this.url = url;
    this.dom = null;
  }

  async load() {
    const response = await fetch(this.url);
    const htmlString = await response.text();
    this.dom = document.createElement('html');
    this.dom.innerHTML = htmlString;
    return Promise.resolve(this);
  }

  /* helpers */

  qs(selector) {
    return this.dom.querySelector(selector);
  }

  qsa(selector) {
    return this.dom.querySelectorAll(selector);
  }

  each(selector, callback) {
    this.dom.querySelectorAll(selector).forEach(callback);
  }

  remove(selector) {
    this.dom.remove(selector);
  }

  list(container_selector, item_selector) {
    return new SucklessViewList(this, container_selector, item_selector);
  }


}
