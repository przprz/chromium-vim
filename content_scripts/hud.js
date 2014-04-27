var HUD = {};
HUD.visible = false;
HUD.slideDuration = 40;

HUD.transitionEvent = function(ev) {
  if (HUD.overflowValue) {
    document.body.style.overflowX = HUD.overflowValue;
  }
  delete HUD.overflowValue;
  HUD.element.parentNode.removeChild(HUD.element);
  delete HUD.element;
};

HUD.hide = function() {
  if (this.element === undefined) return false;
  this.element.addEventListener("transitionend", this.transitionEvent, true);
  var width = this.element.offsetWidth;
  this.element.style.right = -width + "px";
};

HUD.setMessage = function(text, duration) {
  if (this.element === undefined) return false;
  this.element.firstElementChild.innerText = text;
  if (duration) {
    window.setTimeout(function() {
      HUD.hide();
    }, duration * 1000);
  }
};

HUD.display = function(text, duration) {
  if (HUD.element !== undefined) return HUD.setMessage(text, duration);
  var span, pageWidth, screenWidth, height, width;
  document.removeEventListener("transitionend", this.transitionEvent, true);
  this.element = document.createElement("div");
  this.element.id  = "cVim-hud";
  if (Command.onBottom) {
    this.element.style.bottom = "initial";
    this.element.style.top    = "0";
  }
  span = document.createElement("span");
  span.innerText = text;
  this.element.appendChild(span);

  try { document.lastElementChild.appendChild(this.element); }
  catch (e) {
    if (document.body === undefined) {
      return false;
    } else {
      document.body.appendChild(this.element);
    }
  }

  height = this.element.offsetHeight;
  width  = this.element.offsetWidth;
  this.element.style.right = -this.element.offsetWidth + "px";

  screenWidth = document.documentElement.clientWidth;
  pageWidth   =  document.body.scrollWidth;
  if (screenWidth === pageWidth) {
    this.overflowValue = getComputedStyle(document.body).overflowX;
    document.body.style.overflowX = "hidden";
  }

  this.element.style.right = "0";

  if (duration) {
    window.setTimeout(function() {
      HUD.hide();
    }, duration * 1000);
  }

};