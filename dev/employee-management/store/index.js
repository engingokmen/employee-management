import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {thunk} from 'redux-thunk';

const composedEnhancer = compose(applyMiddleware(thunk));

// iniitializes data from local storage
const data = localStorage.getItem('employees');
let initialData = data ? JSON.parse(data) : [];
const employeeReducer = (
  state = {
    data: initialData,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'loading':
      return {data: state.data, loading: true};
    case 'loaded':
      return {data: action.payload, loading: false};
    case 'addedEmployee':
      return {data: [...state.data, action.payload], loading: false};
    case 'deletedEmployee':
      return {
        data: state.data.filter(
          (employee) => employee.email !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export const store = createStore(employeeReducer, composedEnhancer);

// ACTION CREATORS

export const fetchEmployees = (dispatch) => {
  dispatch({type: 'loading'});
  // TODO replace with local storage fetch
  const data = localStorage.getItem('employees');
  let employees = [];
  if (data) {
    employees = JSON.parse(data);
  }
  dispatch({type: 'loaded', payload: employees});
};

export const addEmployee = (employee) => (dispatch) => {
  dispatch({type: 'addedEmployee', payload: employee});
  localStorage.setItem('employees', JSON.stringify(store.getState().data));
};

export const deleteEmployee = (id) => (dispatch) => {
  dispatch({type: 'deletedEmployee', payload: id});
  localStorage.setItem('employees', JSON.stringify(store.getState().data));
};
