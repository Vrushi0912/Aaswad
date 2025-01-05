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

/*
  ///////////////////////////////////////////////

  Functions to Fetch Cart Count and Post Cart
 
  ///////////////////////////////////////////////
*/

let addBtns = null;

/*
  -----------------------------------------------
  Get Cart Count Request
  -----------------------------------------------
*/
async function cartCount() {
  const url = `${location.origin}/cart/count`;
  const cart = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    // body: JSON.stringify({}), //No Body Or Payload B'coz its a Get Request
  });
  const response = await cart.json();
  const count = +response.items.length;
  //Selecting Cart Count Span Element
  const countSpan = document.getElementById("cartCount");
  countSpan.innerHTML = count;
  return;
}

/*
  -----------------------------------------------
  Post Cart Request Or Add to Cart
  -----------------------------------------------
*/

async function postCart(id) {
  const url = `${location.origin}/cart/${id}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // The content to update
    body: JSON.stringify({}), //No Body Or Payload
  });
  cartCount(); //Updating Cart Count
  return;
}

/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//Change + Sign to Tick Sign After Item Added to Cart
function changetoTick(event) {
  event.target.innerHTML = "&check;";
  event.target.classList.add("item__ticked");
  return;
}

//Cart Add Function
async function cartAdd(event) {
  let itemId = null;

  const btn = event.target;
  const children = btn.parentElement.children;

  //Converting HTML Collection to Array for Using forEach
  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
  });
  changetoTick(event);
  await postCart(itemId);
  return;
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/
//Select addBtns
function addBtnsEvent() {
  addBtns = document.querySelectorAll(".item__add");
  //Adding Click Event on Cart Add Button
  addBtns.forEach((btn) => {
    btn.addEventListener("click", cartAdd);
  });
}

/*
  ///////////////////////////////////////////////

  Functions to Fetch Search Result
 
  ///////////////////////////////////////////////
*/

const searchInput = document.getElementById("searchInput");
const resultGrid = document.getElementById("resultGrid");
let str = "";

/*
  -----------------------------------------------
  Get Search Request
  -----------------------------------------------
*/

async function getSearch(value) {
  const url = `${location.origin}/menu/search?name=${value}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  resultUpdate(result);
}

/*
  -----------------------------------------------
  Search Result Updater
  -----------------------------------------------
*/

function resultUpdate(result) {
  //If Search not found
  if (!(result.items.length > 0)) {
    return (resultGrid.innerHTML = `<p class="result__alt">Not Found</p>`);
  }

  //If Search Found
  Array.from(result.items).forEach((item) => {
    const isUnitString = () => {
      if (
        item.unit == "Plate" ||
        item.unit == "Piece" ||
        item.unit == "Glass" ||
        item.unit == "Cup" ||
        item.unit == "Pound"
      ) {
        return item.unit;
      } else {
        return item.serve + " " + item.unit;
      }
    };

    str += `<div class="menu__item menu__item-shadow">
    <div class="item__header">
      <img
        src="${item.image}"
        class="item__image"
        alt="${item.name} "
      />
    </div>
    <div class="item__body">
      <h4 class="item__name">${item.name}</h4>
      <div class="info__add__wrapper">
        <div class="info__wrapper">
          <p class="item__price">&#8377;${item.price}</p>
          <p class="item__unit">Per ${isUnitString()} </p>
        </div>
        <div class="add__wrapper">
          <input type="hidden" id="itemId" value="${item.itemId}"> 
          <button class="item__add">+</button>
        </div>
      </div>
    </div>
  </div>`;
  });
  resultGrid.innerHTML = str;
  //Selecting addBtns for add to cart
  addBtnsEvent();
  str = "";
  return;
}
/*
  -----------------------------------------------
  Event Handlers
  -----------------------------------------------
*/

//For getting input value from search input
function searchItems(event) {
  resultGrid.innerHTML = "";
  const value = event.target.value;
  if (!(value.length > 1)) {
    return;
  }
  getSearch(value);
  return;
}

/*
  -----------------------------------------------
  Event Listeners
  -----------------------------------------------
*/

//Focus on SearchInput as the window loads
window.onload = function () {
  searchInput.focus();
};

//Adding change Event on Search Input
searchInput.addEventListener("keyup", searchItems);

document.getElementById('searchInput').addEventListener('input', function() {
  const searchQuery = this.value;
  const loadingMessage = document.getElementById('loadingMessage');
  const resultGrid = document.getElementById('resultGrid');

  // Show loading message
  loadingMessage.style.display = 'block';
  resultGrid.innerHTML = ''; // Clear previous results

  // Simulate a delay for fetching data (replace with actual API call)
  setTimeout(function() {
      // Hide loading message after results are loaded
      loadingMessage.style.display = 'none';

      // Example: populate with search results (Replace with actual dynamic results)
      resultGrid.innerHTML = `<p>Results for "${searchQuery}"</p>`;
  }, 1500); // Simulate 1.5 seconds delay for loading
});



  const suggestions = ['Pizza', 'Burger', 'Pasta', 'Salad', 'Sandwich', 'Soup', 'Sushi', 'Steak','Dhokla','Dosa','Idli','Pav Bhaji','Pani Puri','Poha','Pulao','Rajma Chawal','Rasgulla','Samosa','Vada Pav','Biryani','Butter Chicken','Chole Bhature','Chowmein','Dal Makhani','Dum Aloo','Kadai Paneer','Kadhi Pakora','Kheer','Kofta','Lassi','Matar Paneer','Naan','Pakora','Paneer Tikka','Paratha','Raita','Ras Malai','Roti','Tandoori Chicken','Tandoori Roti','Upma','Veg Biryani','Veg Manchurian','Veg Pulao','Veggie Pizza','Aloo Gobi','Aloo Matar','Aloo Methi','Aloo Palak','Aloo Paratha','Aloo Tikki','Baingan Bharta','Bhindi Masala','Bhindi Fry','Bhindi Masala','Biryani','Butter Chicken',];
  //const searchInput = document.getElementById('searchInput');
  const suggestionsList = document.getElementById('suggestionsList');

  searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = '';

    if (query) {
      const filteredSuggestions = suggestions.filter(item => item.toLowerCase().includes(query));
      filteredSuggestions.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.addEventListener('click', function() {
          searchInput.value = item;
          suggestionsList.style.display = 'none';
          // Optionally trigger search functionality here
        });
        suggestionsList.appendChild(listItem);
      });

      suggestionsList.style.display = filteredSuggestions.length ? 'block' : 'none';
    } else {
      suggestionsList.style.display = 'none';
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.style.display = 'none';
    }
  });

// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal
var images = document.querySelectorAll(".menu-img");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

images.forEach(image => {
  image.addEventListener("click", function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
