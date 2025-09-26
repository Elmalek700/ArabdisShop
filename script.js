const addProductBtn = document.getElementById("addProductBtn");
const productForm = document.getElementById("productForm");
const closeForm = document.getElementById("closeForm");
const saveProduct = document.getElementById("saveProduct");
const productList = document.getElementById("productList");

let products = [];

addProductBtn.addEventListener("click", () => {
  productForm.classList.remove("hidden");
});

closeForm.addEventListener("click", () => {
  productForm.classList.add("hidden");
});

saveProduct.addEventListener("click", () => {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;

  if (name && price && image) {
    const product = { name, price, image };
    products.push(product);
    renderProducts();
    productForm.classList.add("hidden");
  }
});

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} $</p>
    `;
    productList.appendChild(div);
  });
}