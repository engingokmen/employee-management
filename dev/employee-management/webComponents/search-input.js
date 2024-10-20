import {LitElement, html, css} from 'lit';
import {store} from '../store';
import {searchTerm} from '../store/reducers';

export class SearchInput extends LitElement {
  static get styles() {
    return css`
      input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  async handleChange(event) {
    const {value} = event.target;
    store.dispatch(searchTerm(value));
    console.log(store.getState().search);
  }

  render() {
    return html`
      <input @input="${this.handleChange}" value="${store.getState().search}" />
    `;
  }
}

window.customElements.define('search-input', SearchInput);
