export default class Section {
  constructor({items,renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = selector;
  }

  renderElements() {
    this._items.forEach((element) => {
      const item = this._renderer(element);
      this.addItem(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
