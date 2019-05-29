import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses'

test('should set default state', ()=> {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: expenses[1].id
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '-1'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
})

test('should add an expense', () => {
    const newExpense = {
        id:'123',
        description: 'Coffee',
        amount: 100,
        createdAt: 1000,
        note: ''
    }

    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2], newExpense])
})

test('should edit ad expense', () => {

    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates: {
            description: 'Updated'
        }
    }

        const state = expensesReducer(expenses, action)
        expect(state[0].description).toBe('Updated')
    
})

test('should edit ad expense', () => {

    const action = {
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            description: 'Updated'
        }
    }

        const state = expensesReducer(expenses, action)
        expect(state).toEqual(expenses)
    
})