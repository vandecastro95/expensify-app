import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE

const addExpense = (
    { description = '', note = '', amount = 0, createdAt = 0} = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

//REMOVE_EXPENSE

const removeExpense = (
    {id} = {}
) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }
})

//EDIT_EXPENSE

const editExpense = ({id}, updates) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
);

//SET_TEXT_FILTER

const setTextFilter = ( text  = '') => (
    {
        type: 'SET_TEXT_FILTER',
        text
    }
);

//SORT_BY_DATE

const sortByDate = () => (
    {
        type: 'SORT_BY_DATE',

    }
)

//SORT_BY_AMOUNT

const sortByAmount = () => (
    {
        type: 'SORT_BY_AMOUNT',

    }
)

//SET_START_DATE

const setStartDate = (date = undefined) => (
    {
        type: 'SET_START_DATE',
        date
    }
)

//SET_END_DATE

const setEndDate = (date = undefined) => (
    {
        type: 'SET_END_DATE',
        date
    }
)

//Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.expense.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
        default: 
            return state;
    }
};

//FIlters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER': 
        
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state;
    }
}

//timestamps
//33400, 10,-123

//get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => (
    expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= startDate;
        
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (sortBy === 'amount') {
            console.log('amount', a.amount, b.amount)
            return a.amount < b.amount ? 1 : -1; 
        }
    })
)

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
    );

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses)

})



const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 1, createdAt: 0}))
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 2, createdAt: -1000}))

// store.dispatch(setStartDate(-99999))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(999))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense({ id: expenseTwo.expense.id}, { amount: 500}))

// store.dispatch(setTextFilter(''))
// store.dispatch(setTextFilter('rent'))

// store.dispatch(sortByDate())
store.dispatch(sortByAmount())

// store.dispatch(sortByDate(125))
// store.dispatch(sortByAmount())

const demoState = {
    expenses: [{
        id: 'asdad',
        description: 'January rent',
        note: 'This was the final payment for that address',
        amount: 22200,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};