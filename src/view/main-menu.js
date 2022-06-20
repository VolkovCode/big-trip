import { createElement } from "../utils.js";

const createMainMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;
};

export default class MainMenu {
  constructor() {
    this._element = null;
  }

  getTemlate() {
    return createMainMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemlate())
    }
    return this._element;
  }

  removeElemment() {
    this._element = null;
  }

}
