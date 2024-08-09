
let menuList= document.getElementById("menuList")
menuList.style.maxHeight = "0px";
function handleMenuToggle(x) {
toggleMenu();
myFunction(x);
}
function toggleMenu() {
    if(menuList.style.maxHeight == "0px")
    {
        menuList.style.maxHeight = "1000px";
    }
    else {
        menuList.style.maxHeight="0px";
    }
}
function myFunction(x) {
x.classList.toggle("change");
}

document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector('.menu-mobile .container');
  const navbarMenu = document.querySelector('.navbar-menu');

  // Toggle the menu on click
  menuToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('active');
  });

  // Close the menu when clicking outside of it
  document.addEventListener('click', function(event) {
    if (!navbarMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      navbarMenu.classList.remove('active');
    }
  });
});

/////////////////////////////////////
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if(slides.length > 0){
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
  
}


//////////////////// ADD TO CART /////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
  // Lấy thẻ input số lượng
  const quantityInput = document.getElementById('quantityButton');

  // Lấy các nút minus và plus
  const minusButton = document.querySelector('.minus');
  const plusButton = document.querySelector('.plus');

  // Xử lý sự kiện khi nhấn vào nút minus
  minusButton.addEventListener('click', function() {
      // Lấy giá trị hiện tại của số lượng
      let quantity = parseInt(quantityInput.value);

      // Giảm số lượng đi 1 nếu số lượng lớn hơn 1
      if (quantity > 1) {
          quantity -= 1;
          quantityInput.value = quantity;
      }
  });

  // Xử lý sự kiện khi nhấn vào nút plus
  plusButton.addEventListener('click', function() {
      // Lấy giá trị hiện tại của số lượng
      let quantity = parseInt(quantityInput.value);

      // Tăng số lượng lên 1
      quantity += 1;
      quantityInput.value = quantity;
  });

  // Lấy thẻ icon giỏ hàng
  const cartIcon = document.querySelector('.icon-cart');

  // Xử lý sự kiện khi click vào icon giỏ hàng
  cartIcon.addEventListener('click', function() {
      // Lấy tổng số lượng từ Local Storage (nếu không có sẽ trả về 0)
      let totalQuantity = parseInt(localStorage.getItem('totalCartQuantity')) || 0;

      // Lấy số lượng từ input
      const newQuantity = parseInt(quantityInput.value);

      // Cộng thêm số lượng mới vào tổng số lượng
      totalQuantity += newQuantity;

      // Lưu tổng số lượng mới vào Local Storage
      localStorage.setItem('totalCartQuantity', totalQuantity);

      // Cập nhật số lượng trên biểu tượng giỏ hàng trong header
      document.getElementById('cart-quantity-header').textContent = totalQuantity;
  });
});



function opentext(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");


  for (i = 0; i < x.length; i++) {
  
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}



 ////////////////////////////////// apply Code giảm giá 0k

function applyCoupon() {
  var couponCode = document.getElementById("code").value;

  if (couponCode === "SAVE10") { 
      var currentTotal = parseFloat(document.querySelector('.rs-price').textContent.replace('Rs.$', ''));
      var discount = currentTotal * 0.1; 
      var newTotal = currentTotal - discount;

      document.querySelector('.rs-price').textContent = 'Rs.$' + newTotal.toFixed(2);

      document.getElementById('message').textContent = 'Coupon applied successfully!';
      document.getElementById('message').style.color = 'green';
  } else if (couponCode === "HALFOFF") { 
      var currentTotal = parseFloat(document.querySelector('.rs-price').textContent.replace('Rs.$', ''));
      var discount = currentTotal * 0.5; 
      var newTotal = currentTotal - discount;

      document.querySelector('.rs-price').textContent = 'Rs.$' + newTotal.toFixed(2);

      document.getElementById('message').textContent = 'Coupon applied successfully!';
      document.getElementById('message').style.color = 'green';
  } else {
      
      document.getElementById('message').textContent = 'Invalid coupon code. Please try again.';
      document.getElementById('message').style.color = 'red';
  }

  event.preventDefault();
}

/////////////////////////////