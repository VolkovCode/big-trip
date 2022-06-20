import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripSortView from './view/trip-sort.js';
import FilterView from './view/filter.js';
import MainMenuView from './view/main-menu.js';

import { createMainMenuTemplate } from './view/main-menu.js';
// import { createTripInfoTemplate } from './view/trip-info.js';
// import { tripCostTemplate } from './view/trip-cost.js';
import { createTripBordTemplate } from './view/trip-sort.js';
import { createNewPointTemplate } from './view/new-point.js';
import { createEditPointTemplate } from './view/edit-point.js';
import { createPointTemplate } from './view/point.js';
import { getTravelPoint } from './data.js';

const POINT_COUNT = 15;
const siteBodyElement = document.querySelector('.page-body');

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};



const travelPoints = new Array(POINT_COUNT).fill(null).map(getTravelPoint)


console.log(travelPoints.slice(0, travelPoints.length-1))

const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(menuElement, new MainMenuView().getElement());

const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
render(tripDetailsElement, new TripInfoView().getElement(), 'afterbegin');

const tripInfoElement = tripDetailsElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView().getElement());

const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(filterElement, new FilterView().getElement());

const tripBordElement = siteBodyElement.querySelector('.trip-events');
render(tripBordElement, new TripSortView().getElement());

const eventListElement = tripBordElement.querySelector('.trip-events__list');
render(eventListElement, createEditPointTemplate(travelPoints[travelPoints.length - 1]));
render(eventListElement, createNewPointTemplate(travelPoints[travelPoints.length - 2]));

for (let i of travelPoints.slice(0, travelPoints.length-2)) {
  render(eventListElement, createPointTemplate(i));
}
