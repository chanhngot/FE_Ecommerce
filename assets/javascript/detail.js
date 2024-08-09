document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch product details from the API
    function fetchProductDetail(productId) {
        return fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .catch(error => console.error('Error fetching product detail:', error));
    }

    // Function to update product detail on the page
    function updateProductDetail(product) {
        // Update title
        document.getElementById('product-title').textContent = product.title;

        // Update description
        document.getElementById('product-description').textContent = product.description;

        // Update price
        document.getElementById('product-price').textContent = `$${product.price}`;

        // Lưu thông tin sản phẩm vào Local Storage khi nhấn vào icon giỏ hàng
        const cartIcon = document.querySelector('.icon-cart');
        cartIcon.addEventListener('click', function() {
            // Tạo một đối tượng chứa thông tin sản phẩm
            const productInfo = {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: parseInt(document.getElementById('quantityButton').value) || 1 // Lấy số lượng từ input, mặc định là 1 nếu không có giá trị
            };

            // Lấy danh sách các sản phẩm đã được lưu trong Local Storage (nếu không có, sẽ trả về một mảng trống)
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Kiểm tra xem sản phẩm có cùng ID đã tồn tại trong danh sách hay không
            const existingProductIndex = cartItems.findIndex(item => item.id === productInfo.id);

            // Nếu sản phẩm có cùng ID đã tồn tại, không thêm vào mảng mới mà chỉ cập nhật số lượng
            if (existingProductIndex !== -1) {
                cartItems[existingProductIndex].quantity += productInfo.quantity;
            } else {
                // Thêm thông tin sản phẩm vào danh sách
                cartItems.push(productInfo);
            }

            // Lưu lại danh sách sản phẩm mới vào Local Storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Cập nhật số lượng trên biểu tượng giỏ hàng trong header
            updateCartQuantity();
        });
    }

    // Function to update cart quantity on the header icon
    function updateCartQuantity() {
        // Lấy tổng số lượng sản phẩm trong giỏ hàng
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let totalQuantity = 0;
        cartItems.forEach(item => {
            totalQuantity += item.quantity;
        });

        // Cập nhật số lượng trên biểu tượng giỏ hàng trong header
        document.getElementById('cart-quantity-header').textContent = totalQuantity;
    }

    // Get the product ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch product detail and update the page
    fetchProductDetail(productId)
        .then(product => {
            if (product) {
                updateProductDetail(product);
            } else {
                console.error('Product not found');
            }
        });
});
