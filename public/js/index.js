/*
  ///////////////////////////////////////////////

  Profile Dropdown
 
  ///////////////////////////////////////////////
*/

const profile__menu = document.querySelector(".profile__menu");
const profileBtn = document.getElementById("profileBtn");

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Toggle the DropDown Menu and Scale the ProfieBtn
function toggleProfileDropdown(event) {
  event.target.classList.toggle("icon-hover"); // Toggle the icon hover for profileBtn
  event.target.classList.toggle("icon-active"); //Scale the profileBtn
  profile__menu.classList.toggle("profile__menu-active");
}

//Closes Profile Dropdown Menu
function closeProfileDropdown(event) {
  if (event.target.id != "profileBtn") {
    if (profile__menu.classList.contains("profile__menu-active")) {
      profileBtn.classList.remove("icon-active");
      profileBtn.classList.toggle("icon-hover");
      profile__menu.classList.remove("profile__menu-active");
    }
  }
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Adding Click Event on ProfileBtn
profileBtn.addEventListener("click", toggleProfileDropdown);

// Adding Click Event on Document to Close Profile Dropdown
document.addEventListener("click", closeProfileDropdown);

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Simulate a successful form submission (e.g., send data via fetch to server)
  // You can replace this with your actual backend call.
  setTimeout(function() {
    // Simulate form success, show the modal after 1 second
    const modal = document.getElementById("thank-you-modal");
    modal.style.display = "block";  // Show modal

    // Close the modal when the user clicks the close button
    document.querySelector(".close-button").addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Close the modal if the user clicks outside of the modal
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }, 1000);  // Simulate a 1-second delay for server response
});
