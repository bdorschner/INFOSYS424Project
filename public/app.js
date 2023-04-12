// Global Variables
const index = document.querySelector('#index');
const about = document.querySelector('#about');
const events = document.querySelector('#events');
const contact = document.querySelector('#contact');
const resources = document.querySelector('#resources');
const attendance = document.querySelector('#attendance');
const profile = document.querySelector('#profile');

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
// Insert 'Profile' page content
profile.addEventListener('click', () => {
  const profile_container = document.querySelector('#profile_container');
  showPageContent(profile_container);
})

// Event listener to handle redirecting to Google auth
login.addEventListener('click', (e) => {
  signInWithRedirect(auth, provider);

  // Redirect to another page
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      
  });
})

// *** NAVBAR AND LOGIN AUTH JS
const navbarItems = document.querySelectorAll('.navbar-item');

const homeNavItem = document.querySelector('#index');

homeNavItem.classList.add('active');

navbarItems.forEach(item => {
item.addEventListener('click', () => {
  // Remove the active class from all navbar items
  navbarItems.forEach(item => {
    item.classList.remove('active');
  });

  // Add the active class to the clicked navbar item
  item.classList.add('active');
});
});

// Replace Sign-in button with user icon and sign out button
const loginButton = document.getElementById('login');
const signOut = document.getElementById('sign-out');
const signOutBtn = document.getElementById('sign-out-button');
const profilePic = document.getElementById('profile-pic');
const upcomingEventsPage = document.getElementById('events');
const attendanceHistoryPage = document.getElementById('attendance');

// Hide upcoming events and attendance history page initially
upcomingEventsPage.style.display = 'none';
attendanceHistoryPage.style.display = 'none';

// get a reference to the 'members' collection
const membersCollection = db.collection('members');

// listen for authentication state changes
auth.onAuthStateChanged(user => {
if (user) {
  // user is signed in
  // check if the user exists in the 'members' collection
  membersCollection.doc(user.uid).get().then(doc => {
    if (!doc.exists) {
      // create a new member document for the user
      membersCollection.doc(user.uid).set({
        attendance_total: 0,
        attended_events: [],
        admin: false,
        email: user.email,
        name: user.displayName
      });
    } else {
      // check if the user is not an admin
      if (!doc.data().admin) {
        // if user is not an admin, hide the attendance history page
        attendanceHistoryPage.style.display = 'none';
      }
    }
  });
  // update the UI to show the user is signed in
  loginButton.style.display = 'none';
  profilePic.src = user.photoURL;
  profilePic.style.display = '';
  signOut.style.display = '';
  upcomingEventsPage.style.display = '';
  attendanceHistoryPage.style.display = '';
} else {
  // user is signed out
  // update the UI to show the user is signed out
  loginButton.style.display = '';
  profilePic.style.display = 'none';
  signOut.style.display = 'none';
  upcomingEventsPage.style.display = 'none';
  attendanceHistoryPage.style.display = 'none';
}
});

// handle sign in button click event
loginButton.addEventListener('click', () => {
auth.signInWithRedirect(provider);
});

// handle sign out button click event
signOutBtn.addEventListener('click', () => {
auth.signOut();
});

// *** HOME PAGE JS
const upcomingEventTile = document.querySelector('#upcoming-event');
const upcomingEventImage = document.querySelector('#upcoming-event-image');
const upcomingEventDate = document.querySelector('#upcoming-event-date');

db.collection('events')
.orderBy('date', 'asc')
.limit(1)
.get()
.then(querySnapshot => {
  if (!querySnapshot.empty) {
    const eventData = querySnapshot.docs[0].data();

    // Update the upcoming event tile with the event data
    upcomingEventImage.src = eventData.image_url;
    upcomingEventDate.textContent += eventData.date.toDate().toLocaleDateString();
  } else {
    // No events found in the database
    upcomingEventTile.style.display = 'none';
  }
})
.catch(error => {
  console.error(error);
  upcomingEventTile.style.display = 'none';
});

// *** UPCOMING EVENTS PAGE JS
const eventCards = document.getElementById('event_cards');

// Create empty list to store card data before date sorting
const cards = [];

db.collection('events').get().then(querySnapshot => {
// Gather card data from the db and add it to the 'cards' list
  querySnapshot.forEach(doc => {
    const eventData = doc.data();

    const card = {
      name: eventData.name,
      date: eventData.date.toDate(),
      image_url: eventData.image_url,
      description: eventData.description
    };

    cards.push(card);
  });

  // Sort the cards by date
  cards.sort((a, b) => a.date - b.date);

  // Loop through the sorted cards and create a new element for each card
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('column', 'is-one-third');
    cardElement.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-3by1">
            <img src="${card.image_url}" alt="Event Image" class="cover-image">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-4">${card.name}</p>
          <p class="subtitle is-6">Date: ${card.date.toLocaleDateString()}</p>
          <div class="content">
            ${card.description}
          </div>
          <button class="button is-info is-fullwidth">Event Details</button>
        </div>
      </div>
    `;

    eventCards.appendChild(cardElement);
  });
})
.catch(error => {
  console.error(error);
});

// ***PROFILE PAGE JS
// add an event listener to the profile picture element
profilePic.addEventListener('click', () => {
  // get the currently signed-in user
  const user = auth.currentUser;
  // get a reference to the user's document in the 'members' collection
  const userDocRef = db.collection('members').doc(user.uid);
  // fetch the user's data from the document
  userDocRef.get().then((doc) => {
    if (doc.exists) {
      // if the user document exists, populate the profile page with their data
      const userData = doc.data();
      // set the profile icon
      document.getElementById('profile-icon').src = user.photoURL;
      // set the profile name
      document.getElementById('profile-name').textContent = userData.name;
      // set the profile email
      document.getElementById('profile-email').innerHTML = `<strong>Email: </strong>${userData.email}`;
      // set the profile role
      document.getElementById('profile-role').innerHTML = `<strong>Club Role: </strong> ${userData.admin ? 'Admin' : 'Member'}`;
      // set the attendance total
      document.getElementById('attendance-total').innerHTML = `<strong>Attendance Total: </strong> ${userData.attendance_total}`;
      // clear the table of attended events
      const attendedEventsTableBody = document.getElementById('attended-events-table').getElementsByTagName('tbody')[0];
      attendedEventsTableBody.innerHTML = '';
      // populate the table of attended events
      userData.attended_events.forEach((eventId) => {
        // get a reference to the attended event document
        const eventDocRef = db.collection('events').doc(eventId);
        // fetch the attended event data from the document
        eventDocRef.get().then((eventDoc) => {
          if (eventDoc.exists) {
            // if the attended event document exists, add a row to the table with the event data
            const eventData = eventDoc.data();
            const attendedEventTableRow = attendedEventsTableBody.insertRow(-1);
            const attendedEventNameCell = attendedEventTableRow.insertCell(0);
            const attendedEventDateCell = attendedEventTableRow.insertCell(1);
            attendedEventNameCell.textContent = eventData.name;
            attendedEventDateCell.textContent = eventData.date.toDate().toLocaleDateString();
          }
        }).catch((error) => {
          console.error(error);
        });
      });
      // show the profile page
      document.getElementById('profile_container').classList.remove('is-hidden');
      // hide the other pages
      document.getElementById('events_container').classList.add('is-hidden');
      document.getElementById('attendance_container').classList.add('is-hidden');
    } else {
      console.error(`User document with UID ${user.uid} does not exist.`);
    }
  }).catch((error) => {
    console.error(error);
  });
});