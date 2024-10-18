import {LitElement, html} from 'lit';
import {Employee} from '../class/Employee';
import {camelCaseToTitle} from '../utils';

export class AddEditEmployee extends LitElement {
  static get properties() {
    return {
      employee: {type: Object},
    };
  }

  constructor() {
    super();
    this.employee = new Employee();
  }

  renderInputs() {
    return html`
      ${Object.entries(this.employee).map(
        ([key, value]) => html`
          <label>
            ${camelCaseToTitle(key)}:
            <input type="text" name="${key}" value="${value}" />
          </label>
        `
      )}
    `;
  }

  onsubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employee = Object.fromEntries(formData);
    // TODO - Add employee to the list of employees
  }

  render() {
    return html`
      <form @submit="${this.onsubmit}">
        ${this.renderInputs()}
        <input type="submit" value="Submit" />
      </form>
    `;
  }
}

window.customElements.define('add-edit-employee', AddEditEmployee);
