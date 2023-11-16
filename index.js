var listArray = [];
const input = document.querySelector("#txtToDo");
input.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    addToArray(e.target.value);
    e.target.value = "";
  }
});

function createList(list) {
  const li = document.createElement("li");
  li.innerText = list.listItem;

  var i = null;
  listArray.forEach(function (element, index) {
    if (element.id == list.id) {
      i = index;
    }
  });

  const chkBox = document.createElement("input");
  chkBox.type = "checkbox";

  if (listArray[i].checked) {
    chkBox.checked = true;
    li.style = "text-decoration:line-through";
  }

  const editButton = document.createElement("button");
  editButton.innerText = "Edit"; // Pencil emoji as edit icon
  li.appendChild(editButton);

  // Add event listener to edit button
  editButton.addEventListener("click", function () {
    const newValue = prompt("Enter new value for task", li.innerText);
    if (newValue) {
      li.innerText = newValue;
      listArray[i].listItem = newValue;
    }
    li.append(chkBox, editButton, btn);
  document.querySelector("#list").append(li);
  });

  chkBox.addEventListener("change", function () {
    if (this.checked) {
      li.style = "text-decoration:line-through";
      listArray[i].checked = true;
    } else {
      li.style = "text-decoration:none";
      listArray[i].checked = false;
    }
    localStorage.setItem("ToDoListA2", JSON.stringify(listArray));
  });

  const btn = document.createElement("button");
  btn.innerText = "X";

  btn.addEventListener("click", function () {
    li.remove();
    listArray.splice(i, 1);
    localStorage.setItem("ToDoListA2", JSON.stringify(listArray));
  });

  li.append(chkBox, editButton, btn);
  document.querySelector("#list").append(li);
}

function addToArray(value) {
  var pId = 0;
  if (listArray.length > 0) {
    pId = listArray[listArray.length - 1].id + 1;
  }

  var valuObject = {
    id: pId,
    listItem: value,
    checked: false,
  };
  listArray.push(valuObject);

  createList(valuObject);
  localStorage.setItem("ToDoListA2", JSON.stringify(listArray));
}

window.onload = function () {
  // localStorage.clear();
  if (localStorage.getItem("ToDoListA2")) {
    listArray = JSON.parse(localStorage.getItem("ToDoListA2"));
    listArray.forEach((list) => {
      createList(list);
    });
  }
};
