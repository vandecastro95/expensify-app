import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            />
        );
})

test('should render ExpenseLIstFIlters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseLIstFIlters with altdate correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
})

test('should handle text change', () => {
    const text = 'Water Bill'
    wrapper.find('input').simulate('change', {target: {value: text}});
    expect(setTextFilter).toHaveBeenLastCalledWith(text)
})

test('should sort by date', () => {
    const value = 'date'
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
    const value = 'amount'
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date change', () => {
    const { startDate, endDate } = altFilters;
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate,endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate)
})

test('should handle date focus change', () => {
    wrapper.find('DateRangePicker').prop('onFocusChange')("startDate");
    expect(wrapper.state('calendarFocused')).toBe("startDate")
})