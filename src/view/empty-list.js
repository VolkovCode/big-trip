import AbstractClass from './abstract-class.js';

const emptyListTemplate = () => {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`
}

export default class EmptyList extends AbstractClass {
  getTemplate() {
    return emptyListTemplate();
 
}
}