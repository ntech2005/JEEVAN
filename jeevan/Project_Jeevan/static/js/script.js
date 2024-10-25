
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - (window.innerHeight / 3) + (targetElement.clientHeight / 2),
            behavior: 'smooth'
        });
    });
});
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

// Function to show slides
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Show next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Show previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// Add event listeners for navigation buttons
next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// Add event listeners for bullet dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

// Auto-play slider every 5 seconds
setInterval(nextSlide, 5000);

async function getWeather(location) {
    const apiKey = '33aa8aaec37f0edf30e1a43bd321ce65'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.weather && data.weather.length > 0) {
            return data.weather[0].main; // Returns weather condition (e.g., Rain)
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
    return null; // Return null if fetching failed
}

async function calculatePrice() {
    // Base price in INR
    let basePrice = 500; // Base price for one-way

    // Get form values
    const tripType = document.querySelector('input[name="trip-type"]:checked').value;
    const departureDate = new Date(document.getElementById('departure').value);
    const currentDate = new Date();
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const ampm = document.getElementById('ampm').value;
    const location = document.getElementById('from').value; // Use the pickup location

    // Convert 12-hour time to 24-hour time
    let fullHours = (ampm === "PM" && hours !== 12) ? hours + 12 : (ampm === "AM" && hours === 12) ? 0 : hours;

    // Fetch weather data
    const weatherCondition = await getWeather(location);
    console.log("Weather Condition:", weatherCondition);

    // Calculate time difference from now
    let timeDifference = Math.abs(departureDate - currentDate) / 36e5; // Time difference in hours

    // Weather Impact (assuming rain adds a surcharge)
    let weatherMultiplier = (weatherCondition === "Rain") ? 1.5 : 1; // 50% increase for rain

    // Time of Day Impact (Night prices increase, 10 PM to 5 AM)
    let timeMultiplier = (fullHours >= 22 || fullHours < 5) ? 1.5 : 1;

    // Trip Type Impact (Two-way trip doubles the price)
    let tripMultiplier = tripType === "two-way" ? 2 : 1;

    // Calculate final price
    let finalPrice = basePrice * timeMultiplier * weatherMultiplier * tripMultiplier;

    // Display the final price
    document.getElementById("price").innerText = `Estimated Price: INR ${finalPrice.toFixed(2)}`;
}

let basePrice = 0; // Ensure this is declared globally

function selectPackage(packageName, price) {
    // Set the selected package and base price
    document.getElementById('selected-package').value = packageName;
    basePrice = price; // Update the basePrice globally
    scrollToForm(); // Scroll to the form when a package is selected
}

async function calculateTourPrice() {
    const location = document.getElementById('location').value;
    
    // Validate that the package has been selected
    if (!basePrice) {
        alert("Please select a package first!");
        return;
    }

    // Validate that the location is provided
    if (!location) {
        alert("Please enter your starting location.");
        return;
    }

    // Base price without any weather or additional logic
    let finalPrice = basePrice;

    // Update the price on the page
    document.getElementById('estimated-price').innerText = `Estimated Price: INR ${finalPrice.toFixed(2)}`;
}
