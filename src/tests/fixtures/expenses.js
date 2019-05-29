import moment from 'moment'

export default [{
    id: '1',
    description: 'Rent Bill',
    amount: 100,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
    note: ''
},
{
    id: '2',
    description: 'Water Bill',
    amount: 11000,
    createdAt: moment(0).add(4, 'days').valueOf(),
    note: ''
},
{
    id: '3',
    description: 'Electricity Bill',
    amount: 10000,
    createdAt: moment(0).valueOf(),
    note: ''
}
]