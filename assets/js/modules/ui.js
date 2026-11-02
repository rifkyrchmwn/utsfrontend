import { calculateTotalValuation } from './services.js';

const formatCurrency = (amount) => `Rp ${(amount || 0).toLocaleString('id-ID')}`;

export const renderLivePreview = (data, containerElement) => {
  const name = data.name || "Nama Produk...";
  const category = data.category || "Kategori";
  const price = data.price ? formatCurrency(data.price) : "Rp 0";
  const stock = data.stock !== "" && !isNaN(data.stock) ? `${data.stock} unit` : "0 unit";

  containerElement.innerHTML = `
    <article class="product-card">
      <span class="badge">${category}</span>
      <h3 style="margin: 8px 0;">${name}</h3>
      <p><strong>Harga:</strong> ${price}</p>
      <p><strong>Stok Tersedia:</strong> ${stock}</p>
      <button class="btn btn-buy" disabled style="opacity: 0.6; cursor: not-allowed;">Preview Kartu</button>
    </article>
  `;
};

export const renderClientCatalog = (products, containerElement, onBuyCallback) => {
  containerElement.innerHTML = '';

  if (products.length === 0) {
    containerElement.innerHTML = '<p>Produk tidak ditemukan.</p>';
    return;
  }

  const cardsHTML = products.map((prod) => `
    <article class="product-card">
      <span class="badge">${prod.category}</span>
      <h3 style="margin: 8px 0;">${prod.name}</h3>
      <p><strong>Harga:</strong> ${formatCurrency(prod.price)}</p>
      <p><strong>Stok Tersedia:</strong> ${prod.stock} unit</p>
      <button class="btn btn-buy" data-action="buy" data-id="${prod.id}">Beli Produk</button>
    </article>
  `).join('');

  containerElement.innerHTML = cardsHTML;

  containerElement.onclick = (e) => {
    if (e.target && e.target.dataset.action === 'buy') {
      const productId = parseInt(e.target.dataset.id, 10);
      onBuyCallback(productId);
    }
  };
};

export const renderAdminTable = (products, tableBodyElement, totalValuationElement, onDeleteCallback, onEditCallback) => {
  tableBodyElement.innerHTML = '';

  if (products.length === 0) {
    tableBodyElement.innerHTML = '<tr><td colspan="6" style="text-align:center;">Belum ada data produk.</td></tr>';
    totalValuationElement.textContent = formatCurrency(0);
    return;
  }

  const rowsHTML = products.map((prod) => `
    <tr>
      <td>${prod.id}</td>
      <td>${prod.name}</td>
      <td>${prod.category}</td>
      <td>${formatCurrency(prod.price)}</td>
      <td>${prod.stock}</td>
      <td>
        <button class="btn btn-edit" data-action="edit" data-id="${prod.id}">Edit</button>
        <button class="btn btn-delete" data-action="delete" data-id="${prod.id}">Hapus</button>
      </td>
    </tr>
  `).join('');

  tableBodyElement.innerHTML = rowsHTML;

  const total = calculateTotalValuation(products);
  totalValuationElement.textContent = formatCurrency(total);

  tableBodyElement.onclick = (e) => {
    const target = e.target;
    if (target && target.dataset.action === 'delete') {
      const productId = parseInt(target.dataset.id, 10);
      onDeleteCallback(productId);
    } else if (target && target.dataset.action === 'edit') {
      const productId = parseInt(target.dataset.id, 10);
      onEditCallback(productId);
    }
  };
};