import {LitElement, html, css} from 'lit';
import {Employee, validationSchemaEmployee} from '../class/Employee';
import {camelCaseToTitle} from '../utils';
import {addEmployee, store, updateEmployee} from '../store';
import {router} from '../router';
import {classMap} from 'lit/directives/class-map.js';
import {Router} from '@vaadin/router';

export class AddEditEmployee extends LitElement {
  static get styles() {
    return css`
      .red {
        color: crimson;
      }
      .disabled {
        background-color: #f2f2f2;
        pointer-events: none;
      }
    `;
  }

  static get properties() {
    return {
      employee: {type: Object},
      errors: {type: Array},
      location: {type: Object},
    };
  }

  constructor() {
    super();
    this.employee = new Employee();
    this.schema = validationSchemaEmployee;
    this.errors = [];
    this.location = router.location;
    this.isEditPage = !!this.location.params.email;
  }

  connectedCallback() {
    super.connectedCallback();
    //  populate the form with the employee data
    if (this.location.params.email) {
      const employee = store
        .getState()
        .employee.data.find(
          (employee) => employee.email === this.location.params.email
        );
      this.employee = new Employee(...Object.values(employee));
      this.isEditPage = true;
    } else {
      this.isEditPage = false;
    }
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

        const disabled = classMap({
          disabled: this.isEditPage && key === 'email',
        });
        return html`
          <label>
            ${camelCaseToTitle(key)}:
            <input
              type="${type[key]}"
              name="${key}"
              value="${value}"
              class=${disabled}
            />
          </label>
        `;
      })}
    `;
  }

  async onsubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employee = Object.fromEntries(formData);

    let extendedSchema = this.schema;
    if (!this.isEditPage) {
      // uniqueness of a record
      extendedSchema = this.schema.extend({
        email: this.schema.shape.email.refine((value) => {
          const employees = store.getState().employee.data;
          return !employees.some((employee) => employee.email === value);
        }, 'Email already in use'),
      });
    }

    const result = await extendedSchema.safeParseAsync(employee);

    if (!result.success) {
      this.errors = result.error.errors;
    } else {
      this.isEditPage
        ? store.dispatch(updateEmployee(result.data))
        : store.dispatch(addEmployee(result.data));
      Router.go('/');
    }
  }

  render() {
    return html`
      <div>
        <h2>${this.isEditPage ? 'Edit' : 'Add'} Employee</h2>
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
