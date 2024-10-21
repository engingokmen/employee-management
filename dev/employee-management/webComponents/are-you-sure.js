import {LitElement, html, css} from 'lit';

export class AreYouSure extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      show: {type: Boolean},
      action: {type: String},
    };
  }

  handleSubmit() {
    this.dispatchEvent(new CustomEvent('submit'));
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  render() {
    return this.show
      ? html`<dialog open>
          <p>Are you sure to ${this.action.toUpperCase()} ?</p>
          <button @click=${this.handleSubmit}>Ok</button>
          <button @click=${this.handleCancel}>Cancel</button>
        </dialog> `
      : '';
  }
}

window.customElements.define('are-you-sure', AreYouSure);
