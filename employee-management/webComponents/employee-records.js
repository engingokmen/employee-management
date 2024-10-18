import {LitElement, html, css} from 'lit';
import {employees} from '../mockData/mockData';
import {camelCaseToTitle} from '../utils';

export class EmployeeRecords extends LitElement {
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
    this.employees = employees;
  }

  renderHeader() {
    return html`
      <thead>
        <tr>
          ${Object.keys(this.employees[0]).map(
            (key) => html`<th>${camelCaseToTitle(key)}</th>`
          )}
        </tr>
      </thead>
    `;
  }

  renderBody() {
    return html`
      <tbody>
        ${this.employees.map(
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

  render() {
    return html`
      <table>
        ${this.renderHeader()} ${this.renderBody()}
      </table>
    `;
  }
}

window.customElements.define('employee-records', EmployeeRecords);
