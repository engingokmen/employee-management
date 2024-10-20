import {LitElement, html, css} from 'lit';

export class Pagination extends LitElement {
  static get styles() {
    return css`
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      button {
        padding: 8px;
      }

      select {
        padding: 4px;
      }
    `;
  }

  static get properties() {
    return {
      currentPage: {type: Number},
      totalPages: {type: Number},
    };
  }

  constructor() {
    super();
  }

  changePage(page) {
    if (page > 0 && page <= this.totalPages) {
      this.dispatchEvent(
        new CustomEvent('page-changed', {
          detail: {page},
        })
      );
    }
  }

  render() {
    return html`
      <div>
        <button
          @click="${() => this.changePage(this.currentPage - 1)}"
          ?disabled="${this.currentPage === 1}"
        >
          Previous
        </button>
        <span>Page ${this.currentPage} of ${this.totalPages}</span>
        <button
          @click="${() => this.changePage(this.currentPage + 1)}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          Next
        </button>
      </div>
    `;
  }
}

window.customElements.define('pagination-c', Pagination);