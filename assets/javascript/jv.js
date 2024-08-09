fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    const listFoodContainer = document.getElementById('listFood');
    console.log("data", data);

    // Detect which page the script is running on
    const isDetailPage = window.location.pathname.includes('detail.html');
    const initialNumProducts = isDetailPage ? 6 : 6; // Show 6 products by default on both pages
    const incrementNumProducts = 3; // Number of products to show each time "Show More" is clicked
    let numProductsToShow = initialNumProducts;

    const row1Container = document.createElement('div');
    row1Container.classList.add('row1');

    // Function to create product elements
    function createProductElement(product) {
      // Create a product element
      const foodElement = document.createElement('div');
      foodElement.classList.add('food');

      // Create image element for product image
      const imgElement = document.createElement('img');
      imgElement.src = product.image;
      imgElement.classList.add('product-image');
      foodElement.appendChild(imgElement);

      // Add click event to image to redirect to detail.html
      imgElement.addEventListener('click', function() {
        window.location.href = `detail.html?id=${product.id}`;
      });

      // Create overall product element to hold name, button, rating, and price
      const overallFoodElement = document.createElement('div');
      overallFoodElement.classList.add('overall-Food');

      // Create a div to hold name and button
      const nameButtonElement = document.createElement('div');
      nameButtonElement.classList.add('name-button');

      // Create link for product name
      const nameLinkElement = document.createElement('a');
      nameLinkElement.href = `detail.html?id=${product.id}`; // Assumes a detail page for each product
      nameLinkElement.innerHTML = `<p class="name-food">${product.title}</p>`;
      nameButtonElement.appendChild(nameLinkElement);

      // Create button to buy product
      const buyButtonElement = document.createElement('button');
      buyButtonElement.classList.add('button', 'buy-now');
      buyButtonElement.textContent = 'Buy Now';
      nameButtonElement.appendChild(buyButtonElement);
      buyButtonElement.addEventListener('click', function() {
        // Redirect to buy.html
        window.location.href = 'buy.html';
      });

      overallFoodElement.appendChild(nameButtonElement);

      // Create a div to hold rating and price
      const ratingPriceElement = document.createElement('div');
      ratingPriceElement.classList.add('rating-price');

      // Create image element for rating
      const ratingImgElement = document.createElement('img');
      ratingImgElement.src = './assets/images/rating.png'; // Assumes an image for rating
      ratingPriceElement.appendChild(ratingImgElement);

      // Create element for price
      const priceElement = document.createElement('p');
      priceElement.classList.add('price');
      priceElement.textContent = `$${product.price}`;
      ratingPriceElement.appendChild(priceElement);

      overallFoodElement.appendChild(ratingPriceElement);
      foodElement.appendChild(overallFoodElement);

      return foodElement;
    }

    // Function to display products
    function displayProducts(startIndex, count) {
      for (let i = startIndex; i < startIndex + count && i < data.length; i++) {
        const product = data[i];
        const productElement = createProductElement(product);
        row1Container.appendChild(productElement);
      }
    }

    // Initial display of products
    displayProducts(0, numProductsToShow);

    // Append row to main container
    listFoodContainer.appendChild(row1Container);

    // Add "Show More" button on detail page
    if (isDetailPage) {
      const showMoreButton = document.querySelector('.padding-btm-60 .show-more');
      
      showMoreButton.addEventListener('click', function() {
        numProductsToShow += incrementNumProducts;
        displayProducts(row1Container.childElementCount, incrementNumProducts);

        // Hide the button if all products are displayed
        if (numProductsToShow >= data.length) {
          showMoreButton.style.display = 'none';
        }
      });
    }
  })
  .catch(error => console.error('Error fetching data:', error));