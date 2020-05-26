import { LitElement, html } from "lit-element";

import localDb from "./../local-db";

const todoItemFactory = (todo, onClick) => {
  const { id, priority, title } = todo;
  return html`
    <link rel="stylesheet" href="./../../css/vendor/bootstrap.min.css" />
    <tr>
      <td scope="col">${priority}</td>
      <td scope="col">${title}</td>
      <td scope="col" width="1">
        <button
          id="onClick"
          @click=${onClick}
          data-id="${id}"
          type="button"
          class="btn btn-danger"
        >
          x
        </button>
      </td>
    </tr>
  `;
};

export class TodoTable extends LitElement {
  constructor() {
    super();
    this.todos = [];
  }

  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  async addTodo() {
    const priorityElem = this.shadowRoot.getElementById("todoPriority");
    const titleElem = this.shadowRoot.getElementById("todoTitle");
    this.todos = [
      ...this.todos,
      { id: Date.now(), priority: priorityElem.value, title: titleElem.value },
    ];
    await localDb.setItem("todos", this.todos);

    priorityElem.selectedIndex = 0;
    titleElem.value = "";

    console.log("add new todo item");
    console.log(this.todos);
    console.log(await localDb.getItem("todos"));
  }

  async removeTodo(event) {
    this.todos = this.todos.filter(
      (todo) => todo.id != event.target.getAttribute("data-id")
    );

    await localDb.setItem("todos", this.todos);

    console.log("removed new todo item");
    console.log(await localDb.getItem("todos"));
  }

  async firstUpdated(changedProperties) {
    this.todos = (await localDb.getItem("todos")) || [];
  }

  render() {
    console.log("render triggered");
    return html`
      <link rel="stylesheet" href="./../../css/vendor/bootstrap.min.css" />
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" width="15%">Priority</th>
            <th scope="col">Description</th>
            <th scope="col" width="1"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="table">
            <td>
              <select id="todoPriority" class="custom-select">
                <option selected="">Open this select menu</option>
                <option value="low">low</option>
                <option value="mid">mid</option>
                <option value="high">high</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                id="todoTitle"
                class="form-control"
                placeholder="Enter your todo here"
              />
            </td>
            <td>
              <button
                @click=${this.addTodo}
                type="button"
                class="btn btn-success"
              >
                +
              </button>
            </td>
          </tr>
          ${this.todos.map((todo) => todoItemFactory(todo, this.removeTodo))}
        </tbody>
      </table>
    `;
  }
}
