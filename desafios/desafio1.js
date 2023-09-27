const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.productID = 1;
        this.path = filePath;
        this.loadProductsFromFile();
    }

    // Cargar productos desde el archivo al inicializar la instancia
    loadProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const maxID = Math.max(...this.products.map(product => product.id));
                this.productID = maxID + 1;
            }
        } catch (error) {
            // El archivo no existe o está vacío
        }
    }

    // Guardar productos en el archivo
    saveProductsToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    // Agregar un producto
    addProduct(product) {
        // Valido que todos los campos estén completos
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Valido que no se encuentre el producto ya cargado
        if (this.products.some((prod) => prod.code === product.code)){
            console.log('El producto ya existe');
            return;
        }

        // Agrego el producto con un ID autoincrementable
        product.id = this.productID++;
        this.products.push(product);
        this.saveProductsToFile(); // Guardo en el archivo
    }

    // Ver el arreglo de productos
    getProducts() {
        return this.products;
    }

    // Buscar un producto por ID
    getProductById(id) {
        const product = this.products.find((prod) => prod.id === id);
        if (!product) {
            console.log('Producto no encontrado');
            return;
        }
        return product;
    }

    // Eliminar un producto por ID
    deleteProduct(id) {
        const index = this.products.findIndex((prod) => prod.id === id);
        if (index === -1) {
            console.log('Producto no encontrado');
            return;
        }
        this.products.splice(index, 1);
        this.saveProductsToFile(); // Guardo en el archivo
        console.log('Producto eliminado correctamente');
    }

    // Modificar un producto por ID
    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex((prod) => prod.id === id);
        if (index === -1) {
            console.log('Producto no encontrado');
            return;
        }
        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProductsToFile(); // Guardo en el archivo
        console.log('Producto modificado correctamente');
    }
}

// Creo la constante para la clase
const productManager = new ProductManager('products.json');

// Agrego productos completos
productManager.addProduct({
    title: 'Code #4',
    description: 'Fiesta electronica',
    price: 5000,
    thumbnail: 'ruta de imagen',
    code: 1,
    stock: 50
});
productManager.addProduct({
    title: 'Fabula',
    description: 'Fiesta de fin de año',
    price: 5000,
    thumbnail: 'ruta de imagen',
    code: 2,
    stock: 40
});
productManager.addProduct({
    title: 'Lola Fest',
    description: 'Fiesta de navidad',
    price: 5000,
    thumbnail: 'ruta de imagen',
    code: 3,
    stock: 50
});
console.log(productManager.getProducts());

// Agrego un producto incompleto
productManager.addProduct({
    title: 'Fabula',
    description: 'Fiesta de fin de año',
    price: 5000,
    thumbnail: 'ruta de imagen',
    code: 2
});

// Agrego un producto que ya existe
productManager.addProduct({
    title: 'Lola Fest',
    description: 'Fiesta de navidad',
    price: 5000,
    thumbnail: 'ruta de imagen',
    code: 1,
    stock: 50
});

// Llamo productos por su ID
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(4));

// Elimino un producto por su ID
productManager.deleteProduct(1);

// Modifico un producto por su ID
productManager.updateProduct(2, {
    title: 'Fabula',
    description: 'Fiesta de fin de año',
    price: 6000,
    thumbnail: 'nueva ruta de imagen',
    code: 2,
    stock: 30
});
