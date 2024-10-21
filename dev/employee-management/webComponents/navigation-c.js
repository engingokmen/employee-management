import {LitElement, html, css} from 'lit';

export class Navigation extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`
      <nav>
        <ul>
          <li><a href="/">Employees</a></li>
          <li><a href="/add-edit-employee">Add Employee</a></li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('navigation-c', Navigation);
