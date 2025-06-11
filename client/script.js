let selectedRow = null;
let currId;
let t;
let d ;

function onFormSubmit() {
  if (validate()) {
    let formData = readFormData();
    if (selectedRow == null) {
      insertNewRecord(formData);
      resetForm();
    } else {
      updateRecord(formData);
    }
  }
}

function readFormData() {
  let formData = {};
  formData["name"] = document.getElementById("name").value;
  return formData;
}

function insertNewRecord(data) {
  fetch(`http://localhost:60671/api/cities`, {
    method: "POST",
    body: JSON.stringify({ name: data.name }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let table = document
        .getElementById("citiesList")
        .getElementsByTagName("tbody")[0];

      let newRow = table.insertRow(table.length);
      cell1 = newRow.insertCell(0);
      cell1.innerHTML = data.name;
      cell4 = newRow.insertCell(1);

      cell2 = newRow.insertCell(2);
      cell2.innerHTML = data.id;
      cell2.classList = "hide";
      currId = data.id;

      cell4.innerHTML = `<a onClick="onEdit(this)">עריכה</a>
                   <a onClick="onDelete(this)">מחיקה</a>`;

     })
    .catch((err) => {
      console.log(err);
      alert("העיר שאתה מנסה להכניס קיימת כבר במאגר, נסה להכניס עיר אחרת!");
    });
}

function resetForm() {
  document.getElementById("name").value = "";
  selectedRow = null;
}

function onEdit(td) {
  if (selectedRow !== null) selectedRow.classList.remove("edit-row");
  selectedRow = td.parentElement.parentElement;
  selectedRow.classList = "edit-row";
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;

}
function updateRecord(formData) {
  fetch(`http://localhost:60671/api/cities/${currId}`, {
    method: "PUT",
    body: JSON.stringify({ name: formData.name }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      selectedRow.classList.remove("edit-row");
       d[0] = formData.name;
       selectedRow.cells[0].innerHTML = formData.name;
       resetForm();
    })
    .catch((err) => {
       selectedRow.classList.remove("edit-row");
       resetForm();
      console.log(err);
    });
}

function onDelete(td) {

  setTimeout(() => {
    if (confirm("אתה בטוח שברצונך למחוק את הרשומה הזאת?")) {
      row = td.parentElement.parentElement;
      document.getElementById("citiesList").deleteRow(row.rowIndex);
      resetForm();

      setTimeout(() => {
        fetch(`http://localhost:60671/api/cities/${currId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      }, 0);
    }
  }, 1000);
}
function validate() {
  isValid = true;
  if (document.getElementById("name").value == "") {
    isValid = false;
    document.getElementById("nameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document.getElementById("nameValidationError").classList.contains("hide")
    )
      document.getElementById("nameValidationError").classList.add("hide");
  }
  return isValid;
}

function fetchData() {
  let table = new DataTable("#citiesList", {
    pageLength: 5,
    order: [[3, "desc"]],
  });
  $("label[for=dt-search-0]").html(
    '<label for="dt-search-0">חיפוש במאגר:</label>'
  );

  $("label[for=dt-length-0]").hide();
  $("#citiesList_info").hide();

  $("#dt-length-0").hide();

  $("#citiesList")[0]
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr")[0]
    .getElementsByTagName("td")[0].style.display = "none";

  const ed = `<a onClick="onEdit(this)">עריכה</a>
  <a onClick="onDelete(this)">מחיקה</a>`;
  fetch(`http://localhost:60671/api/cities`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((e) => {
        t = table;
    
        table.row.add([e.name, ed, e.id]).draw(false);
        table.column(2).visible(false);
      });
    })
    .catch((err) => console.log(err));
}

fetchData();

$("#citiesList tbody").on("click", "tr", getCurrId);

function getCurrId() {
    d = t.row(this).data();
  currId = d[2];
 
}




 