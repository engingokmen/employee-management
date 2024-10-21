import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {thunk} from 'redux-thunk';
import {employee, search} from './reducers';

const composedEnhancer = compose(applyMiddleware(thunk));

function rootReducer(state = {}, action) {
  return {
    employee: employee(state.employee, action),
    search: search(state.search, action),
  };
}

export const store = createStore(rootReducer, composedEnhancer);

// ACTION CREATORS

export const fetchEmployees = (dispatch) => {
  dispatch({type: 'loading'});
  // TODO replace with local storage fetch
  const data = localStorage.getItem('employees');
  let employees = [];
  if (data && data !== 'undefined') {
    employees = JSON.parse(data);
  }
  dispatch({type: 'loaded', payload: employees});
};

export const addEmployee = (employee) => (dispatch) => {
  dispatch({type: 'addedEmployee', payload: employee});
  localStorage.setItem(
    'employees',
    JSON.stringify(store.getState().employee.data)
  );
};

export const updateEmployee = (employee) => (dispatch) => {
  dispatch({type: 'updatedEmployee', payload: employee});
  localStorage.setItem(
    'employees',
    JSON.stringify(store.getState().employee.data)
  );
};

export const deleteEmployee = (id) => (dispatch) => {
  dispatch({type: 'deletedEmployee', payload: id});
  localStorage.setItem(
    'employees',
    JSON.stringify(store.getState().employee.data)
  );
};
