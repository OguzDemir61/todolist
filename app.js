//! Hem kendimi geliştirmek hem de pratik yapmak amacıyla böyle bir proje hazırladım.
//!Örnek olarka almak isteyen arkadaşlar ve kendim için kodların başlarında ve gerekli yerlerinde neyi neden yaptığımı not olarak düştüm
//?-------------------->TODO lİST PROJESİ<--------------------

//*elemetleri seçtim
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firsCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

//*kullanacağım fonksiyonları yazdım
runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEveryWhere);
  filterInput.addEventListener("keyup", filter);
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
//*todolistesinde arama yapmak için bu fonksiyonu kullanacam
function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display:block");
      } else {
        todo.setAttribute("style", "display:none !important");
      }
    });
  } else {
    showAlert("warning", "Filtrelemek İçin En Az Bir Todo Olması Gerekir");
  }
}
//* bütün todoları tamamen silme
function allTodosEveryWhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
      showAlert("success", "Tüm Todolarınız Silinmiştir");
    });
    //*storage üzerinden silinmesi için
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    showAlert("warning", "Silmeniz için En Az 1 Todo Eklemeniz Gerekir");
  }
}
//*eklenen tododları ön yüzden ve storagedan silmek için fonksiyon tanımladım
function removeTodoToUI(e) {
  //* Önce ekrandan siliyoruz
  if (e.target.className === "fa fa-remove") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    //* sonrasında storageden de siliyoruz
    removeTodoStorage(todo.textContent);
    showAlert("success", "Todo Başarıyla Silindi.");
  }
}
function removeTodoStorage(removeTodo) {
  checkTodosFromStorage();
  let index = todos.indexOf(removeTodo);
  if (index !== -1) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    showAlert("warning", "Todo bulunamadı");
  }
}
function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen Boş Bırakmayınız");
  } else {
    //*arayüze ekledim
    addTodoToUI(inputText);
    //*storage ekleme
    addTodoToStorage(inputText);
    showAlert("success", "Todo Eklendi");
  }

  e.preventDefault();
}

function addTodoToUI(newTodo) {
  /*
<li class="list-group-item d-flex justify-content-between">Todo 1
                          <a href="#" class="delete-item">
                              <i class="fa fa-remove"></i>
                          </a>
                      </li>
                      */
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}
//*todos global değişken olarak tanımladım ki yeni todo eklenirken diğerinin üzerinde yazdırmasın
function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

//*ekleyip yeni todoyu da ekledim
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//*Bilgilendirme mesajlarını ekledim
function showAlert(type, message) {
  /*
  <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div>*/
  const div = document.createElement("div");
  // div.className = "alert alert -" + type;
  div.className = `alert alert-${type}`; //litirel template
  div.textContent = message;
  firsCardBody.appendChild(div);
  //* süre ekledim
  setTimeout(function () {
    div.remove();
  }, 2500);
}
