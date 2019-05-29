// const person = {
//     name: 'Van',
//     age: 27,
//     Location: {
//         city: 'Austin',
//         temp: 100
//     }
// }

// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}.`)

// const { temp: temperature, city } = person.Location;

// console.log(`its ${temperature} degrees in ${city}`)

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName)

//
// ARRAY DESTRUCTURING
//

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

const [ street, city, state, zipcode] = address;

console.log(`You are in ${street}, ${city}`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [coffee, ,cost,] = item;

console.log(`A medium ${coffee} costs ${cost}`)