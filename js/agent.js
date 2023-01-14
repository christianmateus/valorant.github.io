// Element instances
const charName = document.getElementsByClassName("char-name")[0];
const charDesc = document.getElementsByClassName("char-description")[0];
const charThumb = document.getElementsByClassName("char-thumbnail")[0];
const charClass = document.getElementsByClassName("char-class")[0];
const charClassImg = document.getElementsByClassName("char-class-img")[0];
const abilityIcon = document.getElementsByClassName("ability-icon");
const abilityName = document.getElementsByClassName("ability-name");
const abilityDesc = document.getElementsByClassName("ability-description");

// Menu buttons
const menuBtn = document.getElementsByClassName("menu-item");

/* ======================
    Functions
   ====================== */

// Getting values from API
async function getCardData() {
   await fetch(`https://valorant-api.com/v1/agents/${localStorage.getItem("uuid")}`)
      .then((response) => {
         return response
      })
      .then((result) => {
         result.json()
            .then((object) => {
               charName.textContent = object.data.displayName;
               charDesc.textContent = object.data.description;
               charThumb.src = object.data.displayIconSmall;
               charClass.textContent = object.data.role.displayName;
               charClassImg.src = object.data.role.displayIcon;

               Array.from(abilityIcon).forEach((el, index, arr) => {
                  el.src = object.data.abilities[index].displayIcon;
               })
               Array.from(abilityName).forEach((el, index, arr) => {
                  el.textContent = object.data.abilities[index].displayName;
               })
               Array.from(abilityDesc).forEach((el, index, arr) => {
                  el.textContent = object.data.abilities[index].description;
               })
            })
      })
}
getCardData()

// Menu buttons
menuBtn[0].onclick = () => { window.location.href = "../index.html" };
menuBtn[1].onclick = () => { window.location.href = "../index.html" };
menuBtn[2].onclick = () => { window.location.href = "../index.html" };