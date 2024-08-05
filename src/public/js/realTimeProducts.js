const socket = io();
const addProdForm = document.getElementById("addProductForm");
const delProdForm = document.getElementById("deleteProductForm");
const table = document.getElementById("productTable");

addProdForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {};
  for (const field of addProdForm.elements) {
    if (field.name) {
      formData[field.name] = field.value;
      if (field.name == "price" || field.name == "stock")
        formData[field.name] = parseFloat(field.value);
    }
  }

  await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  addProdForm.reset();
});


delProdForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pid = document.getElementById("productID").value;
  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pid }),
  });

  delProdForm.reset();
});


socket.on("dataUpdated", (products) => {
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.textContent = product.id;
    row.appendChild(idCell);
    const titleCell = document.createElement("td");
    titleCell.textContent = product.title;
    row.appendChild(titleCell);
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = product.description;
    row.appendChild(descriptionCell);
    const codeCell = document.createElement("td");
    codeCell.textContent = product.code;
    row.appendChild(codeCell);
    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;
    row.appendChild(priceCell);
    const stockCell = document.createElement("td");
    stockCell.textContent = product.stock;
    row.appendChild(stockCell);
    const categoryCell = document.createElement("td");
    categoryCell.textContent = product.category;
    row.appendChild(categoryCell);
    tbody.appendChild(row);
  });
});