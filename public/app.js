// Global Variables for navbar and login auth
const index = document.querySelector("#index");
const about = document.querySelector("#about");
const events = document.querySelector("#events");
const contact = document.querySelector("#contact");
const resources = document.querySelector("#resources");
const admin = document.querySelector("#admin");
const profile = document.querySelector("#profile");

// Bulma Navbar Burger JS for expanding Navbar on click
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

// Function for showing main content when a particular button is clicked
function showPageContent(container) {
  const containers = document.querySelectorAll(".container");
  containers.forEach((c) => {
    if (c == container) {
      c.classList.remove("is-hidden");
    } else {
      c.classList.add("is-hidden");
    }
  });
}

// Insert 'Home' page content
index.addEventListener("click", () => {
  const index_container = document.querySelector("#index_container");
  showPageContent(index_container);
});
// Insert 'About Us' page content
about.addEventListener("click", () => {
  const about_container = document.querySelector("#about_container");
  showPageContent(about_container);
});
// Insert 'Upcoming Events' page content
events.addEventListener("click", () => {
  const events_container = document.querySelector("#events_container");
  showPageContent(events_container);
});
// Insert 'Contact Us' page content
contact.addEventListener("click", () => {
  const contact_container = document.querySelector("#contact_container");
  showPageContent(contact_container);
});
// Insert 'Resources' page content
resources.addEventListener("click", () => {
  const resources_container = document.querySelector("#resources_container");
  showPageContent(resources_container);
});
// Insert 'Attendance' page content
admin.addEventListener("click", () => {
  const admin_container = document.querySelector("#admin_container");
  showPageContent(admin_container);
});
// Insert 'Profile' page content
profile.addEventListener("click", () => {
  const profile_container = document.querySelector("#profile_container");
  showPageContent(profile_container);
});
// Insert 'Admin' page content
admin.addEventListener("click", () => {
  const admin_container = document.querySelector("#admin_container");
  showPageContent(admin_container);
});

// Event listener to handle Google auth
// Source: https://firebase.google.com/docs/auth/web/redirect-best-practices
login.addEventListener("click", async (e) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
});

// *** NAVBAR AND LOGIN AUTH JS
const navbarItems = document.querySelectorAll(".navbar-item");

const homeNavItem = document.querySelector("#index");

homeNavItem.classList.add("active");

navbarItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove the active class from all navbar items
    navbarItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Add the active class to the clicked navbar item
    item.classList.add("active");
  });
});

// Replace Sign-in button with user icon and sign out button
const loginButton = document.getElementById("login");
const signOut = document.getElementById("sign-out");
const signOutBtn = document.getElementById("sign-out-button");
const profilePic = document.getElementById("profile-pic");
const upcomingEventsPage = document.getElementById("events");
const adminPage = document.getElementById("admin");

// Hide upcoming events and admin page initially
upcomingEventsPage.style.display = "none";
adminPage.style.display = "none";

// get a reference to the 'members' collection
const membersCollection = db.collection("members");

// listen for authentication state changes
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // user is signed in
    try {
      // wait for the user data from Firestore
      const doc = await membersCollection.doc(user.uid).get();

      if (!doc.exists) {
        // create a new member document for the user
        await membersCollection.doc(user.uid).set({
          attended_events: [],
          admin: false,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        });
      }

      // check if the user is not an admin
      if (!doc.data().admin) {
        // if user is not an admin, hide the admin page
        adminPage.style.display = "none";
      } else {
        adminPage.style.display = "";
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }

    // update the UI to show the user is signed in
    loginButton.style.display = "none";
    profilePic.src = user.photoURL;
    profilePic.style.display = "";
    signOut.style.display = "";
    upcomingEventsPage.style.display = "";
  } else {
    // user is signed out
    // update the UI to show the user
    // user is signed out
    // update the UI to show the user is signed out
    loginButton.style.display = "";
    profilePic.style.display = "none";
    signOut.style.display = "none";
    upcomingEventsPage.style.display = "none";
    adminPage.style.display = "none";
  }
});

// auth.onAuthStateChanged(async (user) => {
//   if (user) {
//     // user is signed in
//     // check if the user exists in the 'members' collection
//     membersCollection
//       .doc(user.uid)
//       .get()
//       .then((doc) => {
//         if (!doc.exists) {
//           // create a new member document for the user
//           membersCollection.doc(user.uid).set({
//             attended_events: [],
//             admin: false,
//             email: user.email,
//             name: user.displayName,
//             photoURL: user.photoURL,
//           });
//         } else {
//           // check if the user is not an admin
//           if (!doc.data().admin) {
//             // if user is not an admin, hide the admin page
//             adminPage.style.display = "none";
//           } else {
//             adminPage.style.display = "";
//           }
//         }
//       });
//     // update the UI to show the user is signed in
//     loginButton.style.display = "none";
//     profilePic.src = user.photoURL;
//     profilePic.style.display = "";
//     signOut.style.display = "";
//     upcomingEventsPage.style.display = "";
//     adminPage.style.display = "";
//   } else {
//     // user is signed out
//     // update the UI to show the user is signed out
//     loginButton.style.display = "";
//     profilePic.style.display = "none";
//     signOut.style.display = "none";
//     upcomingEventsPage.style.display = "none";
//     adminPage.style.display = "none";
//   }
// });

