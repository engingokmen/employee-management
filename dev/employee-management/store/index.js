import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {thunk} from 'redux-thunk';
import {employees} from '../mockData/mockData';

const composedEnhancer = compose(applyMiddleware(thunk));
export const store = createStore(employeeReducer, composedEnhancer);

function employeeReducer(
  state = {
    data: [],
    loading: false,
  },
  action
) {
  switch (action.type) {
    case 'loading':
      return {data: [], loading: true};
    case 'loaded':
      return {data: action.payload, loading: false};
    case 'addedEmployee':
      return {data: [...state.data, action.payload], loading: false};
    default:
      return state;
  }
}

export const fetchEmployees = (dispatch) => {
  dispatch({type: 'loading'});
  // TODO replace with local storage fetch
  setTimeout(() => {
    dispatch({type: 'loaded', payload: employees});
  }, 1000);
};

export const addEmployee = (employee) => (dispatch) => {
  dispatch({type: 'addedEmployee', payload: employee});
};
