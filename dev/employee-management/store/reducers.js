// iniitializes data from local storage
const data = localStorage.getItem('employees');
let initialData = [];
if (data && data !== 'undefined') {
  initialData = JSON.parse(data);
}

export const employee = (
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

export const search = (state = '', action) => {
  switch (action.type) {
    case 'search':
      return action.payload;
    default:
      return state;
  }
};

// ACTION CREATORS

export const searchTerm = (term) => {
  return {type: 'search', payload: term};
};