// handle sign in button click event
loginButton.addEventListener("click", async (e) => {
  try {
    // Use signInWithPopup instead of signInWithRedirect
    const result = await auth.signInWithPopup(provider);
    // The signed-in user info.
    const user = result.user;

    // get a reference to the 'members' collection
    const membersCollection = db.collection("members");

    // check if the user exists in the 'members' collection
    const doc = await membersCollection.doc(user.uid).get();
    if (!doc.exists) {
      // create a new member document for the user
      await membersCollection.doc(user.uid).set({
        attended_events: [],
        admin: false,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
      });
    } else {
      // check if the user is not an admin
      if (!doc.data().admin) {
        // if user is not an admin, hide the admin page
        adminPage.style.display = 'none';
      } else {
        adminPage.style.display = '';
      }
    }

    location.reload();
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = error.credential;
    // ...
  }
});

// loginButton.addEventListener("click", async (e) => {
//   // Use signInWithPopup instead of signInWithRedirect
//   auth
//     .signInWithPopup(provider)
//     .then((result) => {
//       // The signed-in user info.
//       const user = result.user;

//       // get a reference to the 'members' collection
//       const membersCollection = db.collection("members");

//       // check if the user exists in the 'members' collection
//       membersCollection.doc(user.uid).get().then(doc => {
//         if (!doc.exists) {
//           // create a new member document for the user
//           membersCollection.doc(user.uid).set({
//             attended_events: [],
//             admin: false,
//             email: user.email,
//             name: user.displayName,
//             photoURL: user.photoURL
//           });
//         } else {
//           // check if the user is not an admin
//           if (!doc.data().admin) {
//             // if user is not an admin, hide the admin page
//             adminPage.style.display = 'none';
//           } else {
//             adminPage.style.display = '';
//           }
//         }
//       });

//       location.reload();
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email;
//       // The AuthCredential type that was used.
//       const credential = error.credential;
//       // ...
//     });
// });

// handle sign out button click event
signOutBtn.addEventListener("click", () => {
  auth.signOut();
  // let index = document.querySelector("#index");
  // index.click();
  location.reload();
});

// *** HOME PAGE JS
const upcomingEventTile = document.querySelector("#upcoming-event");
const upcomingEventImage = document.querySelector("#upcoming-event-image");
const upcomingEventDate = document.querySelector("#upcoming-event-date");
const upcomingEventButton = document.querySelector("#event-details-button");
const noEventElement = document.querySelector("#no-event-element");
const now = new Date();

db.collection('events')
.where('date', '>', now)
.orderBy('date', 'asc')
.limit(1)
.get()
.then(querySnapshot => {
  if (!querySnapshot.empty) {
    const eventData = querySnapshot.docs[0].data();

      // Update the upcoming event tile with the event data
      upcomingEventImage.style.display = "block";
      upcomingEventDate.style.display = "block";
      upcomingEventButton.style.display = "block";
      noEventElement.style.display = "none";

      upcomingEventImage.src = eventData.image_url;
      upcomingEventDate.textContent += eventData.date.toDate().toLocaleDateString();
    } else {
      // No events found in the database
      upcomingEventImage.style.display = 'none';
      upcomingEventDate.style.display = 'none';
      upcomingEventButton.style.display = 'none';
      noEventElement.style.display = 'block';
    }
  });

const eventDetailsButton = document.querySelector("#event-details-button");

