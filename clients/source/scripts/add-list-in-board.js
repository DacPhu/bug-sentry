let columnCount = 1;

function addColumn() {
  columnCount++;
  const container = document.getElementById("container-list");
  const columns = document.querySelectorAll(".column");
  const lastColumn = columns[columns.length - 1];
  const newColumn = document.createElement("div");
  newColumn.className = "column col-md-3";
  newColumn.id = "column" + columnCount;
  newColumn.innerHTML = `
    <h3>Column ${columnCount}</h3>
    <ul id="column${columnCount}">
    </ul>
    <button class="add-btn" onclick="addTaskBox('column${columnCount}')">+</button>
`;

  container.insertBefore(newColumn, lastColumn.nextSibling);
}

function addTaskBox(columnId) {
  const column = document.getElementById(columnId);
  const textBox = document.createElement("li");
  textBox.innerHTML = '<input type="text" class="text-box">';
  column.insertBefore(textBox, column.lastElementChild);
}
