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

// Define the menu container to avoid the "menu is not defined" error
const menu = document.getElementById("menu-items");

document.addEventListener("DOMContentLoaded", function () {
    const foodCourtCanteen = document.getElementById("foodCourtCanteen");

    // Event listener for Food Court (main canteen)
    foodCourtCanteen.addEventListener("click", () => {
        fetchMenuItems('foodCourt', 'Department Store');  // Main and sub-canteen have the same name
    });
});

function fetchMenuItems(canteenName, subCanteenName) {
    const menu = document.getElementById("menu-items");
    document.querySelector(".cards").style.display = "none"; // Hide the cards when displaying menu items

    const itemRef = ref(database, 'items'); // Reference to the "items" node in Firebase
    get(itemRef).then((snapshot) => {
        if (snapshot.exists()) {
            menu.innerHTML = ''; // Clear previous menu items
            snapshot.forEach((itemSnapshot) => {
                const itemdata = itemSnapshot.val();
                const itemId = itemSnapshot.key; // Get the unique item ID

                // Ensure the itemdata has the right structure
                if (itemdata && itemdata.items && Array.isArray(itemdata.items)) {
                    // Only proceed if the canteen is "Food Court" and the subCanteen matches the clicked one
                    if (itemdata.canteen === canteenName && itemdata.subCanteen.toLowerCase().includes(subCanteenName.toLowerCase())) {

                        // Loop through the items and display each one
                        itemdata.items.forEach((item, index) => {
                            menu.innerHTML += `
                                <div class="sub-cards p-4" id="item-${itemId}-${index}">
                                    <div class="sub-card1 sub-card1 flex bg-black p-4 text-white flex-col gap-5 my-3">
                                        <h1 class="text-center text-2xl">${item.itemName}</h1>
                                        <h2 class="text-center text-1xl">Price: ₹${item.itemPrice}</h2>
                                    </div>
                                </div>
                            `;
                        });
                    }
                } else {
                    console.error('Item data does not have a valid "items" array or is undefined.');
                }
            });

            
        } else {
            console.log('No data found.');
            menu.innerHTML = "<p>No menu items available for this sub-canteen.</p>";
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
        menu.innerHTML = "<p>Error fetching data. Please try again later.</p>"; // Display an error message
    });
}
