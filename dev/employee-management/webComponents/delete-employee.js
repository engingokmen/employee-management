import {LitElement, html, css} from 'lit';
import {deleteEmployee, store} from '../store';
import {buttonStyles} from '../styles/button-style';

export class DeleteEmployee extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        .red {
          color: crimson;
        }
      `,
    ];
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
    event.stopPropagation();
    store.dispatch(deleteEmployee(this.id));
  }

  render() {
    return html`
      <button @click="${this.onclick}" class="warning">Delete</button>
    `;
  }
}

window.customElements.define('delete-employee', DeleteEmployee);
