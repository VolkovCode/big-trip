import dayjs from 'dayjs';

import { createMainMenuTemplate } from './view/main-menu.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { tripCostTemplate } from './view/trip-cost.js';
import { createFilterTemplate } from './view/filter.js';
import { createTripBordTemplate } from './view/trip-bord.js';
import { createNewPointTemplate } from './view/new-point.js';
import { createEditPointTemplate } from './view/edit-point.js';
import { createPointTemplate } from './view/point.js';


const POINT_COUNT = 15;
const siteBodyElement = document.querySelector('.page-body');

const render = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template);
};

const getRandomInteger = (min, max) => {
  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}
const getTravelPointType = () => {
  const travelPointTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant']
  const index = getRandomInteger(0, travelPointTypes.length - 1);
  return travelPointTypes[index]
}

const getCity = () => {
  const cities = ['Paris', 'Barcelona', 'Amsterdam', 'London', 'Berlin']
  const index = getRandomInteger(0, cities.length - 1);
  return cities[index]
}

const getDescription = () => {
  const result = []
  const description = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.']
  while (result.length < 5) {
    const index = getRandomInteger(0, description.length)
    if (!result.includes(description[index])) {
      result.push(description[index])
    }
  }
  return result.join(' ')
}

const getPhoto = () => {
  const r = getRandomInteger(1, 10)
  return `http://picsum.photos/248/152?r=${r}`
}

const getPicture = () => {
  const picture = {
    'src': getPhoto(),
    'description': 'Тупа фотка'
  }
  return picture
}

const pictures = new Array(getRandomInteger(1, 5)).fill(null).map(getPicture)

const getDate = (date) => {
  return dayjs(date).format('DD/MM/YY hh:mm')
}

const getOffer = () => {
  const offers = {
    'type': getTravelPointType(),
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120
      }, {
        'title': 'Choose the radio station',
        'price': 60
      }
    ]
  }
  return offers
}

const getDestination = () => {
const destination = {
  'description': getDescription(),
  'name': getCity(),
  'pictures': pictures,
}
return destination
}



const getTravelPoint = () => {
  const travelPoint = {
    'base_price': getRandomInteger(100, 200),
    // 'date_from': getDate(),
    // 'date_to': getDate('2022-07-11T11:22:13.375Z'),
    'id': getRandomInteger(1, 1000),
    'is_favorite': Boolean(getRandomInteger(0, 1)),
    'type': getTravelPointType(),
    'offers': getOffer(),
    'destination': getDestination(),
  }
  return travelPoint
}

const travelPoints = new Array(POINT_COUNT).fill(null).map(getTravelPoint)

console.log(travelPoints.slice(0, travelPoints.length-1))










const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(menuElement, createMainMenuTemplate());

const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
render(tripDetailsElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = tripDetailsElement.querySelector('.trip-info');
render(tripInfoElement, tripCostTemplate());

const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(filterElement, createFilterTemplate());

const tripBordElement = siteBodyElement.querySelector('.trip-events');
render(tripBordElement, createTripBordTemplate());

const eventListElement = tripBordElement.querySelector('.trip-events__list');
render(eventListElement, createEditPointTemplate(travelPoints[travelPoints.length - 1]));
render(eventListElement, createNewPointTemplate(travelPoints[travelPoints.length - 2]));

for (let i of travelPoints.slice(0, travelPoints.length-2)) {
  render(eventListElement, createPointTemplate(i));
}
