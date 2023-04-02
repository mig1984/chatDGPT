Document.prototype.qs = function(selector) {
  return this.querySelector(selector);
}

Document.prototype.qsa = function(selector) {
  return this.querySelectorAll(selector);
}

Document.prototype.each = function(selector, callback) {
  this.querySelectorAll(selector).forEach(callback);
}


Element.prototype.qs = function(selector) {
  return this.querySelector(selector);
}

Element.prototype.qsa = function(selector) {
  return this.querySelectorAll(selector);
}

Element.prototype.each = function(selector, callback) {
  this.querySelectorAll(selector).forEach(callback);
}

Element.prototype.withText = function(text, parent) {
  if (!parent) parent = this;

  for (let i = 0; i < parent.childNodes.length; i++) {
    let childNode = parent.childNodes[i];

    if (childNode.nodeType === Node.TEXT_NODE) {
      if (childNode.data.match(text)) {
        console.log('return ' + childNode.nodeName);
        return childNode;
      }
    }
    else {
      let res = this.withText(text, childNode)
      if (res) return res;
    }
  }

}


NodeList.prototype.withText = function(text, callback) {
  let textNodes = [];
  this.forEach( el => {
    let textNode = el.withText(text);
    if (textNode) {
      if (callback) 
        callback(textNode);
      textNodes.push(textNode);
    }
  });
  return textNodes;
}
