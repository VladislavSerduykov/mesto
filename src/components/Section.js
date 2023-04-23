export default class Section {
  constructor({items,renderer}, section) {
    this._items = items;
    this._renderer = renderer;
    this._container = section;
  }

  renderElements() {
    this._items.forEach((element) => {
      const item = this._renderer(element);
      this.prependItem(item);
    });
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
