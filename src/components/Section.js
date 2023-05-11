export default class Section {
  constructor(renderer, section) {
    this._renderer = renderer;
    this._container = section;
  }

  renderElements(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  appendItem(element) {
    this._container.append(element);
  }
}
