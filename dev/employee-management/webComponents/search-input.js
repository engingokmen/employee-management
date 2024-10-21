import {LitElement, html, css} from 'lit';
import {store} from '../store';
import {searchTerm} from '../store/reducers';

export class SearchInput extends LitElement {
  static get styles() {
    return css`
      div {
        display: flex;
        justify-content: center;
      }
      input {
        box-sizing: border-box;
        padding: 0.5rem;
        width: 100%;
        max-width: 260px;
        font-size: 1rem;
        color: var(--primary-text-color);
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
  }

  render() {
    return html`
      <div>
        <input
          @input="${this.handleChange}"
          value="${store.getState().search}"
          placeholder="Type to search"
        />
      </div>
    `;
  }
}

window.customElements.define('search-input', SearchInput);
