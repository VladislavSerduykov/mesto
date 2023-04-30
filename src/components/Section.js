export default class Section {
  constructor(renderer, section) {
    this._renderer = renderer;
    this._container = section;
  }

  renderElements(items) {
    items.forEach((element) => {
      const item = this._renderer(element);
      this.prependItem(item);
    });
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
