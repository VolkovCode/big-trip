import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripSortView from './view/trip-sort.js';
import FilterView from './view/filter.js';
import MainMenuView from './view/main-menu.js';
import PointListView from './view/point-list.js';
import PointView from './view/point.js';
import EditPointView from './view/edit-point.js';
import EmptyListView from './view/empty-list.js';

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
const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(menuElement, new MainMenuView().getElement());

const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
render(tripDetailsElement, new TripInfoView().getElement(), 'afterbegin');

const tripInfoElement = tripDetailsElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView().getElement());

const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(filterElement, new FilterView().getElement());

const tripBoardElement = siteBodyElement.querySelector('.trip-events');
render(tripBoardElement, new TripSortView().getElement());

render(tripBoardElement, new PointListView().getElement());




const pointListComponent = new PointListView();
render(tripBoardElement, pointListComponent.getElement());


const renderPoint = (pointListElement, pointData) => {
  const pointComponent = new PointView(pointData);
  const pointEditorComponent = new EditPointView(pointData);

  const changeViewToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditorComponent.getElement());
  };
  const changeViewToEdit = () => {
    pointListElement.replaceChild(pointEditorComponent.getElement(), pointComponent.getElement());
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToEdit);
  pointEditorComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToPoint);
  pointEditorComponent.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeViewToPoint();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      pointListElement.replaceChild(pointComponent.getElement(), pointEditorComponent.getElement());
    }
  });
  render(pointListElement, pointComponent.getElement());
};



for (let i = 0; i < POINT_COUNT-2; i++) {
  renderPoint(pointListComponent.getElement(), travelPoints[i]);
}

if (POINT_COUNT===0) {
  render(pointListComponent.getElement(), new EmptyListView().getElement())
}