let courseDetails = {};

// Function to show course popup
function showCoursePopup(event) {
    const categoryButton = event.currentTarget;
    const courseHeading = categoryButton.getAttribute('data-category');
    const popupCourseHeading = document.getElementById('popupCourseHeading');
    const courseList = document.getElementById('courseList');
    const coursePopup = document.getElementById('coursePopup');

    popupCourseHeading.textContent = courseHeading;
    courseList.innerHTML = '';

    for (const courseId in courseDetails[courseHeading].courses) {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');
        
        const courseImage = document.createElement('img');
        courseImage.src = courseDetails[courseHeading].courses[courseId].image;
        courseImage.alt = courseId;
        
        const courseTitle = document.createElement('h4');
        courseTitle.textContent = courseId;
        
        courseItem.appendChild(courseImage);
        courseItem.appendChild(courseTitle);
        
        courseItem.addEventListener('click', () => {
            showCourseDetails(courseId, courseHeading);
        });
        
        courseList.appendChild(courseItem);
    }

    coursePopup.style.display = 'block';
}

// Function to show course details
function showCourseDetails(courseId, courseHeading) {
    const courseInfo = courseDetails[courseHeading].courses[courseId];
    const courseDetailsHeading = document.getElementById('courseDetailsHeading');
    const courseDetailsInfo = document.getElementById('courseDetailsInfo');
    const courseDetailsPopup = document.getElementById('courseDetailsPopup');
    const coursePopup = document.getElementById('coursePopup');

    if (courseInfo) {
        courseDetailsHeading.textContent = courseId;
        
        const courseImage = document.createElement('img');
        courseImage.src = courseInfo.image;
        courseImage.alt = courseId;
        
        courseDetailsInfo.innerHTML = `
            <div class="course-image">${courseImage.outerHTML}</div>
            <div class="course-details">
                <p><strong>Description:</strong> ${courseInfo.description}</p>
                <p><strong>Duration:</strong> ${courseInfo.duration}</p>
                <p><strong>Future Job Opportunities:</strong> ${courseInfo.future_job_opportunities}</p>
                <p><strong>Aspiring Students:</strong> ${courseInfo.aspiring_students}</p>
            </div>
        `;
        
        coursePopup.style.display = 'none';
        courseDetailsPopup.style.display = 'block';
    } else {
        console.error(`Course details not found for courseId: ${courseId}`);
    }
}

// Close course details popup when close button is clicked
const closeDetailsPopupBtn = document.getElementById('closeDetailsPopupBtn');
closeDetailsPopupBtn.addEventListener('click', () => {
    const courseDetailsPopup = document.getElementById('courseDetailsPopup');
    courseDetailsPopup.style.display = 'none';
});
fetch('courseDetails.json')
    .then(response => response.json())
    .then(data => {
        courseDetails = data;
        const coursesGrid = document.getElementById('coursesGrid');
        for (const courseHeading in data) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('course-category');
            categoryDiv.setAttribute('data-category', courseHeading);
            
            const categoryImage = document.createElement('img');
            categoryImage.src = data[courseHeading].image;
            categoryImage.alt = courseHeading;
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = courseHeading;
            
            categoryDiv.appendChild(categoryImage);
            categoryDiv.appendChild(categoryTitle);
            
            categoryDiv.addEventListener('click', showCoursePopup);
            
            coursesGrid.appendChild(categoryDiv);
        }
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
    });

// Close course popup when close button is clicked
const closePopupBtn = document.getElementById('closePopupBtn');
closePopupBtn.addEventListener('click', () => {
    const coursePopup = document.getElementById('coursePopup');
    coursePopup.style.display = 'none';
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

// Sticky navbar functionality
window.onscroll = function () { stickyNavbar() };

var header = document.querySelector('header');
var logoContainer = document.querySelector('.logo-container');

function stickyNavbar() {
    var scrollPosition = window.pageYOffset;
    var logoContainerHeight = logoContainer.offsetHeight;

    if (scrollPosition >= logoContainerHeight) {
        header.style.position = 'fixed';
        header.style.top = '0';
    } else {
        header.style.position = 'relative';
        header.style.top = 'initial';
    }
}

stickyNavbar();

// Display thumbnail after video ends
document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('santhiVideo');
    video.addEventListener('ended', (e) => {
        video.load();
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const targetPosition = targetSection.offsetTop;
        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollPosition = targetPosition - 90;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section, footer');

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

// Integrate SociableKit Google Reviews widget
function integrateGoogleReviewsWidget() {
    const widgetScript = document.createElement('script');
    widgetScript.src = 'https://widgets.sociablekit.com/google-reviews/widget.js';
    widgetScript.async = true;
    widgetScript.defer = true;
    document.head.appendChild(widgetScript);

    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('sk-ww-google-reviews');
    widgetContainer.setAttribute('data-embed-id', '25382951');

    const reviewsSection = document.getElementById('reviews');
    reviewsSection.appendChild(widgetContainer);
}

integrateGoogleReviewsWidget();
