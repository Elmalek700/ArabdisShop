// جلب المنتجات من السيرفر
async function loadProducts() {
  const res = await fetch("/products");
  const products = await res.json();
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>👤 ${p.seller}</p>
      <button onclick="buyProduct('${p.seller}')">🛒 شراء</button>
    `;
    container.appendChild(div);
  });
}

// إضافة منتج
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const seller = document.getElementById("seller").value;

  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, image, seller })
  });

  e.target.reset();
  loadProducts();
});

// عند الشراء → فتح Popup
function buyProduct(seller) {
  document.getElementById("sellerInfo").innerText = `تواصل مع ${seller} على ديسكورد`;
  document.getElementById("popup").style.display = "flex";
}

// غلق الـ Popup
document.getElementById("closePopup").onclick = closePopup;
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// تحميل المنتجات أول ما يفتح الموقع
loadProducts();
