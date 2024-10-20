import {LitElement, html, css} from 'lit';
import {Employee, validationSchemaEmployee} from '../class/Employee';
import {camelCaseToTitle} from '../utils';
import {addEmployee, store} from '../store';

export class AddEditEmployee extends LitElement {
  static get styles() {
    return css`
      .red {
        color: crimson;
      }
    `;
  }

  static get properties() {
    return {
      employee: {type: Object},
      errors: {type: Array},
    };
  }

  constructor() {
    super();
    this.employee = new Employee();
    this.schema = validationSchemaEmployee;
    this.errors = [];
  }

  renderInputs() {
    return html`
      ${Object.entries(this.employee).map(([key, value]) => {
        const type = {
          firstName: 'text',
          lastName: 'text',
          dateOfEmployment: 'date',
          birth: 'date',
          phone: 'tel',
          email: 'email',
          department: 'text',
          position: 'text',
        };

        return html`
          <label>
            ${camelCaseToTitle(key)}:
            <input type="${type[key]}" name="${key}" value="${value}" />
          </label>
        `;
      })}
    `;
  }

  async onsubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employee = Object.fromEntries(formData);
    // TODO - Add employee to the list of employees
    const result = await this.schema.safeParseAsync(employee);

    if (!result.success) {
      this.errors = result.error.errors;
    } else {
      addEmployee(result.data);
      console.log(store.getState());
    }
  }

  render() {
    return html`
      <div>
        <form @submit="${this.onsubmit}">
          ${this.renderInputs()}
          <input type="submit" value="Submit" />
        </form>
        <ul>
          ${this.errors.map(
            (error) =>
              html`
                <li class="red">
                  ${camelCaseToTitle(error.path[0])}: ${error.message}
                </li>
              `
          )}
        </ul>
      </div>
    `;
  }
}

window.customElements.define('add-edit-employee', AddEditEmployee);
