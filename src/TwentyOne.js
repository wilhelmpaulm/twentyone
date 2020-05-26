import { LitElement, css, html } from "lit-element";

import { logo } from "./templates/logo.js";

export class TwentyOne extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <div>
        <div class="logo">${logo}</div>
      </div>
    `;
  }
}
