let notifications = [];

// Function to show notification
function showNotification(message) {
    notifications.push(message);
    updateNotificationIcon();
    displayNotifications();
}

function updateNotificationIcon() {
    const notificationCount = document.getElementById('notification-count');
    if (notificationCount) {
        notificationCount.innerText = notifications.length;
    }
}

function displayNotifications() {
    const container = document.getElementById('notification-container');
    container.innerHTML = ''; // Clear previous notifications

    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        notificationItem.innerText = notification;
        container.appendChild(notificationItem);
    });
}

// Toggle notification list visibility
const notificationIconElement = document.querySelector('.notification-icon');
if (notificationIconElement) {
    console.log('Notification icon found');
    notificationIconElement.addEventListener('click', () => {
        const notificationList = document.getElementById('notification-container');
        if (notificationList) {
            console.log('Toggling notification list');
            notificationList.classList.toggle('active');
            notifications = []; // Clear notifications when viewed
            updateNotificationIcon();
        }
    });
} else {
    console.log('Notification icon not found');
}

// Show login notification
const loginForm = document.querySelector('#login-form');
const loginModal = document.querySelector('#login-modal');
if (loginForm && loginModal) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        showNotification('Logged in successfully!');
        loginModal.style.display = 'none';
    });
} else {
    console.log('Login form or modal not found');
}

// Show registration notification
const registerForm = document.querySelector('#register-form');
const registerModal = document.querySelector('#register-modal');
if (registerForm && registerModal) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        showNotification('Registered successfully!');
        registerModal.style.display = 'none';
    });
} else {
    console.log('Register form or modal not found');
}

// Show reservation notification
const reserveFoodBtn = document.getElementById('reserve-food-btn');
if (reserveFoodBtn) {
    reserveFoodBtn.addEventListener('click', () => {
        const restaurantList = document.getElementById('restaurants-list');
        if (restaurantList) {
            restaurantList.classList.toggle('hidden');
            if (!restaurantList.classList.contains('hidden')) {
                restaurantList.innerHTML = `
                    <div class="restaurant-item" data-name="Restaurant A">Restaurant A</div>
                    <div class="restaurant-item" data-name="Restaurant B">Restaurant B</div>
                    <div class="restaurant-item" data-name="Restaurant C">Restaurant C</div>
                `;

                const restaurantItems = restaurantList.querySelectorAll('.restaurant-item');
                restaurantItems.forEach(item => {
                    item.addEventListener('click', () => {
                        const restaurantName = item.getAttribute('data-name');
                        showNotification(`You have reserved food at ${restaurantName}`);
                    });
                });
            } else {
                restaurantList.innerHTML = '';
            }
        } else {
            console.log('Restaurant list not found');
        }
    });
} else {
    console.log('Reserve food button not found');
}

// Show search bar when search icon is clicked
const searchIconElement = document.querySelector('.search-icon');
const searchInput = document.querySelector('.header-search-input');

if (searchIconElement && searchInput) {
    searchIconElement.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        searchInput.focus();
    });
} else {
    console.log('Search icon or input not found');
}

// Fetch and display nearby restaurants based on user location
const findRestaurantsBtn = document.querySelector('#find-restaurants-btn');
if (findRestaurantsBtn) {
    findRestaurantsBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
} else {
    console.log('Find restaurants button not found');
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Placeholder for fetching and displaying nearby restaurants
    const restaurants = [
        { name: 'Restaurant A', distance: '0.5 km' },
        { name: 'Restaurant B', distance: '1.0 km' },
        { name: 'Restaurant C', distance: '1.5 km' },
    ];

    const nearbyRestaurantsList = document.getElementById('nearby-restaurants-list');
    if (nearbyRestaurantsList) {
        nearbyRestaurantsList.innerHTML = '<h3>Nearby Restaurants</h3>';

        restaurants.forEach(restaurant => {
            const restaurantItem = document.createElement('div');
            restaurantItem.className = 'restaurant-item';
            restaurantItem.innerHTML = `<p>${restaurant.name} - ${restaurant.distance}</p>`;
            nearbyRestaurantsList.appendChild(restaurantItem);
        });
    } else {
        console.log('Nearby restaurants list not found');
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}

// Menu Drawer Functionality
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const menuDrawer = document.querySelector('.menu-drawer');
const header = document.querySelector('header');

if (menuIcon && closeIcon && menuDrawer && header) {
    menuIcon.addEventListener('click', () => {
        menuDrawer.classList.toggle('menu-open');
        document.body.style.transition = 'left 0.3s ease';
    });

    closeIcon.addEventListener('click', () => {
        menuDrawer.classList.remove('menu-open');
        document.body.style.transition = 'left 0.3s ease';
    });

    document.addEventListener('click', (event) => {
        if (!menuDrawer.contains(event.target) && !header.contains(event.target)) {
            menuDrawer.classList.remove('menu-open');
        }
    });
} else {
    console.log('Menu elements not found');
}
