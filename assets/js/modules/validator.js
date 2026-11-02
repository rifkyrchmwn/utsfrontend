const setError = (inputElement, message) => {
    const formGroup = inputElement.parentElement;
    const errorDisplay = formGroup.querySelector('.error-text');
    formGroup.classList.add('has-error');
    formGroup.classList.remove('has-success');
    if (errorDisplay) errorDisplay.textContent = message;
};

const setSuccess = (inputElement) => {
    const formGroup = inputElement.parentElement;
    const errorDisplay = formGroup.querySelector('.error-text');
    formGroup.classList.add('has-success');
    formGroup.classList.remove('has-error');
    if (errorDisplay) errorDisplay.textContent = '';
};

export const validateProductForm = (nameInput, categoryInput, priceInput, stockInput) => {
    let isValid = true;

    const nameVal = nameInput.value.trim();
    const categoryVal = categoryInput.value;
    const priceVal = parseFloat(priceInput.value);
    const stockVal = parseInt(stockInput.value, 10);

    if (!nameVal || nameVal.length < 4) {
        setError(nameInput, "Nama produk minimal 4 karakter!");
        isValid = false;
    } else {
        setSuccess(nameInput);
    }

    if (!categoryVal) {
        setError(categoryInput, "Pilih salah satu kategori!");
        isValid = false;
    } else {
        setSuccess(categoryInput);
    }

    if (isNaN(priceVal) || priceVal <= 0) {
        setError(priceInput, "Harga harus berupa angka lebih besar dari 0!");
        isValid = false;
    } else {
        setSuccess(priceInput);
    }

    if (isNaN(stockVal) || stockVal < 0) {
        setError(stockInput, "Stok tidak boleh bernilai negatif!");
        isValid = false;
    } else {
        setSuccess(stockInput);
    }

    return isValid;
};

export const validateCheckoutForm = (nameInput, emailInput, addressInput, paymentMethodSelect) => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const addressVal = addressInput.value.trim();
    const paymentVal = paymentMethodSelect.value;

    if (!nameVal || nameVal.length < 3) {
        setError(nameInput, "Nama pembeli minimal 3 karakter!");
        isValid = false;
    } else {
        setSuccess(nameInput);
    }

    if (!emailRegex.test(emailVal)) {
        setError(emailInput, "Format email tidak valid (contoh: user@gmail.com)!");
        isValid = false;
    } else {
        setSuccess(emailInput);
    }

    if (!addressVal || addressVal.length < 5) {
        setError(addressInput, "Alamat pengiriman minimal 5 karakter!");
        isValid = false;
    } else {
        setSuccess(addressInput);
    }

    if (!paymentVal) {
        setError(paymentMethodSelect, "Pilih metode pembayaran!");
        isValid = false;
    } else {
        setSuccess(paymentMethodSelect);
    }

    return isValid;
};

export const clearValidationStates = (form) => {
    const groups = form.querySelectorAll('.form-group');
    groups.forEach((group) => {
        group.classList.remove('has-error', 'has-success');
        const errorDisplay = group.querySelector('.error-text');
        if (errorDisplay) errorDisplay.textContent = '';
    });
};