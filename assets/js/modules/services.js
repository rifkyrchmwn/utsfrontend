let agriculturalProducts = [
    { id: 1, name: "Beras Merah Organik 5kg", category: "Beras & Biji-bijian", price: 85000, stock: 20 },
    { id: 2, name: "Sawi Hidroponik 250g", category: "Sayur Segar", price: 12000, stock: 45 },
    { id: 3, name: "Pupuk Kompos Posdaya 10kg", category: "Pupuk & Nutrisi", price: 35000, stock: 30 },
    { id: 4, name: "Beras Putih Premium 10kg", category: "Beras & Biji-bijian", price: 145000, stock: 15 },
    { id: 5, name: "Bawang Merah Lokal 1kg", category: "Sayur Segar", price: 38000, stock: 50 },
    { id: 6, name: "Bawang Putih Kating 1kg", category: "Sayur Segar", price: 42000, stock: 40 },
    { id: 7, name: "Cabai Rawit Merah 500g", category: "Sayur Segar", price: 28000, stock: 35 },
    { id: 8, name: "Tomat Ceri Organik 500g", category: "Sayur Segar", price: 18000, stock: 25 },
    { id: 9, name: "Melon Hydroponik Golden 1kg", category: "Buah-buahan", price: 32000, stock: 18 },
    { id: 10, name: "Semangka Tanpa Biji 1kg", category: "Buah-buahan", price: 15000, stock: 22 },
    { id: 11, name: "Alpukat Mentega Super 1kg", category: "Buah-buahan", price: 45000, stock: 12 },
    { id: 12, name: "Pisang Candi Banyuwangi 1 Sisir", category: "Buah-buahan", price: 25000, stock: 30 },
    { id: 13, name: "Jagung Manis Organik 1kg", category: "Sayur Segar", price: 14000, stock: 60 },
    { id: 14, name: "Kacang Tanah Kupas 1kg", category: "Beras & Biji-bijian", price: 36000, stock: 28 },
    { id: 15, name: "Kacang Hijau Super 1kg", category: "Beras & Biji-bijian", price: 30000, stock: 20 },
    { id: 16, name: "Pupuk Kasgot Organik 5kg", category: "Pupuk & Nutrisi", price: 25000, stock: 40 },
    { id: 17, name: "Pupuk NPK Mutiara 1kg", category: "Pupuk & Nutrisi", price: 22000, stock: 50 },
    { id: 18, name: "Nutrisi Hidroponik AB Mix 1L", category: "Pupuk & Nutrisi", price: 48000, stock: 15 },
    { id: 19, name: "Wortel Organik Segar 1kg", category: "Sayur Segar", price: 16000, stock: 30 },
    { id: 20, name: "Jeruk Siam Banyuwangi 1kg", category: "Buah-buahan", price: 22000, stock: 25 }
];

export const getAllProducts = () => agriculturalProducts;

export const getFilteredProducts = (categoryName) => {
    if (!categoryName) return agriculturalProducts;
    return agriculturalProducts.filter(
        (item) => item.category.toLowerCase() === categoryName.toLowerCase()
    );
};

export const addProduct = (newProduct) => {
    const productWithId = {
        id: agriculturalProducts.length ? agriculturalProducts.length + 1 : 1,
        ...newProduct
    };
    agriculturalProducts.push(productWithId);
    return productWithId;
};

export const updateProduct = (id, updatedData) => {
    agriculturalProducts = agriculturalProducts.map((item) => {
        if (item.id === id) {
            return { ...item, ...updatedData };
        }
        return item;
    });
};

export const deleteProduct = (id) => {
    agriculturalProducts = agriculturalProducts.filter((item) => item.id !== id);

    agriculturalProducts = agriculturalProducts.map((item, index) => ({
        ...item,
        id: index + 1
    }));
};

export const calculateTotalValuation = (items) => {
    return items.reduce((total, item) => total + (item.price * item.stock), 0);
};