eventDetailsButton.addEventListener("click", async () => {
  try {
    // Fetch the details of the upcoming event from Firestore
    const querySnapshot = await db
      .collection("events")
      .where('date', '>', now)
      .orderBy("date", "asc")
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      const eventData = querySnapshot.docs[0].data();

      // Fetch member details from Firestore
      const memberRefs = eventData.members.map((memberId) => {
        return db.collection("members").doc(memberId);
      });
      const memberDocs = await Promise.all(memberRefs.map((ref) => ref.get()));
      const memberData = memberDocs.map((doc) => doc.data());

      // Build the attendees list HTML
      let attendeesHtml;
      if (memberData.length > 0) {
        attendeesHtml = memberData
          .map(
            (member) => `
          <div class="column is-one-fifth">
            <figure class="image is-32x32">
              <img class="is-rounded" src="${member.photoURL}" alt="Avatar">
            </figure>
          </div>
        `
          )
          .join("");
      } else {
        attendeesHtml = `<p class="ml-3 mt-2 mb-1">Be the first to attend!</p>`;
      }

      // Build the modal HTML with the event and attendance data
      const modalHtml = `
        <div class="modal is-active">
          <div class="modal-background" id="modal"></div>
          <div class="modal-content">
            <div class="box">
              <h1 class="title mb-2">${eventData.name}</h1>
              <p class="has-text-centered">${eventData.description}</p>
              <h2 class="subtitle mb-1 mt-3"><strong>Date: </strong>${eventData.date
                .toDate()
                .toLocaleDateString()}</h2>
              <h2 class="subtitle mb-1"><strong>Number of attendees: </strong>${
                memberData.length
              }</h2>
              <h2 class="subtitle mb-1"><strong>Attending Members:</strong></h2>
              <div class="columns is-multiline mb-0">
                ${attendeesHtml}
              </div>
              <div class="field">
                <label class="label">Attendance Code</label>
                <div class="control">
                  <input id="attendanceCodeInput" class="input" type="text" placeholder="Enter attendance code">
                </div>
                <p id="attendanceStatus" class="help"></p>
                <button id="submitAttendance" class="button is-success is-fullwidth mt-4">Submit Attendance</button>
              </div>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close"></button>
        </div>
      `;

      // Insert the modal HTML into the page
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      // Check if the current user is in the list of attendees
      const currentUser = firebase.auth().currentUser;
      const isAttending = eventData.members.includes(currentUser.uid);

      // Add event listener to the "Submit Attendance" button
      const submitAttendanceButton =
        document.getElementById("submitAttendance");

      //change submit button if user has attended event
      if (isAttending) {
        submitAttendanceButton.textContent = "Event Attended";
        submitAttendanceButton.classList.add("is-light");
        submitAttendanceButton.classList.add("is-static");
      }

      submitAttendanceButton.addEventListener("click", async () => {
        try {
          const attendanceCodeInput = document.getElementById(
            "attendanceCodeInput"
          );
          const attendanceStatus = document.getElementById("attendanceStatus");
          const attendanceCode = attendanceCodeInput.value;

          // Fetch the details of the upcoming event from Firestore
          const querySnapshot = await db
            .collection("events")
            .orderBy("date", "asc")
            .limit(1)
            .get();

          if (!querySnapshot.empty) {
            const eventData = querySnapshot.docs[0].data();

            // Check attendance code against the one in the database
            if (attendanceCode === eventData.attendance_code) {
              // Get the current user's UID
              const currentUserUid = firebase.auth().currentUser.uid;

              // Check if the user is already marked as attending
              if (eventData.members.includes(currentUserUid)) {
                attendanceStatus.innerHTML =
                  '<p id="attendanceStatus" class="help has-text-success">You are already marked as attending for this event!</p>';
                // Hide the message after 3 seconds
                setTimeout(() => {
                  attendanceStatus.innerText = "";
                }, 3000);
                return;
              }

              // Add the user's UID to the members array in the events collection
              await db
                .collection("events")
                .doc(eventData.id)
                .update({
                  members: firebase.firestore.FieldValue.arrayUnion(currentUserUid),
                });

              // Get the current user's document from the members collection
              const userDoc = await db
                .collection("members")
                .doc(currentUserUid)
                .get();
              const userData = userDoc.data();

              // Add the event's DocID to the attended_events array in the user's document
              await db
                .collection("members")
                .doc(currentUserUid)
                .update({
                  attended_events: firebase.firestore.FieldValue.arrayUnion(
                    eventData.id
                  ),
                });

              // Display attendance code validation status
              attendanceStatus.innerText = "Attendance code is correct!";

              // Replace the "Event Details" button with a completed button
              const eventDetailsButton = document.getElementById(
                "event-details-button"
              );
              eventDetailsButton.classList.remove("button");
              eventDetailsButton.classList.add("button", "is-static");
              eventDetailsButton.disabled = true;
              eventDetailsButton.innerText = "Completed!";
            } else {
              attendanceStatus.innerText = "Attendance code is incorrect!";

              // Hide the "Attendance code is incorrect!" message after 3 seconds
              setTimeout(() => {
                attendanceStatus.innerText = "";
              }, 3000);
            }
          }
        } catch (error) {
          console.error(error);
        }
      });

      // Add event listener to the modal background
      const modalBackground = document.querySelector(".modal-background");
      modalBackground.addEventListener("click", () => {
        document.querySelector(".modal").remove();
      });

      // Add event listener to the modal close button
      const modalCloseButton = document.querySelector(".modal-close");
      modalCloseButton.addEventListener("click", () => {
        document.querySelector(".modal").remove();
      });
    }
  } catch (error) {
    console.error(error);
  }
});

var eventsLeftCount = document.getElementById("events-left-count");
var totalMembersCount = document.getElementById("total-club-members-count");
var attendedEventsCount = document.getElementById("events-attended-count");

var eventsLeft = 0;

// Query the Firestore database for the events collection
db.collection("events")
  .get()
  .then(function (querySnapshot) {
    // Loop through the documents in the events collection
    querySnapshot.forEach(function (doc) {
      var eventData = doc.data();
      var eventTimestamp = eventData.date;
      var eventDate = eventTimestamp.toDate();

      // Check if the event date is today or after
      if (eventDate >= new Date()) {
        eventsLeft++;
      }
    });

    // Update the HTML with the queried values
    eventsLeftCount.innerHTML = "<strong>" + eventsLeft + "</strong>";
  });

// Query the Firestore database for the club members collection
db.collection("members")
  .get()
  .then(function (querySnapshot) {
    var totalMembers = querySnapshot.size;

    // Update the HTML with the queried value
    totalMembersCount.innerHTML = "<strong>" + totalMembers + "</strong>";
  });

// Query the Firestore database for the club members collection
db.collection("members")
  .get()
  .then(function (querySnapshot) {
    // Get the document for the current user
    var userDoc = querySnapshot.docs.filter(
      (doc) => doc.id === auth.currentUser.uid
    )[0];
    var userDocData = userDoc.data();
    var attendedEvents = userDocData.attended_events.length;

    // Update the HTML with the queried value
    attendedEventsCount.innerHTML = "<strong>" + attendedEvents + "</strong>";
  });

// *** UPCOMING EVENTS PAGE JS (NEW)
const eventCards = document.getElementById("event_cards");
const upcomingBtn = document.getElementById("upcoming_btn");
const pastBtn = document.getElementById("past_btn");
const currentDate = new Date();

// Create empty list to store card data before date sorting
const cards = [];

