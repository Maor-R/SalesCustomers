let selectedRow = null;
let currId;
let t;
function onFormSubmit() {
  if (validate()) {
    let formData = readFormData();
    if (selectedRow == null) {
      insertNewRecord(formData);
      resetForm();
    } else {
      updateRecord(formData);
    }
    // resetForm();
  }
}

function readFormData() {
  let formData = {};
  formData["name"] = document.getElementById("name").value;

  return formData;
}

function insertNewRecord(data) {
  fetch(`http://localhost:60671/api/DCandidate`, {
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
        .getElementById("employeeList")
        .getElementsByTagName("tbody")[0];

      let newRow = table.insertRow(table.length);
      cell1 = newRow.insertCell(0);
      cell1.innerHTML = data.name;
      cell4 = newRow.insertCell(1);

      cell2 = newRow.insertCell(2);
      cell2.innerHTML = data.id;
      cell2.classList = "hide";

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
    if(selectedRow!==null)
    selectedRow.classList.remove('edit-row')
  selectedRow = td.parentElement.parentElement;
  selectedRow.classList = 'edit-row';
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  currId = parseInt(
    td.parentElement.parentElement.innerHTML
      .split("<td>")[2]
      .split('class="hide">')[1]
      .split("</td>")[0]
  );
}
function updateRecord(formData) {
  fetch(`http://localhost:60671/api/DCandidate/${currId}`, {
    method: "PUT",
    body: JSON.stringify({ name: formData.name }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
       

      console.log(data);
      selectedRow.classList.remove ('edit-row');

    })
    .catch((err) => {
     
      var t =
        err ==
        "SyntaxError: JSON.parse: unexpected end of data at line 1 column 1 of the JSON data";
      console.log(t);
      selectedRow.classList.remove ( 'edit-row');

      if (t) {
        selectedRow.cells[0].innerHTML = formData.name;
        resetForm();
      } else {
        alert("העיר שאתה מנסה להכניס קיימת כבר במאגר, נסה להכניס עיר אחרת!");
      }
      console.log(err);

    });
}

function onDelete(td) {
   id = parseInt(
    td.parentElement.parentElement.innerHTML
      .split("<td>")[2]
      .split('class="hide">')[1]
      .split("</td>")[0]
  );

   if (confirm("אתה בטוח שברצונך למחוק את הרשומה הזאת?")) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
    fetch(`http://localhost:60671/api/DCandidate/${id}`, {
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
  }
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
  // let table = document
  //   .getElementById("employeeList")
  //   .getElementsByTagName("tbody")[0];

    let table = new DataTable('#employeeList', {
      order: [[3, 'desc']]
  });

  fetch(`http://localhost:60671/api/DCandidate`)
    .then((res) => res.json())
    .then((data) => {
      let j = 1;
      data.forEach((e,i) => {

        console.log(i)
        const pages = document.getElementById("pages");
        if(i%5 === 0 ){
                  const newDiv = document.createElement('button');
        newDiv.innerText = j++;
        pages.appendChild(newDiv)
        
        // profileUser.style.display = "block";
        }

        console.log(table)
        t = table;
        let newRow = table.insertRow(table.length);
        console.log(newRow)
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = e.name;
        cell4 = newRow.insertCell(1);
        cell2 = newRow.insertCell(2);
        cell2.innerHTML = e.id;
        cell2.classList = "hide";
        cell4.innerHTML = `<a onClick="onEdit(this)">עריכה</a>
                               <a onClick="onDelete(this)">מחיקה</a>`;
      });
     })
    .catch((err) => console.log(err));
}
fetchData();

function searchCity(){
    let table = t;
    t.innerHTML = ""

    let e = document
    .getElementById("cityName");
    console.log(e.value)
fetch(`http://localhost:60671/api/DCandidate/Search/${e.value}`, {
    method: "GET",
     headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);


      data.forEach((e, i) => {
        let j = 2;console.log(i)
        const pages = document.getElementById("pages");
        if(i%5 === 0 && i>4){
                  const newDiv = document.createElement('button');
        newDiv.innerHTML = "k";
        pages.appendChild(newDiv)
        alert("h")
        // profileUser.style.display = "block";
        }
        console.log(table)
        let newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = e.name;
        cell4 = newRow.insertCell(1);
        cell2 = newRow.insertCell(2);
        cell2.innerHTML = e.id;
        cell2.classList = "hide";
        cell4.innerHTML = `<a onClick="onEdit(this)">עריכה</a>
                               <a onClick="onDelete(this)">מחיקה</a>`;
      });

    })
    .catch((err) => console.log(err));
}



const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => {if(tr.innerHTML.split('שם העיר').length<2)
            table.appendChild(tr)} );
})));


let currentPageNumber = 1;
function nextPage() {
  document.getElementById(`page${currentPageNumber}`).classList.add("hidden");        //Hide the current page
  document.getElementById(`page${currentPageNumber+1}`).classList.remove("hidden");   //Show the next page
  currentPageNumber++;                                                                //Increase currentPage accordingly
}