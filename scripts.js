let currentDropdown = null;

function toggleCourseDetails(event) {
    const categoryButton = event.currentTarget;
    const courseDropdown = categoryButton.nextElementSibling;

    // Close all other dropdowns
    document.querySelectorAll('.course-dropdown').forEach(dropdown => {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.previousElementSibling.classList.remove('active');
    });

    // If the new dropdown is the same as the current one, clear currentDropdown
    if (courseDropdown === currentDropdown) {
        currentDropdown = null;
    } else {
        // Otherwise, open the new dropdown and set it as the current one
        categoryButton.classList.add('active');
        courseDropdown.style.opacity = '1';
        courseDropdown.style.visibility = 'visible';
        currentDropdown = courseDropdown;
    }

    // Scroll to the course details
    courseDropdown.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Fetch testimonials
fetch('testimonials.json')
    .then(response => response.json())
    .then(data => {
        const testimonialGrid = document.querySelector('.testimonial-grid');
        data.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.classList.add('testimonial-card');
            testimonialCard.innerHTML = `
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-footer">
                    <span class="testimonial-author">${testimonial.author}</span>
                    <span class="testimonial-date">${testimonial.date}</span>
                </div>
                <div class="testimonial-rating">${testimonial.rating}</div>
            `;
            testimonialGrid.appendChild(testimonialCard);
        });
    })
    .catch(error => {
        console.error('Error fetching testimonials:', error);
    });

// Fetch course details
fetch('courseDetails.json')
    .then(response => response.json())
    .then(data => {
        courseDetails = data; // Store course details globally
        const coursesGrid = document.getElementById('coursesGrid');
        // Generate course category containers dynamically
        for (const courseHeading in data) {
            const courseCategoryContainer = document.createElement('div');
            courseCategoryContainer.classList.add('course-category-container');
            courseCategoryContainer.innerHTML = `
                <button class="course-category">${courseHeading}</button>
                <div class="course-dropdown"></div>
            `;
            coursesGrid.appendChild(courseCategoryContainer);

            const courseDropdown = courseCategoryContainer.querySelector('.course-dropdown');
            // Generate course items dynamically
            for (const courseId in data[courseHeading]) {
                const courseItem = document.createElement('div');
                courseItem.classList.add('course-item');
                courseItem.setAttribute('data-course-id', courseId);
                courseItem.innerHTML = `<h4>${courseId}</h4>`;
                courseItem.addEventListener('click', () => selectCourse(courseId));
                courseDropdown.appendChild(courseItem);
            }
        }

        // Add event listeners for course category buttons
        document.querySelectorAll('.course-category').forEach(button => {
            button.addEventListener('click', toggleCourseDetails);
        });
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
    });

// Fetch FAQ data
fetch('faq.json')
    .then(response => response.json())
    .then(data => {
        const faqAccordion = document.getElementById('faqAccordion');
        data.forEach((faqItem, index) => {
            const faqElement = document.createElement('div');
            faqElement.classList.add('faq-item');
            faqElement.innerHTML = `
                <input type="checkbox" id="q${index + 1}">
                <label for="q${index + 1}">${faqItem.question}</label>
                <p>${faqItem.answer.replace(/\n/g, '<br>')}</p>
            `;
            faqAccordion.appendChild(faqElement);
        });
    })
    .catch(error => {
        console.error('Error fetching FAQ data:', error);
    });

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('course-category')) {
            toggleCourseDetails({ currentTarget: activeElement });
        }
    }
});

// Function to move slides in the testimonial carousel
let slideIndex = 0;
const slides = document.querySelectorAll('.testimonial');
const totalSlides = slides.length;

function showSlides() {
    for (let i = 0; i < totalSlides; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > totalSlides) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function selectCourse(courseId) {
    let details;
    for (const courseHeading in courseDetails) {
        if (courseDetails[courseHeading][courseId]) {
            details = courseDetails[courseHeading][courseId];
            break;
        }
    }

    let answerBox = document.getElementById('dynamic-content');
    answerBox.innerHTML = `
        <h4>${courseId}</h4>
        <p>Description: ${details.description}</p>
        <p>Duration: ${details.duration}</p>
        <p>Future Job Opportunities: ${details.future_job_opportunities}</p>
        <p>Aspiring Students: ${details.aspiring_students}</p>
    `;
    answerBox.classList.add('show');
    answerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// When the user scrolls the page, execute the stickyNavbar function
window.onscroll = function () { stickyNavbar() };

// Get the header
var header = document.querySelector('header');

// Get the logo container
var logoContainer = document.querySelector('.logo-container');

// Calculate the height of the header
var headerHeight = header.offsetHeight;

// Function to add or remove the sticky class from the navbar
function stickyNavbar() {
    var scrollPosition = window.pageYOffset;
    var logoContainerHeight = logoContainer.offsetHeight;

    if (scrollPosition >= logoContainerHeight) {
        header.style.position = 'fixed'; /* Change to fixed positioning */
        header.style.top = '0';
    } else {
        header.style.position = 'relative'; /* Keep it relative */
        header.style.top = 'initial';
    }
}

// Call the stickyNavbar function to set the initial state
stickyNavbar();

// JavaScript to display thumbnail after video ends
document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('santhiVideo');
    video.addEventListener('ended', (e) => {
        video.load(); // This will reload the video and show the poster image as thumbnail
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop;
        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollPosition = targetPosition - 90; // Adjust the scroll position

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    });
});
// Active navigation highlighting
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3 ||
            (section === document.querySelector('footer') && pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
