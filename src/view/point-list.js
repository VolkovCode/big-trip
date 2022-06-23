import AbstractClass from './abstract-class.js';

const createPointListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class PointList extends AbstractClass {
  getTemplate() {
    return createPointListTemplate();
  }
}
