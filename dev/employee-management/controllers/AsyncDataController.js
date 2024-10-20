import {store} from '../store';

export class AsyncDataController {
  constructor(host, asyncFunction) {
    this.host = host;
    this.host.addController(this);
    this.data = store.getState().employee.data;
    this.isLoading = true;

    store.subscribe(() => this.handleStateChange(store.getState()));
    store.dispatch(asyncFunction);
  }

  handleStateChange(state) {
    this.data = [
      ...state.employee.data.filter((employee) => {
        return employee.firstName
          .toLowerCase()
          .includes(state.search.toLowerCase());
      }),
    ];
    this.isLoading = state.loading;
    this.host.requestUpdate();
  }

  get isEmptyData() {
    return this.data.length === 0;
  }
}