async function openEventModal(eventId) {
  // Fetch event details from Firestore
  const eventRef = firebase.firestore().collection("events").doc(eventId);
  const eventDoc = await eventRef.get();
  const eventData = eventDoc.data();

  // Fetch member details from Firestore
  const memberRefs = eventData.members.map((memberId) => {
    return firebase.firestore().collection("members").doc(memberId);
  });
  const memberDocs = await Promise.all(memberRefs.map((ref) => ref.get()));
  const memberData = memberDocs.map((doc) => doc.data());

  // Filter out undefined elements in memberData
  const filteredMemberData = memberData.filter((member) => member);

  if (filteredMemberData.length > 0) {
    attendeesHtml = filteredMemberData
      .map(
        (member) => `
      <div class="column is-one-fifth">
        <img src="${member.photoURL}" alt="Avatar">
        <p>${member.name}</p>
      </div>
    `
      )
      .join("");
  } else {
    attendeesHtml = `<p class="ml-3 mt-2 mb-1">Be the first to attend!</p>`;
  }

  // Build modal HTML with event and member data
  const modalHtml = `
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h1 class="title mb-2">${eventData.name}</h1>
        <p class="has-text-centered">${eventData.description}</p>
        <h2 class="subtitle mb-1 mt-3"><strong>Date: </strong>${eventData.date
          .toDate()
          .toLocaleDateString()}</h2>
        <h2 class="subtitle mb-1"><strong>Number of attendees: </strong><span id="numberOfAttendees">${
          memberData.length
        }</span></h2>
        <h2 class="subtitle mb-1"><strong>Attending Members:</strong></h2>
        <div id="attendingMembers" class="columns is-multiline mb-0">
          ${
            filteredMemberData.length > 0
              ? filteredMemberData
                  .map(
                    (member) => `
            <div class="column is-one-fifth">
                <figure class="image is-32x32">
                  <img class="is-rounded" src="${member.photoURL}" alt="Avatar">
                </figure>
              </a>
            </div>
          `
                  )
                  .join("")
              : `
          <div class="column is-full">
            <p id="beFirstToAttend">Be the first to attend!</p>
          </div>
          `
          }
        </div>
        <div class="field">
          <label class="label">Attendance Code</label>
          <div class="control">
            <input id="attendanceCodeInput" class="input" type="text" placeholder="Enter attendance code">
          </div>
          <p id="attendanceStatus" class="help"></p>
          <button id="submitAttendance" class="button is-success is-fullwidth mt-4">Submit Attendance</button>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
  `;

  // Add modal HTML to the page
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Check if the current user is in the list of attendees
  const currentUser = firebase.auth().currentUser;
  const isAttending = eventData.members.includes(currentUser.uid);

  // Add event listener to the "Submit Attendance" button
  const submitAttendanceButton = document.getElementById("submitAttendance");

  //change submit button if user has attended event
  if (isAttending) {
    submitAttendanceButton.textContent = "Event Attended";
    submitAttendanceButton.classList.add("is-light");
    submitAttendanceButton.classList.add("is-static");
  }

  submitAttendanceButton.addEventListener("click", async () => {
    const attendanceCodeInput = document.getElementById("attendanceCodeInput");
    const attendanceStatus = document.getElementById("attendanceStatus");
    const attendanceCode = attendanceCodeInput.value;

    // Fetch event details from Firestore
    const eventRef = firebase.firestore().collection("events").doc(eventId);
    const eventDoc = await eventRef.get();
    const eventData = eventDoc.data();

    // Check attendance code against the one in the database
    if (attendanceCode === eventData.attendance_code) {
      // Get the current user's UID
      const currentUserUid = firebase.auth().currentUser.uid;

      // Check if the user is already marked as attending
      if (eventData.members.includes(currentUserUid)) {
        attendanceStatus.innerHTML =
          '<p id="attendanceStatus" class="help has-text-success">You are already marked as attending for this event!</p>';
        // Hide the message after 3 seconds
        setTimeout(() => {
          attendanceStatus.innerText = "";
        }, 3000);
        return;
      }

      // Add the user's UID to the members array in the events collection
      await eventRef.update({
        members: firebase.firestore.FieldValue.arrayUnion(currentUserUid),
      });

      // Get the current user's document from the members collection
      const userRef = firebase
        .firestore()
        .collection("members")
        .doc(currentUserUid);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      // Add the event's DocID to the attended_events array in the user's document
      await userRef.update({
        attended_events: firebase.firestore.FieldValue.arrayUnion(eventId),
      });

      // Update the number of attendees
      const numberOfAttendees = document.getElementById("numberOfAttendees");
      numberOfAttendees.innerText = parseInt(numberOfAttendees.innerText) + 1;

      // Update the attending members section
      const attendingMembers = document.getElementById("attendingMembers");
      const beFirstToAttend = document.getElementById("beFirstToAttend");
      const newAttendeeHtml = `
        <div class="column is-one-fifth" style="padding-left: 0; padding-right: 0">
          <figure class="image is-32x32">
            <img class="is-rounded" src="${userData.photoURL}" alt="Avatar">
          </figure>
        </div>
      `;
      if (beFirstToAttend) {
        beFirstToAttend.insertAdjacentHTML("afterend", newAttendeeHtml);
        beFirstToAttend.remove();
      } else {
        attendingMembers.insertAdjacentHTML("beforeend", newAttendeeHtml);
      }

      // Display attendance code validation status
      attendanceStatus.innerHTML =
        '<p id="attendanceStatus" class="help has-text-success">Attendance Code is Correct! See you soon!</p>';
      setTimeout(() => {
        attendanceStatus.innerText = "";
      }, 3000);

      // Replace the "Event Details" button with a completed button
      eventDetailsButton.classList.remove("button");
      eventDetailsButton.classList.add("button", "is-static");
      eventDetailsButton.disabled = true;
      eventDetailsButton.innerText = "Completed!";
    } else {
      attendanceStatus.innerText = "Attendance code is incorrect!";

      // Hide the "Attendance code is incorrect!" message after 3 seconds
      setTimeout(() => {
        attendanceStatus.innerText = "";
      }, 3000);
    }
  });

  // Add event listener to the modal background
  const modalBackground = document.querySelector(".modal-background");
  modalBackground.addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });

  // Add event listener to the modal close button
  const modalCloseButton = document.querySelector(".modal-close");
  modalCloseButton.addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });
}

