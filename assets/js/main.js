import { getAllProducts, getFilteredProducts, addProduct, updateProduct, deleteProduct } from './modules/services.js';
import { validateProductForm, validateCheckoutForm, clearValidationStates } from './modules/validator.js';
import { renderClientCatalog, renderAdminTable, renderLivePreview } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("DATA MOCK PRODUK PERTANIAN (ALL)");
    console.table(getAllProducts());

    let editModeId = null;

    const btnClient = document.querySelector('#btn-mode-client');
    const btnAdmin = document.querySelector('#btn-mode-admin');
    const viewClient = document.querySelector('#view-client');
    const viewAdmin = document.querySelector('#view-admin');

    const form = document.querySelector('#product-form');
    const formSubmitBtn = form.querySelector('button[type="submit"]');
    const nameInput = document.querySelector('#product-name');
    const categoryInput = document.querySelector('#product-category');
    const priceInput = document.querySelector('#product-price');
    const stockInput = document.querySelector('#product-stock');

    const livePreviewContainer = document.querySelector('#live-preview-container');
    const filterCategory = document.querySelector('#filter-category');
    const clientGrid = document.querySelector('#client-product-grid');
    const adminTableBody = document.querySelector('#admin-table-body');
    const totalValuationDisplay = document.querySelector('#total-valuation');

    const modal = document.querySelector('#checkout-modal');
    const closeModal = document.querySelector('#close-modal');
    const checkoutDetails = document.querySelector('#checkout-details');
    const checkoutForm = document.querySelector('#checkout-form');
    const buyerName = document.querySelector('#buyer-name');
    const buyerEmail = document.querySelector('#buyer-email');
    const buyerAddress = document.querySelector('#buyer-address');
    const paymentMethod = document.querySelector('#payment-method');

    const updatePreview = () => {
        renderLivePreview({
            name: nameInput.value.trim(),
            category: categoryInput.value,
            price: parseFloat(priceInput.value),
            stock: parseInt(stockInput.value, 10)
        }, livePreviewContainer);
    };

    form.addEventListener('input', updatePreview);
    categoryInput.addEventListener('change', updatePreview);

    btnClient.addEventListener('click', () => {
        btnClient.classList.add('active');
        btnAdmin.classList.remove('active');
        viewClient.classList.remove('hidden');
        viewAdmin.classList.add('hidden');
        updateUI();
    });

    btnAdmin.addEventListener('click', () => {
        btnAdmin.classList.add('active');
        btnClient.classList.remove('active');
        viewAdmin.classList.remove('hidden');
        viewClient.classList.add('hidden');
        updateUI();
    });

    const updateUI = () => {
        const products = getFilteredProducts(filterCategory.value);

        renderClientCatalog(products, clientGrid, (idToBuy) => {
            const product = getAllProducts().find(p => p.id === idToBuy);
            if (product) {
                checkoutDetails.innerHTML = `
          <p><strong>Produk:</strong> ${product.name}</p>
          <p><strong>Harga:</strong> Rp ${product.price.toLocaleString('id-ID')}</p>
        `;
                modal.classList.remove('hidden');
            }
        });

        renderAdminTable(
            getAllProducts(),
            adminTableBody,
            totalValuationDisplay,
            (idToDelete) => {
                deleteProduct(idToDelete);
                if (editModeId === idToDelete) {
                    resetAdminForm();
                }
                updateUI();
            },
            (idToEdit) => {
                const product = getAllProducts().find(p => p.id === idToEdit);
                if (product) {
                    editModeId = product.id;
                    nameInput.value = product.name;
                    categoryInput.value = product.category;
                    priceInput.value = product.price;
                    stockInput.value = product.stock;

                    formSubmitBtn.textContent = "Update Produk";
                    formSubmitBtn.style.backgroundColor = "var(--warning)";
                    clearValidationStates(form);
                    updatePreview();
                    window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
                }
            }
        );

        updatePreview();
    };

    const resetAdminForm = () => {
        editModeId = null;
        form.reset();
        formSubmitBtn.textContent = "Simpan ke System";
        formSubmitBtn.style.backgroundColor = "var(--primary)";
        clearValidationStates(form);
        updatePreview();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateProductForm(nameInput, categoryInput, priceInput, stockInput)) {
            const productPayload = {
                name: nameInput.value.trim(),
                category: categoryInput.value,
                price: parseFloat(priceInput.value),
                stock: parseInt(stockInput.value, 10)
            };

            if (editModeId !== null) {
                updateProduct(editModeId, productPayload);
            } else {
                addProduct(productPayload);
            }

            resetAdminForm();
            updateUI();
        }
    });

    closeModal.onclick = () => {
        modal.classList.add('hidden');
        clearValidationStates(checkoutForm);
    };

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateCheckoutForm(buyerName, buyerEmail, buyerAddress, paymentMethod)) {
            alert(`Pembayaran Berhasil!\n\nDetail Transaksi:\n- Nama: ${buyerName.value}\n- Email: ${buyerEmail.value}\n- Metode: ${paymentMethod.value}\n\nNota pembayaran telah dikirimkan ke email Anda.`);
            modal.classList.add('hidden');
            checkoutForm.reset();
            clearValidationStates(checkoutForm);
        }
    });

    filterCategory.addEventListener('change', updateUI);
    updateUI();
});