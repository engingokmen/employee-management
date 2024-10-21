import {LitElement, html, css} from 'lit';
import {deleteEmployee, store} from '../store';

export class DeleteEmployee extends LitElement {
  static get styles() {
    return css`
      .red {
        color: crimson;
      }
    `;
  }

  static get properties() {
    return {
      id: {type: String},
    };
  }

  constructor() {
    super();
  }

  async onclick(event) {
    event.preventDefault();
    store.dispatch(deleteEmployee(this.id));
  }

  render() {
    return html` <button @click="${this.onclick}">Delete</button> `;
  }
}

window.customElements.define('delete-employee', DeleteEmployee);
