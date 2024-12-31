const products = [
    {id: 1, name: "Miniature Ruby Ring", images: ["images/product1a.jpg", "images/product1b.jpg"], weight: "5g", price: "150$", description: "This exquisite ring features a vivid ruby as its centerpiece, meticulously painted with a scene from a classic Persian miniature. The artwork depicts a lush garden with intricate floral patterns, symbolizing love and passion. Set in a delicate gold band, this piece combines the fiery beauty of the ruby with the rich cultural heritage of Persia."},
    {id: 2, name: "Emerald Necklace", images: ["images/product2a.jpg", "images/product2b.jpg"], weight: "10g", price: "250$", description: "The Emerald Narrative Ring showcases a deep green emerald, transformed into a canvas for a miniature tale of ancient Persian poetry. The stone is adorned with a scene of scholars in a library, surrounded by scrolls and books, representing wisdom and knowledge. Encased in a silver setting, this ring not only adds a touch of elegance but also carries a narrative of learning."},
    {id: 3, name: "Sapphire Earrings", images: ["images/product3a.jpg", "images/product3b.jpg"], weight: "2g", price: "100$", description: "Crafted with a serene blue sapphire, this ring captures the essence of the Persian night sky. The gemstone is painted with subtle details of stars and mythological figures, echoing stories told under the night sky in ancient Persia. The ring's platinum band enhances the gem's cool tones, making it a piece that tells a story of the cosmos and folklore through its miniature art."},
    // Add more products here with image arrays
];
document.addEventListener('DOMContentLoaded', function() {
    function displayProducts(productsToShow) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        
        productsToShow.forEach(product => {
            let carouselItems = product.images.map((image, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img class="d-block w-100" src="${image}" alt="${product.name}">
                </div>
            `).join('');

            let indicators = product.images.map((_, index) => `
                <li data-target="#carousel${product.id}" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
            `).join('');

            productList.innerHTML += `
                <div class="col-md-3 product-item">
                    <div id="carousel${product.id}" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            ${indicators}
                        </ol>
                        <div class="carousel-inner">
                            ${carouselItems}
                        </div>
                    </div>
                    <a href="product-detail.html?id=${product.id}" class="text-dark product-info">
                        <h5>${product.name}</h5>
                        <p>Weight: ${product.weight}</p>
                        <p class="price">${product.price}</p>
                    </a>
                </div>
            `;
        });
    }

    function searchProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    function sortProducts(sortBy) {
        let sortedProducts = [...products]; // Create a copy to avoid modifying original array
        if (sortBy === 'priceLowToHigh') {
            sortedProducts.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        } else if (sortBy === 'priceHighToLow') {
            sortedProducts.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        }
        displayProducts(sortedProducts);
    }

    document.getElementById('sortSelect').addEventListener('change', function() {
        sortProducts(this.value);
    });

    document.querySelector('[onclick="searchProducts()"]').addEventListener('click', function(e) {
        e.preventDefault();  // Prevent form submission if there is one
        searchProducts();
    });

    displayProducts(products);

    // Initialize all carousels
    $('.carousel').carousel();
});

        document.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            // Find the product based on the ID, for this example we'll use the products array from gallery
            const selectedProduct = products.find(product => product.id == productId);
        
            if (selectedProduct) {
                // Update the page with the selected product's details
                document.querySelector('.product-title').textContent = selectedProduct.name;
                document.querySelector('.product-price').textContent = `Price: ${selectedProduct.price}`;
                document.querySelector('.product-weight').textContent = `Weight: ${selectedProduct.weight}`;
                document.querySelector('.product-description p').textContent = `${selectedProduct.description}`;

                // Update carousel images
                document.querySelectorAll('#carouselProduct .carousel-item').forEach((item, index) => {
                    item.querySelector('img').src = selectedProduct.images[index];
                });
            } else {
                // Handle case where product is not found
                console.error('Product not found');
            }
        });