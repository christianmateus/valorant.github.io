// Elements instances
const card = document.getElementsByClassName("card");
const charImage = document.getElementsByClassName("char-image");
const charName = document.getElementsByClassName("char-name");
const charRole = document.getElementsByClassName("char-role");
const container = document.getElementsByClassName("container-principal")[0];
const pageBtn = document.getElementsByClassName("page-btn");
const filterSelect = document.getElementById("filter-select");
const filterSelectWeapons = document.getElementById("filter-select-weapons");

// Menu buttons
const menuBtn = document.getElementsByClassName("menu-item");

// Global variables
let count = 0;
let uuid = '';

// Get user's location
// fetch('https://api.ipregistry.co/?key=u4fhjd7jryf05uxk')
//     .then(async function (response) {
//         return response.json();
//     })
//     .then(async function (payload) {
//         console.log(payload.location.country.name);
//     });

/* ======================
    Functions
   ====================== */

// Create cards
function createCards() {
   let card = document.createElement("div");
   let cardImage = document.createElement("img");
   let cardRole = document.createElement("span");
   let cardName = document.createElement("h5");

   card.classList.add("card");
   cardImage.classList.add("char-image");
   cardRole.classList.add("char-role");
   cardName.classList.add("char-name");

   card.setAttribute("data-uuid", "");

   card.append(cardImage, cardRole, cardName);
   container.appendChild(card);
};

// View clicked agent details
function viewAgent() {
   for (const cardEl of card) {
      cardEl.addEventListener("click", async function (e) {
         localStorage.setItem("uuid", e.target.getAttribute("data-uuid"));
         window.location.href = "./agent.html"
      })
   }
}

// View clicked weapon details
function viewWeapon() {
   for (const cardEl of card) {
      cardEl.addEventListener("click", async function (e) {
         localStorage.setItem("uuid", e.target.getAttribute("data-uuid"));
         console.log(e.target.getAttribute("data-uuid"));
         window.location.href = "./gun.html"
      })
   }
}

// Filter agents by class
async function filterByClass(charClass) {
   await fetch("https://valorant-api.com/v1/agents")
      .then((response) => {
         return response
      })
      .then((result) => {
         result.json()
            .then((object) => {
               container.innerHTML = ""
               for (let index = 0; index < object.data.length; index++) {
                  if (object.data[index].isPlayableCharacter) {
                     if (object.data[index].role.displayName == charClass) {
                        createCards()
                        charImage[charImage.length - 1].src = object.data[index].fullPortrait;
                        charRole[charImage.length - 1].textContent = object.data[index].role.displayName;
                        charName[charImage.length - 1].textContent = object.data[index].displayName;
                        card[charImage.length - 1].setAttribute("data-uuid", object.data[index].uuid);
                        count++;
                     }
                  }
               }
               viewAgent()
            })
      })
};

// Filter weapons by class
async function filterByClassWeapons(category) {
   await fetch("https://valorant-api.com/v1/weapons")
      .then((response) => {
         return response
      })
      .then((result) => {
         result.json()
            .then((object) => {
               container.innerHTML = ""
               for (let index = 0; index < object.data.length; index++) {
                  let weaponCategory = object.data[index].category;
                  weaponCategory = weaponCategory.substring(weaponCategory.lastIndexOf(":") + 1)
                  if (weaponCategory == category) {
                     createCards()
                     charImage[charImage.length - 1].src = object.data[index].displayIcon;
                     charRole[charImage.length - 1].textContent = weaponCategory;
                     charName[charImage.length - 1].textContent = object.data[index].displayName;
                     card[charImage.length - 1].setAttribute("data-uuid", object.data[index].uuid);
                     count++;
                  }
               }
               viewWeapon()
            })
      })
};

// Getting data for Agents
async function getCardData() {
   await fetch("https://valorant-api.com/v1/agents")
      .then((response) => {
         return response
      })
      .then((result) => {
         result.json()
            .then((object) => {
               container.innerHTML = ""
               for (let index = 0; index < 9; index++) {
                  if (object.data[index].isPlayableCharacter && count < 21) {
                     createCards();
                     charImage[charImage.length - 1].src = object.data[count].fullPortrait;
                     charRole[charImage.length - 1].textContent = object.data[count].role.displayName;
                     charName[charImage.length - 1].textContent = object.data[count].displayName;
                     card[charImage.length - 1].setAttribute("data-uuid", object.data[count].uuid);
                     count++;
                  } else {
                     count++;
                     continue;
                  }
               }
               viewAgent();
               count = 0;
            })
      })
};