db.collection("events")
  .get()
  .then((querySnapshot) => {
    // Gather card data from the db and add it to the 'cards' list
    querySnapshot.forEach((doc) => {
      const eventData = doc.data();

      const card = {
        id: doc.id,
        name: eventData.name,
        date: eventData.date.toDate(),
        image_url: eventData.image_url,
        description: eventData.description,
        members: eventData.members,
      };

      cards.push(card);
    });

    // Sort the cards by date
    cards.sort((a, b) => a.date - b.date);

    // Function to filter the cards based on the button clicked
    function filterCards(filterType) {
      const currentDate = new Date();
      eventCards.innerHTML = "";

      cards.forEach((card) => {
        // Check if the card should be included based on the filter type
        if (filterType === "upcoming" && card.date >= currentDate) {
          createCard(card);
        } else if (filterType === "past" && card.date < currentDate) {
          createCard(card);
        }
      });
    }

    // Function to create a new element for each card
    function createCard(card) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("column", "is-one-third");
      cardElement.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-3by1">
            <img src="${card.image_url}" alt="No Image" class="cover-image">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-4">${card.name}</p>
          <p class="subtitle is-6">Date: ${card.date.toLocaleDateString()}</p>
          <button class="button is-info is-fullwidth">Event Details</button>
        </div>
      </div>
    `;

      // select the button element and add a red background
      let buttonElement = cardElement.querySelector(".button");
      buttonElement.style.backgroundColor = "#e95861";

      // Add the event ID as a data attribute to the "Event Details" button
      const eventDetailsButton = cardElement.querySelector(".button");
      eventDetailsButton.dataset.eventId = card.id;

      eventCards.appendChild(cardElement);
    }

    // Initial load: filter cards by upcoming events
    filterCards("upcoming");

    // Add event listeners to the filter buttons
    upcomingBtn.addEventListener("click", () => {
      filterCards("upcoming");
    });

    pastBtn.addEventListener("click", () => {
      filterCards("past");
    });

    // Add a single event listener to the event cards container for event delegation
    eventCards.addEventListener('click', (e) => {
      if (e.target.classList.contains('button')) {
        // Get the event ID from the data attribute and call the openEventModal function
        const eventId = e.target.dataset.eventId;
        openEventModal(eventId);
      }
    });
  })
  .catch(error => {
    // console.error(error);
  });

// ***PROFILE PAGE JS
// add an event listener to the profile picture element
profilePic.addEventListener("click", () => {
  // get the currently signed-in user
  const user = auth.currentUser;
  // get a reference to the user's document in the 'members' collection
  const userDocRef = db.collection("members").doc(user.uid);
  // fetch the user's data from the document
  userDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // if the user document exists, populate the profile page with their data
        const userData = doc.data();
        // set the profile icon
        document.getElementById("profile-icon").src = userData.photoURL;
        // set the profile name
        document.getElementById("profile-name").textContent = userData.name;
        // set the profile email
        document.getElementById(
          "profile-email"
        ).innerHTML = `<strong>Email: </strong>${userData.email}`;
        // set the profile role
        document.getElementById(
          "profile-role"
        ).innerHTML = `<strong>Club Role: </strong> ${
          userData.admin ? "Admin" : "Member"
        }`;
        // set the attendance total
        document.getElementById(
          "attendance-total"
        ).innerHTML = `<strong>Attendance Total: </strong> ${userData.attended_events.length}`;
        // clear the table of attended events
        const attendedEventsTableBody = document
          .getElementById("attended-events-table")
          .getElementsByTagName("tbody")[0];
        attendedEventsTableBody.innerHTML = "";
        // populate the table of attended events
        userData.attended_events.forEach((eventId) => {
          // get a reference to the attended event document
          const eventDocRef = db.collection("events").doc(eventId);
          // fetch the attended event data from the document
          eventDocRef
            .get()
            .then((eventDoc) => {
              if (eventDoc.exists) {
                // if the attended event document exists, add a row to the table with the event data
                const eventData = eventDoc.data();
                const attendedEventTableRow =
                  attendedEventsTableBody.insertRow(-1);
                const attendedEventNameCell =
                  attendedEventTableRow.insertCell(0);
                const attendedEventDateCell =
                  attendedEventTableRow.insertCell(1);
                attendedEventNameCell.textContent = eventData.name;
                attendedEventDateCell.textContent = eventData.date
                  .toDate()
                  .toLocaleDateString();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        });
        // show the profile page
        document
          .getElementById("profile_container")
          .classList.remove("is-hidden");
        // hide the other pages
        document.getElementById("events_container").classList.add("is-hidden");
      } else {
        console.error(`User document with UID ${user.uid} does not exist.`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// ***ADMIN PAGE JS
// Variables for Admin sub-pages
const eventManagement = document.getElementById("event_management");
const attendanceMetrics = document.getElementById("attendance_metrics");
const viewAllUsers = document.getElementById("view_all_users");
const memberFeedback = document.getElementById("member_feedback");

// Insert 'Event Management' page content
eventManagement.addEventListener("click", () => {
  const event_management_container = document.querySelector(
    "#event_management_container"
  );
  fetchEventData();
  showPageContent(event_management_container);
});

// Insert 'Attendance Metrics' page content
attendanceMetrics.addEventListener("click", () => {
  const attendance_metrics_container = document.querySelector(
    "#attendance_metrics_container"
  );
  createEventAttendanceChart(db, "eventAttendanceChart");
  showPageContent(attendance_metrics_container);
});

// Insert 'View All Users' page content
viewAllUsers.addEventListener("click", () => {
  const view_all_users_container = document.querySelector(
    "#view_all_users_container"
  );
  fetchUserData();
  showPageContent(view_all_users_container);
});

// Insert 'Member Feedback' page content
memberFeedback.addEventListener("click", () => {
  const member_feedback_container = document.querySelector(
    "#member_feedback_container"
  );
  showPageContent(member_feedback_container);
});

const backButton = document.querySelectorAll(".back_btn");

backButton.forEach((button) => {
  button.addEventListener("click", () => {
    showPageContent(admin_container);
  });
});

// ***CONTACT US PAGE JS
// Adding form to collection when submit
document.querySelector("#contact-form").addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the name, email, and message fields
  const name = document.querySelector("#contact-name").value;
  const email = document.querySelector("#contact-email").value;
  const message = document.querySelector("#contact-message").value;

  // Save the data to the Firestore collection
  db.collection("contacts")
    .add({
      name: name,
      email: email,
      message: message,
    })
    .then(function (docRef) {
      // Clear the form fields after the data is successfully saved
      document.querySelector("#contact-form").reset();
      alert("Your message has been sent!");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
      alert("Please sign in to send a message.");
    });
});

// Get a reference to the Firestore collection
const contactCollection = db.collection("contacts");

// Function to create a row for each document in the collection
function createRow(doc) {
  const contactList = document.getElementById("contactList");

  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = doc.data().name;
  row.appendChild(nameCell);

  const emailCell = document.createElement("td");
  emailCell.textContent = doc.data().email;
  row.appendChild(emailCell);

  const messageCell = document.createElement("td");
  messageCell.textContent = doc.data().message;
  row.appendChild(messageCell);

  const deleteButtonCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.className = "button is-danger is-light";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    // Delete the document from the collection and remove the row from the DOM
    contactCollection
      .doc(doc.id)
      .delete()
      .then(function () {
        row.remove();
      })
      .catch(function (error) {
        console.error("Error deleting document: ", error);
        alert("There was an error deleting the message. Please try again later.");
      });
  });
  deleteButtonCell.appendChild(deleteButton);
  row.appendChild(deleteButtonCell);

  contactList.appendChild(row);
}

// Function to get all documents from the collection and create rows for each one
function getAllContacts() {
  contactCollection
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        createRow(doc);
      });
    })
    .catch(function (error) {
      console.error("Error getting documents: ", error);
    });
}

// Call the function to get all contacts on page load
getAllContacts();

// ***EVENT ATTENDANCE CHART JS
function createEventAttendanceChart(dbRef, chartId) {
  const query = db.collection("events").orderBy("date", "desc").limit(10);

  return query.get().then((querySnapshot) => {
    // Process the data returned from the database
    const data = {
      labels: [], // event names will go here
      datasets: [
        {
          label: "Event Attendance",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          data: [], // number of attendees will go here
        },
      ],
    };

    querySnapshot.forEach((doc) => {
      const event = doc.data();
      data.labels.unshift(event.name); // Add event name to start of labels array
      data.datasets[0].data.unshift(event.members.length); // Add attendee count to start of data array
    });

    // Check if a Chart.js instance already exists for the specified chart ID
    const existingChart = Chart.getChart(chartId);
    if (existingChart) {
      existingChart.destroy();
    }

    // Create a new Chart.js bar chart object
    const ctx = document.getElementById(chartId).getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Event Attendance",
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Event Name",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Number of Attendees",
              },
            },
          ],
        },
      },
    });

    return chart;
  });
}

// ***VIEW ALL USERS JS
function fetchUserData() {
  db.collection("members")
    .get()
    .then((querySnapshot) => {
      const userList = document.getElementById('userList');
      userList.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        const row = document.createElement("tr");
        row.addEventListener("click", () => fetchAttendedEvents(doc.id));

        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const adminCell = document.createElement('td');
        const adminSelect = document.createElement('select');
        const yesOption = document.createElement('option');
        yesOption.value = 'yes';
        yesOption.textContent = 'Yes';
        adminSelect.appendChild(yesOption);

        const noOption = document.createElement('option');
        noOption.value = 'no';
        noOption.textContent = 'No';
        adminSelect.appendChild(noOption);

        adminSelect.value = user.admin ? 'yes' : 'no';
        adminSelect.addEventListener('change', () => {
          updateUserAdminStatus(doc.id, adminSelect.value === 'yes');
        });

        // Add the click event listener to stop event propagation
        adminSelect.addEventListener('click', (event) => {
          event.stopPropagation();
        });

        adminCell.appendChild(adminSelect);
        row.appendChild(adminCell);

        userList.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

async function updateUserAdminStatus(userId, isAdmin) {
  try {
    await db.collection('members').doc(userId).update({
      admin: isAdmin,
    });
    console.log(`User ${userId} admin status updated to: ${isAdmin}`);
  } catch (error) {
    console.error('Error updating user admin status:', error);
  }
}

async function fetchAttendedEvents(userId) {
  try {
    const memberDoc = await db.collection("members").doc(userId).get();

    if (memberDoc.exists) {
      const attendedEventsList = memberDoc.data().attended_events;

      // Build the basic structure of the modal HTML
      const modalHtml = `
        <div class="modal is-active" id="eventsModal">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="box">
              <h3 class="title is-4">Attended Events</h3>
              <ul id="attendedEvents"></ul>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close"></button>
        </div>
      `;

      // Insert the modal HTML into the page
      document.body.insertAdjacentHTML("beforeend", modalHtml);

      const eventsModal = document.getElementById('eventsModal');

      // Add event listener to the modal background
      const modalBackground = eventsModal.querySelector(".modal-background");
      modalBackground.addEventListener("click", () => {
        eventsModal.remove();
      });

      // Add event listener to the modal close button
      const modalCloseButton = eventsModal.querySelector(".modal-close");
      modalCloseButton.addEventListener("click", () => {
        eventsModal.remove();
      });

      const attendedEvents = document.getElementById('attendedEvents');

      if (attendedEventsList.length === 0) {
        attendedEvents.innerText = "Member hasn't attended any events";
      } else {
        for (const eventId of attendedEventsList) {
          const eventDoc = await db.collection('events').doc(eventId).get();

          if (eventDoc.exists) {
            const event = eventDoc.data();

            const listItem = document.createElement('li');
            listItem.textContent = `${event.name} (${event.date.toDate().toLocaleDateString()})`;
            attendedEvents.appendChild(listItem);
          } else {
            console.error(`No such event with ID: ${eventId}`);
          }
        }
      }
    } else {
      console.error("No such member document!");
    }
  } catch (error) {
    console.error("Error fetching attended events:", error);
  }
};

// ***EVENT MANAGEMENT JS
function fetchEventData() {
  db.collection("events")
    .get()
    .then((querySnapshot) => {
      const eventList = document.getElementById('eventList');
      eventList.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        const row = document.createElement("tr");
        row.addEventListener("click", () => fetchEventAttendees(doc.id));

        const nameCell = document.createElement("td");
        nameCell.textContent = eventData.name;
        row.appendChild(nameCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = eventData.date.toDate().toLocaleDateString(); // Convert Firestore Timestamp to JavaScript Date and then to string
        row.appendChild(dateCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = eventData.description;
        row.appendChild(descriptionCell);

        const attendanceCodeCell = document.createElement("td");
        attendanceCodeCell.textContent = eventData.attendance_code;

        // Append attendance code cell to row
        row.appendChild(attendanceCodeCell);

        // Create actions cell
        const actionsCell = document.createElement("td");

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'button custom-warning ml-0';
        editButton.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent the click event from bubbling up to the row

          // Build the basic structure of the edit modal HTML
          const editModalHtml = `
            <div class="modal is-active" id="editEventModal">
              <div class="modal-background"></div>
              <div class="modal-content">
                <div class="box">
                  <h3 class="title is-4">Edit Event</h3>
                  <form id="editEventForm">
                    <div class="field">
                      <label class="label">Name</label>
                      <div class="control">
                        <input class="input" type="text" id="editEventName" value="${eventData.name}">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Date</label>
                      <div class="control">
                      <input class="input" type="date" id="editEventDate" value="${eventData.date ? eventData.date.toDate().toISOString().split('T')[0] : ''}">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                        <textarea class="textarea" id="editEventDescription">${eventData.description}</textarea>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Attendance Code</label>
                      <div class="control">
                        <input class="input" type="text" id="editEventAttendanceCode" value="${eventData.attendance_code}">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Image</label>
                      <div class="control">
                        <input class="input" type="file" id="editEventImage">
                      </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                      <div class="control">
                        <button class="button is-primary">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button class="modal-close is-large" aria-label="close"></button>
            </div>
          `;

          // Insert the edit modal HTML into the page
          document.body.insertAdjacentHTML("beforeend", editModalHtml);

          // Add event listeners to the modal close button and modal background
          const editEventModal = document.getElementById('editEventModal');
          editEventModal.querySelector('.modal-background').addEventListener('click', () => editEventModal.remove());
          editEventModal.querySelector('.modal-close').addEventListener('click', () => editEventModal.remove());

          // Add event listener to the form submit event
          const editEventForm = document.getElementById('editEventForm');
          editEventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updateEventInFirebase(doc.id);
            editEventModal.remove();
          });
        });
        actionsCell.appendChild(editButton);

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = 'button is-danger is-light ml-2';
        deleteButton.addEventListener("click", () => deleteEvent(doc.id));
        actionsCell.appendChild(deleteButton);

        // Append the actions cell to the row
        row.appendChild(actionsCell);
        
        eventList.appendChild(row);
        
      });
    })
    .catch((error) => {
      console.error("Error fetching event data:", error);
    });
}

// ***EVENT MANAGEMENT JS
async function saveEventToFirebase() {
  // Get form values
  const name = document.getElementById('eventName').value;
  const date = document.getElementById('eventDate').value;
  const description = document.getElementById('eventDescription').value;
  const attendanceCode = document.getElementById('eventAttendanceCode').value;
  const eventImage = document.getElementById('eventImage').files[0]; // This is a File object

  // Parse date string to a JavaScript Date object
  let jsDate = new Date(date);
  // Add one day to the date object
  jsDate.setDate(jsDate.getDate() + 1);

  // Check if an image was uploaded
  if (eventImage) {
    // Unique image name
    let image = new Date() + "__" + eventImage.name;

    // Upload image to Firebase Storage
    const task = ref.child(image).put(eventImage);

    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(imageUrl => {
        // Once the image URL is obtained, save the rest of the form data to Firestore
        db.collection('events').add({
          name: name,
          date: new firebase.firestore.Timestamp.fromDate(new Date(jsDate)),
          description: description,
          attendance_code: attendanceCode,
          image_url: imageUrl,
          members: [] // Initialize with empty array
        })
        .then((docRef) => {
          console.log("Event document written with ID: ", docRef.id);

          fetchEventData();
        })
        .catch((error) => {
          console.error("Error adding event document: ", error);
        });
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  } else {
    // No image was uploaded, save the rest of the form data to Firestore
    db.collection('events').add({
      name: name,
      date: new firebase.firestore.Timestamp.fromDate(new Date(jsDate)),
      description: description,
      attendance_code: attendanceCode,
      members: [] // Initialize with empty array
    })
    .then((docRef) => {
      console.log("Event document written with ID: ", docRef.id);

      fetchEventData();
    })
    .catch((error) => {
      console.error("Error adding event document: ", error);
    });
  }
}



function createEventModal() {
  // Build the basic structure of the modal HTML
  const modalHtml = `
    <div class="modal is-active" id="eventModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Event</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form id="eventForm">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" id="eventName">
              </div>
            </div>
            <div class="field">
              <label class="label">Date</label>
              <div class="control">
                <input class="input" type="date" id="eventDate">
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea class="textarea" id="eventDescription"></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Attendance Code</label>
              <div class="control">
                <input class="input" type="text" id="eventAttendanceCode">
              </div>
            </div>
            <div class="field">
              <label class="label">Image URL</label>
              <div class="control">
                <input class="input" type="file" id="eventImage">
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" id="saveEvent">Save changes</button>
          <button class="button" id="cancelEvent">Cancel</button>
        </footer>
      </div>
    </div>
  `;

  // Insert the modal HTML into the page
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const eventModal = document.getElementById('eventModal');

  // Add event listener to the modal background and close button
  eventModal.querySelector(".modal-background").addEventListener("click", () => {
    eventModal.remove();
  });

  eventModal.querySelector(".delete").addEventListener("click", () => {
    eventModal.remove();
  });

  // Hide the modal when the "Save changes" or "Cancel" button is clicked
  document.getElementById('saveEvent').addEventListener('click', function() {
    saveEventToFirebase();
    eventModal.remove();
  });

  document.getElementById('cancelEvent').addEventListener('click', function() {
    eventModal.remove();
  });
}

// Show the modal when the "Create Event" button is clicked
document.querySelector('.custom-danger.has-text-white.mb-4.is-centered').addEventListener('click', createEventModal);

async function openEditEventModal(eventId) {
  const eventDoc = await db.collection("events").doc(eventId).get();
  
  if (eventDoc.exists) {
    const event = eventDoc.data();

    // Use the event data to prefill the fields in the edit event modal
    document.getElementById('editEventName').value = event.name;
    document.getElementById('editEventDate').value = event.date.toDate().toISOString().substr(0, 10); // Convert Firestore Timestamp to JavaScript Date and then to ISO string
    document.getElementById('editEventDescription').value = event.description;
    document.getElementById('editEventAttendanceCode').value = event.attendance_code;
    document.getElementById('editEventImageUrl').value = event.image_url;

    // Open the edit event modal
    // ...code to open the modal...
  } else {
    console.error("No such event document!");
  }
}

async function deleteEvent(eventId) {
  if (confirm("Are you sure you want to delete this event?")) {
    db.collection("events").doc(eventId).delete()
      .then(() => {
        console.log("Event successfully deleted!");

        // Call fetchEventData() to update the list
        fetchEventData();
      })
      .catch((error) => {
        console.error("Error removing event: ", error);
      });
  }
}

async function updateEventInFirebase(eventId) {
  // Get form values
  const name = document.getElementById('editEventName').value;
  const date = document.getElementById('editEventDate').value;
  const description = document.getElementById('editEventDescription').value;
  const attendanceCode = document.getElementById('editEventAttendanceCode').value;
  const eventImage = document.getElementById('editEventImage').files[0]; // This is a File object

  // Parse date string to a JavaScript Date object
  let jsDate = new Date(date);
  // Add one day to the date object
  jsDate.setDate(jsDate.getDate() + 1);
  
  if (eventImage) {
    let image = new Date() + "__" + eventImage.name; // Create a unique image name
    const task = ref.child(image).put(eventImage); // Upload image to Firebase Storage
    
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(imageUrl => {
        // Update in Firestore
        db.collection('events').doc(eventId).update({
          name: name,
          date: new firebase.firestore.Timestamp.fromDate(jsDate),
          description: description,
          attendance_code: attendanceCode,
          image_url: imageUrl,
        })
        .then(() => {
          console.log("Event document successfully updated!");

          // Call fetchEventData() to update the list
          fetchEventData();
        })
        .catch((error) => {
          console.error("Error updating event document: ", error);
        });
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  } else {
    // Update in Firestore without image
    db.collection('events').doc(eventId).update({
      name: name,
      date: new firebase.firestore.Timestamp.fromDate(jsDate),
      description: description,
      attendance_code: attendanceCode,
    })
    .then(() => {
      console.log("Event document successfully updated!");

      // Call fetchEventData() to update the list
      fetchEventData();
    })
    .catch((error) => {
      console.error("Error updating event document: ", error);
    });
  }
}

