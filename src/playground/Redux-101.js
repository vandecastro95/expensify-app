import {createStore} from 'redux';

//Action Generators - functions that return action objects

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({count} ) => ({
    type: 'SET',
    count
})

// Reducers
//1.reducers are pure functions

const countReducer = ((state = {count: 0 }, action) => {
    
    switch (action.type) {
        
        case 'INCREMENT': 
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT': 
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET': 
            return {
                count: action.count
            }
        default: 
            return state;
    }
})


const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

//Action
store.dispatch(incrementCount({ incrementBy: 5}));

store.dispatch(incrementCount())

store.dispatch(decrementCount({ decrementBy: 1000}))

store.dispatch(resetCount());

store.dispatch(setCount({ count: 10000}))
