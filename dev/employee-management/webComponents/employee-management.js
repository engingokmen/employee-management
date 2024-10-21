import {LitElement, html, css} from 'lit';

export class EmployeeManagement extends LitElement {
  static get styles() {
    return css`
      .red {
        color: crimson;
      }
    `;
  }

  render() {
    return html`
      <h1>Employee Management</h1>
      <navigation-c></navigation-c>
      <slot></slot>
    `;
  }
}

customElements.define('employee-management', EmployeeManagement);
