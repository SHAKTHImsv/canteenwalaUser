
  let isMobileMenuOpen = false;

  function setIsMobileMenuOpen(value) {
    isMobileMenuOpen = value;
    const mobileMenu = document.getElementById('mobile-menu');
    if (isMobileMenuOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('block');
    } else {
      mobileMenu.classList.remove('block');
      mobileMenu.classList.add('hidden');
    }
  }

  // Image carousel setup
  let currentImageIndex = 0;
  const images = [
    'https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000',
    'https://img.freepik.com/free-photo/assorted-fresh-vegetables-on-wooden-table_23-2148125529.jpg',
    'https://img.freepik.com/free-photo/fresh-pasta-ingredients-on-a-black-table_23-2148524269.jpg'
  ];

  const container = document.getElementById('container');
  
  // Function to go to the next image
  const goToNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    container.style.backgroundImage = `url(${images[currentImageIndex]})`;
  };

  // Function to go to the previous image
  const goToPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    container.style.backgroundImage = `url(${images[currentImageIndex]})`;
  };

  // Ensure buttons are ready before adding event listeners
  window.onload = () => {
    // Add event listeners for the "Prev" and "Next" buttons after the page has fully loaded
    const prevButton = document.querySelector('.slider-controls .bg-purple-500');
    const nextButton = document.querySelectorAll('.slider-controls .bg-purple-500')[1];

    prevButton.addEventListener('click', goToPrevImage);
    nextButton.addEventListener('click', goToNextImage);
  };

  // Canteen selection buttons
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");

  btn1.addEventListener("click", () => {
    window.location.href = "mainC.html";
  });
  btn2.addEventListener("click", () => {
    window.location.href = "hostelC.html";
  });
  btn3.addEventListener("click", () => {
    window.location.href = "foodC.html";
  });
  const homeSection = document.getElementById("homeSection");
  const menuSection = document.getElementById("menuSection");
  const aboutSection=document.getElementById("aboutSection");

  // Menu button (to show the menu section)
  document.getElementById("menuBtn").addEventListener('click', () => {
    
    homeSection.style.display = "none";
    menuSection.style.display = "block";
  });

document.getElementById("ml").addEventListener('click',()=>{
  homeSection.style.display = "none";
  menuSection.style.display = "block";
  aboutSection.style.display="none"
})
document.getElementById("hl").addEventListener('click',()=>{
  homeSection.style.display = "block";
  menuSection.style.display = "none";
  aboutSection.style.display="none"
})
document.getElementById("abl").addEventListener('click',()=>{
  homeSection.style.display = "none";
  menuSection.style.display = "none";
  aboutSection.style.display="block";
})
document.getElementById("msl").addEventListener('click',()=>{
  homeSection.style.display = "none";
  menuSection.style.display = "block";
  aboutSection.style.display="none"
})
document.getElementById("hsl").addEventListener('click',()=>{
  homeSection.style.display = "block";
  menuSection.style.display = "none";
  aboutSection.style.display="none"
})
document.getElementById("asl").addEventListener('click',()=>{
  homeSection.style.display = "none";
  menuSection.style.display = "none";
  aboutSection.style.display="block";
})