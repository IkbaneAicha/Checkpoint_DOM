document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);

    const title = document.createElement('h1');
    title.innerText = 'Shopping Cart';
    container.appendChild(title);

    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.id = 'cart-items';
    container.appendChild(cartItemsContainer);

    const products = [
        { name: 'Ensemble jupe tunique', price: 25.00, imageSrc: '/images/image1.jpg' },
        { name: 'Turkish Robe Dresses', price: 40.00, imageSrc: '/images/image 2.jpg' }
    ];

    products.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const img = document.createElement('img');
        img.src = product.imageSrc;
        img.alt = product.name;
        img.className = 'product-image';
        cartItem.appendChild(img);

        const itemDetails = document.createElement('div');
        itemDetails.className = 'item-details';

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.innerText = product.name;
        itemDetails.appendChild(title);

        const price = document.createElement('span');
        price.className = 'price';
        price.innerText = `$${product.price.toFixed(2)}`;
        itemDetails.appendChild(price);

        const quantityControl = document.createElement('div');
        quantityControl.className = 'quantity-control';

        const decreaseButton = document.createElement('button');
        decreaseButton.className = 'decrease';
        decreaseButton.innerText = '-';
        quantityControl.appendChild(decreaseButton);

        const quantitySpan = document.createElement('span');
        quantitySpan.className = 'quantity';
        quantitySpan.innerText = '1';
        quantityControl.appendChild(quantitySpan);

        const increaseButton = document.createElement('button');
        increaseButton.className = 'increase';
        increaseButton.innerText = '+';
        quantityControl.appendChild(increaseButton);

        itemDetails.appendChild(quantityControl);
        cartItem.appendChild(itemDetails);

        const itemActions = document.createElement('div');
        itemActions.className = 'item-actions';

        const likeButton = document.createElement('button');
        likeButton.className = 'like';
        likeButton.innerHTML = '&#10084;';
        itemActions.appendChild(likeButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerHTML = '🗑️';  // Trash icon for delete
        itemActions.appendChild(deleteButton);

        cartItem.appendChild(itemActions);
        cartItemsContainer.appendChild(cartItem);
    });

    const totalContainer = document.createElement('div');
    totalContainer.className = 'total';
    totalContainer.innerHTML = `Total: <span id="total-price">$0.00</span>`;
    container.appendChild(totalContainer);

    const totalPriceElement = document.getElementById('total-price');

    const calculateTotal = () => {
        let totalPrice = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.price').innerText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').innerText);
            totalPrice += price * quantity;
        });
        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    };

    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('increase')) {
            const quantitySpan = e.target.previousElementSibling;
            quantitySpan.innerText = parseInt(quantitySpan.innerText) + 1;
            calculateTotal();
        }

        if (e.target.classList.contains('decrease')) {
            const quantitySpan = e.target.nextElementSibling;
            const currentQuantity = parseInt(quantitySpan.innerText);
            if (currentQuantity > 1) {
                quantitySpan.innerText = currentQuantity - 1;
                calculateTotal();
            }
        }

        if (e.target.classList.contains('delete')) {
            e.target.closest('.cart-item').remove();
            calculateTotal();
        }

        if (e.target.classList.contains('like')) {
            e.target.classList.toggle('liked');
        }
    });

    calculateTotal();
});
