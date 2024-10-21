#Jeevan Taxi & Tour Booking Website
This project is a responsive website designed for booking taxis and tours. It includes various features such as smooth scrolling navigation, a weather-based price calculator, and a dynamic slideshow for showcasing packages. The site is built with HTML, CSS, JavaScript, and Django to handle the backend logic for calculating tour prices based on real-time weather data.

Table of Contents
Features
Technologies
Setup
Usage
Project Structure
License
Features
Navigation Menu: Smooth scrolling navigation to different sections of the website.
Slideshow: Dynamic slideshow with previous, next, and dot navigation.
Weather-Based Price Calculator: Calculates trip prices based on weather conditions (rain surcharge), time of the day, and trip type (one-way/two-way).
Responsive Design: Mobile-friendly layout.
Django Integration: Handles form inputs, price calculations, and dynamic weather data fetching using OpenWeather API.
Technologies
Frontend: HTML5, CSS3, JavaScript (ES6)
Backend: Django 4.x (Python)
API: OpenWeather API for fetching weather conditions
Version Control: Git, GitHub
Setup
Requirements
Python 3.x
Django 4.x
OpenWeather API Key (for weather data)
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/ntech2005/JEEVAN.git
Navigate to the project directory:

bash
Copy code
cd Project_Jeevan
Create a virtual environment:

bash
Copy code
python -m venv .venv
Activate the virtual environment:

For Windows:
bash
Copy code
.venv\Scripts\activate
For Linux/macOS:
bash
Copy code
source .venv/bin/activate
Install the required dependencies:

bash
Copy code
pip install -r requirements.txt
Set up your OpenWeather API key:

Update the API key in the JavaScript code where it fetches weather data:
js
Copy code
const apiKey = 'YOUR_API_KEY';  // Replace with your actual OpenWeather API key
Run the Django development server:

bash
Copy code
python manage.py runserver
Access the website: Open a web browser and visit:

url
Copy code
http://127.0.0.1:8000
Usage
Navigation: Use the top navigation bar to scroll smoothly between sections like Taxi Booking, Tours & Packages, About Us, Services, Blog, and Contact Us.
Slideshow: The homepage features a slideshow showcasing various tour packages. Navigate using the next/previous buttons or the bullet dots.
Booking: Users can select a taxi package and calculate the price based on factors such as trip type, time of day, and real-time weather data.
Weather-Based Pricing: The site dynamically adjusts prices based on current weather conditions using the OpenWeather API.
Project Structure
csharp
Copy code
.
├── .venv/                   # Virtual environment directory
├── static/                  # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── templates/               # HTML templates
│   └── base.html
├── Project_Jeevan/          # Django project folder
│   ├── settings.py
│   ├── urls.py
│   └── views.py
├── manage.py                # Django management script
├── README.md                # Project documentation
└── requirements.txt         # Python dependencies