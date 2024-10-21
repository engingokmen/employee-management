import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {camelCaseToTitle} from '../utils';
import {LoadingEmptyMixin} from '../mixins/LoadingEmptyMixin';
import {fetchEmployees} from '../store';
import {AsyncDataController} from '../controllers/AsyncDataController';
import {PaginationController} from '../controllers/PaginationController';

export class EmployeeRecords extends LoadingEmptyMixin(LitElement) {
  static get styles() {
    return css`
      .table {
        & .header,
        .body {
          display: grid;
          grid-template-columns: repeat(9, minmax(50px, 1fr));
          grid-template-rows: min-content;
          border-bottom: 1px solid black;

          &:nth-child(even) {
            background-color: #f2f2f2;
          }

          & .cell {
            padding: 5px;
            word-break: break-all;
          }
        }
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: 12px;

        & .header,
        .body {
          display: inline-flex;
          gap: 6px;
        }
      }
    `;
  }

  static get properties() {
    return {
      employees: {attribute: false},
      display: {attribute: false},
    };
  }

  constructor() {
    super();
    this.display = false;
    this.employees = new AsyncDataController(this, fetchEmployees).data;
    this.paginationController = new PaginationController(this, this.employees);
  }

  get isEmptyData() {
    return this.paginationController.paginatedItems.length === 0;
  }

  handleDisplay() {
    this.display = !this.display;
  }

  handleEmployeeClick(event) {
    const email = event.currentTarget.querySelector('td').textContent;
    // TODO: Implement employee edit page
  }

  handlePageChanged(event) {
    this.paginationController.changePage(event.detail.page);
  }

  renderHeader() {
    this.paginationController.paginatedItems;
    return html`
      <div class="header">
        ${Object.keys(this.paginationController.paginatedItems[0]).map(
          (key) =>
            html`<div class="cell cell-header">${camelCaseToTitle(key)}</div>`
        )}
      </div>
    `;
  }

  renderBody() {
    return html`
        ${this.paginationController.paginatedItems.map(
          (employee) =>
            html`
              <div class="body">
                ${Object.values(employee).map(
                  (value) => html`<div class="cell">${value}</div>`
                )}
                <div class="cell delete">
                  <delete-employee id="${employee.email}"></delete-employee>
                </div>
              </div>
            `
        )}
      </div>
    `;
  }

  renderEmployeeRecords() {
    const classes = {
      list: this.display,
      table: !this.display,
    };
    return html`
      <div class=${classMap(classes)}>
        ${this.renderHeader()} ${this.renderBody()}
      </div>
      <pagination-c
        currentPage="${this.paginationController.currentPage}"
        totalPages="${this.paginationController.totalPages}"
        @page-changed="${this.handlePageChanged}"
      ></pagination-c>
    `;
  }

  render() {
    return html`<search-input></search-input>
      <button @click=${this.handleDisplay}>
        Display ${this.display ? 'table' : 'list'}
      </button>
      ${this.renderWithLoadingEmpty(
        this.employees.isLoading,
        this.isEmptyData,
        () => this.renderEmployeeRecords()
      )}`;
  }
}

window.customElements.define('employee-records', EmployeeRecords);
