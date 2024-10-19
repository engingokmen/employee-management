import {LitElement, html, css} from 'lit';
import {camelCaseToTitle} from '../utils';
import {LoadingEmptyMixin} from '../mixins/LoadingEmptyMixin';
import {fetchEmployees} from '../store';
import {AsyncDataController} from '../controllers/AsyncDataController';

export class EmployeeRecords extends LoadingEmptyMixin(LitElement) {
  static get styles() {
    return css`
      table {
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid black;
        padding: 8px;
      }
    `;
  }

  static get properties() {
    return {
      employees: {type: Array},
    };
  }

  constructor() {
    super();
    this.asyncData = new AsyncDataController(this, fetchEmployees);
  }

  get isEmptyData() {
    return this.asyncData.data.length === 0;
  }

  renderHeader() {
    return html`
      <thead>
        <tr>
          ${Object.keys(this.asyncData.data[0]).map(
            (key) => html`<th>${camelCaseToTitle(key)}</th>`
          )}
        </tr>
      </thead>
    `;
  }

  renderBody() {
    return html`
      <tbody>
        ${this.asyncData.data.map(
          (employee) =>
            html`
              <tr>
                ${Object.values(employee).map(
                  (value) => html`<td>${value}</td>`
                )}
              </tr>
            `
        )}
      </tbody>
    `;
  }

  renderEmployeeRecords() {
    return html`
      <table>
        ${this.renderHeader()} ${this.renderBody()}
      </table>
    `;
  }

  render() {
    return this.renderWithLoadingEmpty(
      this.asyncData.isLoading,
      this.asyncData.isEmptyData,
      () => this.renderEmployeeRecords()
    );
  }
}

window.customElements.define('employee-records', EmployeeRecords);
