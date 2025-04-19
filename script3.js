import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7gqwik4wavvokkCMHR8RzonMfhgEfRYA",
  authDomain: "canteen-ee9be.firebaseapp.com",
  projectId: "canteen-ee9be",
  storageBucket: "canteen-ee9be.appspot.com",
  messagingSenderId: "216018272764",
  appId: "1:216018272764:web:fe4f9dcdfe7bb88070b279",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
  const mustard = document.getElementById('Mustard');
  const cucumber = document.getElementById('Cucumber');
  const canteen = document.getElementById('Canteen');
  const cinnamon = document.getElementById('Cinnamon');
  const menuItems = document.getElementById('menu-items');

  // Function to fetch menu items for the selected cafe
  function fetchMenuItems(canteenName, subCanteenName) {
    document.querySelector(".cards").style.display = "none"; // Hide the cards section when fetching menu

    const itemsRef = ref(database, 'items');

    get(itemsRef).then((snapshot) => {
      if (snapshot.exists()) {
        menuItems.innerHTML = '';  // Clear previous menu items

        let itemsFound = false; // Flag to track if any items are found

        snapshot.forEach((itemSnapshot) => {
          const itemData = itemSnapshot.val();

          if (itemData && itemData.items && Array.isArray(itemData.items)) {
            if (itemData.canteen === canteenName && itemData.subCanteen === subCanteenName) {
              itemsFound = true; // Set flag to true if items are found for the selected canteen

              itemData.items.forEach((item) => {
                menuItems.innerHTML += `
                  <div class="sub-cards px-6">
                    <div class="sub-card1 flex bg-black p-4 text-white flex-col gap-5 my-3">
                      <h1 class="text-center text-2xl">${item.itemName}</h1>
                      <h2 class="text-center text-1xl">Price: ₹${item.itemPrice}</h2>
                      <h2 class="text-center text-1xl">Available: ${item.itemQuantity}</h2>
                      <button class="add-to-cart bg-purple-500 p-2 text-white rounded flex justify-center" onclick="window.OrderForm()">Add to Cart</button>
                    </div>
                  </div>
                `;
              });
            }
          }
        });

        if (!itemsFound) {
          menuItems.innerHTML = "No items available in the selected canteen.";
        }
      } else {
        menuItems.innerHTML = "No items available in the selected canteen.";
      }
    }).catch((error) => {
      console.error("Error fetching data from Firebase: ", error);
      menuItems.innerHTML = "Error fetching menu items. Please try again.";
    });
  }

  // Event listeners for each cafe
  mustard.addEventListener('click', () => fetchMenuItems('mainCanteen', 'Mustard Cafe'));
  cucumber.addEventListener('click', () => fetchMenuItems('mainCanteen', 'Cucumber Cafe'));
  canteen.addEventListener('click', () => fetchMenuItems('mainCanteen', 'Saffron Cafe'));
  cinnamon.addEventListener('click', () => fetchMenuItems('mainCanteen', 'Cinnamon Cafe'));
});

// Define the OrderForm globally
window.OrderForm = function () {
  window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeKw7Op06RE8yWq1XcPJltkIyoU0lb4e-I7jn4wYEsIJDLuoA/viewform?usp=header";
}
