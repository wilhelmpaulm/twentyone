import { LitElement, html } from "lit-element";

export class TodoItem extends LitElement {
  static get properties() {
    return {
      id: { type: String },
      priority: { type: String },
      title: { type: String },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <link rel="stylesheet" href="./../../css/vendor/bootstrap.min.css" />
      <tr>
        <th scope="col">${this.priority}</th>
        <th scope="col">${this.title}</th>
        <th scope="col" width="1">
          <button id="removeTodo" on type="button" class="btn btn-success">
            x
          </button>
        </th>
      </tr>
    `;
  }
}
