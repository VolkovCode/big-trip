import dayjs from 'dayjs';

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

const pictures = new Array(getRandomInteger(1, 5)).fill(null).map(getPicture)

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

export { getTravelPoint }