// Getting data for Weapons
async function getCardDataWeapons() {
   await fetch("https://valorant-api.com/v1/weapons")
      .then((response) => {
         return response
      })
      .then((result) => {
         result.json()
            .then((object) => {
               container.innerHTML = ""
               for (let index = 0; index < 8; index++) {
                  if (count < 18) {
                     createCards();

                     // Removing extra meta characters from API call
                     let weaponCategory = object.data[count].category;
                     weaponCategory = weaponCategory.substring(weaponCategory.lastIndexOf(":") + 1)

                     charImage[charImage.length - 1].src = object.data[count].displayIcon;
                     charRole[charImage.length - 1].textContent = weaponCategory;
                     charName[charImage.length - 1].textContent = object.data[count].displayName;
                     card[charImage.length - 1].setAttribute("data-uuid", object.data[count].uuid);
                     count++;
                  }
               }
               viewWeapon();
               count = 0;
            })
      })
};

// Getting data for Maps
async function getCardDataMaps() {

};

// Checking if localStorage key exists
function checkStorage() {
   let temp_key = localStorage.getItem("active-menu");
   switch (temp_key) {
      case null: return;
      case '0':
         getCardData();
         for (const iterator of menuBtn) {
            iterator.classList.remove("active")
         }
         menuBtn[0].classList.add("active");

         // Toggle between which filter should be visible
         filterSelect.classList.remove("hide");
         filterSelectWeapons.classList.add("hide");
         break;
      case '1': getCardDataWeapons();
         for (const iterator of menuBtn) {
            iterator.classList.remove("active")
         }
         menuBtn[1].classList.add("active");

         // Toggle between which filter should be visible
         filterSelect.classList.add("hide");
         filterSelectWeapons.classList.remove("hide");
         getCardDataWeapons();
         break;
      case '2': getCardDataMaps();
         for (const iterator of menuBtn) {
            iterator.classList.remove("active")
         }
         menuBtn[1].classList.add("active");
         break;
      default: break;
   }
}

/* ======================
    Event Listeners
   ====================== */

pageBtn[0].addEventListener("click", function () {
   container.innerHTML = ""
   count = 0;
   if (menuBtn[0].classList.contains("active")) {
      getCardData();
   } else if (menuBtn[1].classList.contains("active")) {
      getCardDataWeapons();
   } else {
      getCardDataMaps();
   }
})

pageBtn[1].addEventListener("click", function () {
   container.innerHTML = ""
   if (menuBtn[0].classList.contains("active")) {
      getCardData();
      count = 9;
   } else if (menuBtn[1].classList.contains("active")) {
      getCardDataWeapons();
      count = 8;
   } else {
      getCardDataMaps();
   }
})

pageBtn[2].addEventListener("click", function () {
   container.innerHTML = ""
   if (menuBtn[0].classList.contains("active")) {
      getCardData();
      count = 18;
   } else if (menuBtn[1].classList.contains("active")) {
      count = 16;
      getCardDataWeapons();
   } else {
      getCardDataMaps();
   }
})

/* ============================
      Filters
   ============================ */

filterSelect.addEventListener("change", function (e) {
   let optionSelected = filterSelect.selectedIndex;
   let className = filterSelect.options[optionSelected].value;
   filterByClass(className);
});

filterSelectWeapons.addEventListener("change", function (e) {
   let optionSelected = filterSelectWeapons.selectedIndex;
   let className = filterSelectWeapons.options[optionSelected].value;
   filterByClassWeapons(className);
});


// Menu buttons
menuBtn[0].onclick = (e) => {
   for (const iterator of menuBtn) {
      iterator.classList.remove("active")
   }
   e.target.classList.add("active");

   // Toggle between which filter should be visible
   filterSelect.classList.remove("hide");
   filterSelectWeapons.classList.add("hide");
   getCardData()
};
menuBtn[1].onclick = (e) => {
   for (const iterator of menuBtn) {
      iterator.classList.remove("active")
   }
   e.target.classList.add("active");

   // Toggle between which filter should be visible
   filterSelect.classList.add("hide");
   filterSelectWeapons.classList.remove("hide");
   getCardDataWeapons();
};
menuBtn[2].onclick = (e) => {
   for (const iterator of menuBtn) {
      iterator.classList.remove("active")
   }
   e.target.classList.add("active");
   getCardDataMaps()
};
checkStorage()