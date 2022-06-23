import AbstractClass from './abstract-class.js';

const tripCostTemplate = () => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`;
};


export default class TripCost extends AbstractClass {
  getTemplate() {
    return tripCostTemplate();
  }
}