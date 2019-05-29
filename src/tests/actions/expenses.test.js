import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test('Should setup remove expense action object', () => {
    const action = removeExpense('123')
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '123'
        }
       
    })
})

test('Should setup edit expense action object', () => {
    const action = editExpense('123', {description: "coffee", amount: 100})
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            description: 'coffee',
            amount: 100
        }
    })
})

test('should setup add expense action object', () => {
    const expenseDate = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'Arabadabadado'
    }
    const action = addExpense(expenseDate);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseDate,
        id: expect.any(String)
        }  
    })
})

test('should setup add expense object wiht default object', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        }
    })
})