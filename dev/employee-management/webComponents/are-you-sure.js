import {LitElement, html, css, render} from 'lit';

export class AreYouSure extends LitElement {
  static get styles() {
    return css`
      #dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      show: {type: Boolean},
      action: {type: String},
    };
  }

  constructor() {
    super();
    this.show = false;
    this.dialog = null;
    this.action = '';

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  updated(changedProperties) {
    if (changedProperties.has('show')) {
      if (this.show) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    }
  }

  openDialog() {
    if (!this.dialog) {
      this.dialog = document.createElement('div');
      this.dialog.id = 'dialog-overlay';
      document.body.appendChild(this.dialog);
    }
    this.renderTemplate();
  }

  closeDialog() {
    if (this.dialog) {
      this.dialog.remove();
      this.dialog = null;
    }
  }

  handleSubmit() {
    this.dispatchEvent(new CustomEvent('submit'));
    this.closeDialog();
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.closeDialog();
  }

  renderTemplate() {
    render(
      html`<dialog open>
        <p>Are you sure to ${this.action.toUpperCase()} ?</p>
        <button @click=${this.handleSubmit}>Ok</button>
        <button @click=${this.handleCancel}>Cancel</button>
      </dialog> `,
      this.dialog
    );
    document.body.appendChild(this.dialog);
  }
}

window.customElements.define('are-you-sure', AreYouSure);
