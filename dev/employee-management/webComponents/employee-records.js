import {LitElement, html, css} from 'lit';
import {camelCaseToTitle} from '../utils';
import {LoadingEmptyMixin} from '../mixins/LoadingEmptyMixin';
import {fetchEmployees} from '../store';
import {AsyncDataController} from '../controllers/AsyncDataController';
import {PaginationController} from '../controllers/PaginationController';

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
      employees: {attribute: false},
    };
  }

  constructor() {
    super();
    this.employees = new AsyncDataController(this, fetchEmployees).data;
    this.paginationController = new PaginationController(this, this.employees);
  }

  get isEmptyData() {
    return this.paginationController.paginatedItems.length === 0;
  }

  handlePageChanged(event) {
    this.paginationController.changePage(event.detail.page);
  }

  renderHeader() {
    this.paginationController.paginatedItems;
    return html`
      <thead>
        <tr>
          ${Object.keys(this.paginationController.paginatedItems[0]).map(
            (key) => html`<th>${camelCaseToTitle(key)}</th>`
          )}
        </tr>
      </thead>
    `;
  }

  renderBody() {
    return html`
      <tbody>
        ${this.paginationController.paginatedItems.map(
          (employee) =>
            html`
              <tr>
                ${Object.values(employee).map(
                  (value) => html`<td>${value}</td>`
                )}
                <td>
                  <delete-employee id="${employee.email}"></delete-employee>
                </td>
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
      <pagination-c
        currentPage="${this.paginationController.currentPage}"
        totalPages="${this.paginationController.totalPages}"
        @page-changed="${this.handlePageChanged}"
      ></pagination-c>
    `;
  }

  render() {
    return html`<search-input></search-input> ${this.renderWithLoadingEmpty(
        this.employees.isLoading,
        this.isEmptyData,
        () => this.renderEmployeeRecords()
      )}`;
  }
}

window.customElements.define('employee-records', EmployeeRecords);
