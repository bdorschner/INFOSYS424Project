// Global Variables
const index = document.querySelector('#index');
const about = document.querySelector('#about');
const events = document.querySelector('#events');
const contact = document.querySelector('#contact');
const resources = document.querySelector('#resources');
const attendance = document.querySelector('#attendance');

// Bulma Navbar Burger JS for expanding Navbar on click
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });

// Function for showing main content when a particular button is clicked
function showPageContent(container) {
    const containers = document.querySelectorAll('.container');
    containers.forEach((c) => {
      if (c == container) {
        c.classList.remove('is-hidden');
      } else {
        c.classList.add('is-hidden');
      }
    });
}

// Insert 'Home' page content
index.addEventListener('click', () => {
    const index_container = document.querySelector('#index_container');
    showPageContent(index_container);
})
// Insert 'About Us' page content
about.addEventListener('click', () => {
    const about_container = document.querySelector('#about_container');
    showPageContent(about_container);
})
// Insert 'Upcoming Events' page content
events.addEventListener('click', () => {
    const events_container = document.querySelector('#events_container');
    showPageContent(events_container);
})
// Insert 'Contact Us' page content
contact.addEventListener('click', () => {
    const contact_container = document.querySelector('#contact_container');
    showPageContent(contact_container);
})
// Insert 'Resources' page content
resources.addEventListener('click', () => {
    const resources_container = document.querySelector('#resources_container');
    showPageContent(resources_container);
})
// Insert 'Attendance' page content
attendance.addEventListener('click', () => {
    const attendance_container = document.querySelector('#attendance_container');
    showPageContent(attendance_container);
})