// Elements instances
const card = document.getElementsByClassName("card");
const charImage = document.getElementsByClassName("char-image");
const charName = document.getElementsByClassName("char-name");
const charRole = document.getElementsByClassName("char-role");
const container = document.getElementsByClassName("container-principal")[0];
const pageBtn = document.getElementsByClassName("page-btn");
const filterSelect = document.getElementById("filter-select");

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

function viewAgent() {
   for (const cardEl of card) {
      cardEl.addEventListener("click", async function (e) {
         localStorage.setItem("uuid", e.target.getAttribute("data-uuid"));
         window.location.href = "./agent.html"
      })
   }
}

// Filter by class
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

// Getting values from API
async function getCardData() {
   await fetch("https://valorant-api.com/v1/agents")
      .then((response) => {
         return response
      })
      .then((result) => {
         result.json()
            .then((object) => {
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
            })
      })
}
count = 0;


/* ======================
    Event Listeners
   ====================== */

pageBtn[0].addEventListener("click", function () {
   container.innerHTML = ""
   count = 0;
   getCardData()
})
pageBtn[1].addEventListener("click", function () {
   container.innerHTML = ""
   count = 9;
   getCardData()
})
pageBtn[2].addEventListener("click", function () {
   container.innerHTML = ""
   count = 18;
   getCardData()
})

filterSelect.addEventListener("change", function (e) {
   let optionSelected = filterSelect.selectedIndex;
   let className = filterSelect.options[optionSelected].value;
   filterByClass(className);
});

getCardData();