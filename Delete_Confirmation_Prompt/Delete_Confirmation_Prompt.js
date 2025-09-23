let todoItems = [
  { id: 1, title: "Homework" },
  { id: 2, title: "Shopping" },
  { id: 3, title: "Calling Mom" },
  { id: 4, title: "Coffee with Elphaba" },
];

class App {
  constructor() {
    this.todos = todoItems;
    this.body = document.querySelector("body");
    this.ul = document.querySelector(".todos");
    this.promptDiv = document.querySelector(".confirm_prompt");
    this.overlay = document.querySelector(".overlay");

    this.yesBtn = document.createElement("button");
    this.noBtn = document.createElement("button");
    this.questionP = document.createElement("p");

    this.init();
  }

  renderTodoItems() {
    this.todos.forEach((item) => {
      let li = document.createElement("li");
      li.setAttribute("data-id", `${item.id}`);
      li.textContent = `${item.title}`;
      this.ul.appendChild(li);
    });
  }

  renderDeleteBtns() {
    const list = document.querySelectorAll("li");
    list.forEach((item) => {
      let span = document.createElement("span");
      span.classList.add("remove");
      item.appendChild(span);
    });
  }

  deleteItemOnList(itemId) {
    this.todos = this.todos.filter((item) => item.id !== +itemId);
    let deletedItem = this.ul.querySelector(`li[data-id="${itemId}"]`);
    this.ul.removeChild(deletedItem);
  }

  displayPrompt(listItem) {
    let itemId = listItem.dataset.id;
    let item = this.todos.filter((item) => item.id === +itemId)[0];

    this.questionP.textContent = "";
    this.promptDiv.dataset.id = "";

    this.questionP.textContent = `Are you sure you want to delete ${item.title}?`;
    this.promptDiv.appendChild(this.questionP);

    this.promptDiv.dataset.id = item.id;
    this.promptDiv.style.display = "block";
    this.overlay.style.display = "block";

    this.yesBtn.textContent = "Yes";
    this.yesBtn.classList.add("action", "confirm-yes");
    this.promptDiv.appendChild(this.yesBtn);

    this.noBtn.textContent = "No";
    this.noBtn.classList.add("action", "confirm-no");
    this.promptDiv.appendChild(this.noBtn);
  }

  handlePromptClick(event) {
    let target = event.target.closest(".remove");

    if (!target) {
      return;
    }

    let listItem = target.closest("li");
    this.displayPrompt(listItem);
  }

  handleRemovePromptClick(event) {
    this.promptDiv.style.display = "none";
    this.overlay.style.display = "none";
  }

  handleYesClick(event) {
    event.preventDefault();

    let id = this.promptDiv.dataset.id;

    this.deleteItemOnList(id);

    this.promptDiv.style.display = "none";
    this.overlay.style.display = "none";
  }

  handleNoClick(event) {
    event.preventDefault();

    this.promptDiv.style.display = "none";
    this.overlay.style.display = "none";
  }

  bindEvents() {
    this.ul.addEventListener("click", this.handlePromptClick.bind(this));
    this.overlay.addEventListener(
      "click",
      this.handleRemovePromptClick.bind(this)
    );

    this.yesBtn.addEventListener("click", this.handleYesClick.bind(this));
    this.noBtn.addEventListener("click", this.handleNoClick.bind(this));
  }

  init() {
    this.renderTodoItems();
    this.renderDeleteBtns();

    this.bindEvents();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
