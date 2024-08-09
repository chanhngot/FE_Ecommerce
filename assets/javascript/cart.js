document.addEventListener("DOMContentLoaded", function() {
    // Lấy dữ liệu món ăn từ Local Storage
    var storedFoods = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Lặp qua từng món ăn trong dữ liệu đã lấy được
    storedFoods.forEach(function(food) {
        // Tạo phần tử HTML cho mỗi món ăn
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Tạo phần tử cho tên món ăn
        var itemName = document.createElement('p');
        itemName.classList.add('item-name');
        itemName.textContent = food.title; // Lấy title từ dữ liệu sản phẩm

        // Thêm sự kiện click vào tên món ăn để chuyển hướng đến trang chi tiết
        itemName.addEventListener('click', function() {
            window.location.href = 'detail.html?id=' + food.id; // Chuyển hướng đến trang chi tiết với id tương ứng
        });

        // Tạo phần tử cho giá gốc món ăn
        var itemoriginalPrice = document.createElement('p');
        itemoriginalPrice.classList.add('item-originalPrice');
        itemoriginalPrice.textContent = '$' + food.price.toFixed(2); // Lấy giá từ dữ liệu sản phẩm và định dạng số thành chuỗi có hai chữ số sau dấu thập phân

        // Tạo phần tử cho số lượng món ăn và các nút "plus" và "minus"
        var quantityContainer = document.createElement('div');
        quantityContainer.classList.add('quantity-container'); // Tạo lớp cho container

        var itemQuantity = document.createElement('input');
        itemQuantity.classList.add('item-quantity');
        itemQuantity.type = 'text'; // Đặt loại của ô input thành text
        itemQuantity.value = food.quantity.toString(); // Sử dụng value để gán giá trị của ô input
        // Loại bỏ thuộc tính readOnly để cho phép chỉnh sửa trực tiếp
        itemQuantity.removeAttribute('readOnly');

        // Thêm sự kiện 'input' để theo dõi thay đổi giá trị của ô input
        itemQuantity.addEventListener('input', function() {
            var newQuantity = parseInt(this.value); // Lấy giá trị số lượng mới từ ô input
            if (!isNaN(newQuantity) && newQuantity >= 1) { // Kiểm tra nếu giá trị nhập vào là số và lớn hơn hoặc bằng 1
                food.quantity = newQuantity; // Cập nhật giá trị số lượng của món ăn
                updateLocalStorage(storedFoods); // Cập nhật dữ liệu lên Local Storage
                updateTotalPrice(); // Cập nhật giá tiền tổng
            }
        });

        // Function to update total price
        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.classList.add('quantity-btn', 'plus-btn'); // Thêm lớp plus-btn
        plusButton.addEventListener('click', function() {
            food.quantity++;
            itemQuantity.value = food.quantity; // Cập nhật giá trị của ô input
            updateLocalStorage(storedFoods);
            updateTotalCartQuantity(storedFoods);
            updateTotalPrice(); // Cập nhật giá tiền tổng
        });

        var minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.classList.add('quantity-btn', 'minus-btn'); // Thêm lớp minus-btn
        minusButton.addEventListener('click', function() {
            if (food.quantity > 1) {
                food.quantity--;
                itemQuantity.value = food.quantity; // Cập nhật giá trị của ô input
                updateLocalStorage(storedFoods);
                updateTotalCartQuantity(storedFoods);
                updateTotalPrice(); // Cập nhật giá tiền tổng
            }
        });

        function updateLocalStorage(data) {
            localStorage.setItem('cartItems', JSON.stringify(data));
        }

        // Thêm các phần tử vào container
        quantityContainer.appendChild(minusButton);
        quantityContainer.appendChild(itemQuantity);
        quantityContainer.appendChild(plusButton);

        // Tạo phần tử cho tổng giá tiền món ăn
        var itemPrice = document.createElement('p');
        itemPrice.classList.add('item-price');
        itemPrice.textContent = '$' + (food.price * food.quantity).toFixed(2); // Tính toán giá tiền và định dạng số thành chuỗi có hai chữ số sau dấu thập phân
        function updateTotalPrice(){
            // itemPrice.textContent = '$'+(food.originalPrice * food.quantity);
            itemPrice.textContent = '$' + (food.price * food.quantity).toFixed(2);
        }


        //tạo button nút xóa
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');

        var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgIcon.classList.add('w-6', 'h-6', 'text-gray-800', 'dark:text-white');
        svgIcon.setAttribute('aria-hidden', 'true');
        svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgIcon.setAttribute('width', '24');
        svgIcon.setAttribute('height', '24');
        svgIcon.setAttribute('fill', 'none');
        svgIcon.setAttribute('viewBox', '0 0 24 24');

        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-width', '1');
        path.setAttribute('d', 'M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z');

        svgIcon.appendChild(path);

        deleteButton.appendChild(svgIcon);

        // Thêm sự kiện click vào nút xóa
        deleteButton.addEventListener('click', function() {
            var index = storedFoods.findIndex(function(item) {
                return item.id === food.id; // Giả sử mỗi sản phẩm có một thuộc tính id để xác định
            });
        
            // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không
            if (index !== -1) {
                // Xóa sản phẩm khỏi mảng storedFoods
                storedFoods.splice(index, 1);
        
                // Cập nhật dữ liệu trong Local Storage
                updateLocalStorage(storedFoods);
        
                // Cập nhật lại tổng số lượng hàng trong giỏ hàng
                updateTotalCartQuantity(storedFoods);
        
                // Loại bỏ phần tử HTML của sản phẩm khỏi giao diện người dùng
                cartRow.remove();
            }
        });

        // Thêm các phần tử vào phần tử danh sách "cart-item"
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemoriginalPrice);
        cartItem.appendChild(quantityContainer);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(deleteButton);

        // Thêm phần tử "cart-item" vào phần tử danh sách "cart-row"
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.appendChild(cartItem);

        // Thêm hàng mới vào danh sách "cart"
        document.getElementById('cart').appendChild(cartRow);
    });

    // Function to update cart quantity
    function updateTotalCartQuantity(data) {
        var totalQuantity = 0;
        data.forEach(function(item) {
            totalQuantity += item.quantity;
        });
        document.getElementById('cart-quantity').textContent = totalQuantity;
        localStorage.setItem('totalCartQuantity', totalQuantity);
    }

    // Update cart quantity initially
    updateTotalCartQuantity(storedFoods);
});





