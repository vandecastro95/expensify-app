import React from 'react';
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses'


let editExpense, removeExpense, history, wrapper;    

beforeEach(() => {
     editExpense = jest.fn();
     removeExpense = jest.fn();
     history = { push: jest.fn() };
     wrapper = shallow(<EditExpensePage expense={expenses[0]} removeExpense={removeExpense} editExpense={editExpense} history={history}/>)
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1])
})

test('should hanlde removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id)
})