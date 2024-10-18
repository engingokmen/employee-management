import {LitElement, html} from 'lit';

export class EmployeeManagement extends LitElement {
  render() {
    return html`
      <div>
        <employee-records></employee-records>
        <add-edit-employee></add-edit-employee>
      </div>
    `;
  }
}

window.customElements.define('employee-management', EmployeeManagement);
