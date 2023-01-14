// Element instances
const weaponName = document.getElementsByClassName("weapon-name")[0];
const weaponDesc = document.getElementsByClassName("weapon-category")[0];
const weaponThumb = document.getElementsByClassName("weapon-thumbnail")[0];

// Skin elements
const skinPreview = document.getElementsByClassName("skin-preview")[0];
const skinName = document.getElementsByClassName("skin-title")[0];
const skinBtn = document.getElementsByClassName("skin-btn");

// Stats elements
const progressBar = document.getElementsByClassName("stat-progress");
const statsValue = document.getElementsByClassName("stat-value");

// Stats elements
const damageDistance = document.getElementsByClassName("table-header");
const damageHead = document.getElementsByClassName("table-cell-head");
const damageBody = document.getElementsByClassName("table-cell-body");
const damageLegs = document.getElementsByClassName("table-cell-legs");

// Menu buttons
const menuBtn = document.getElementsByClassName("menu-item");

// Global variables
let skinIndex = 0;

/* ======================
    Functions
   ====================== */

// Getting values from API
async function getCardData() {
    await fetch(`https://valorant-api.com/v1/weapons/${localStorage.getItem("uuid")}`)
        .then((response) => {
            return response
        })
        .then((result) => {
            result.json()
                .then((object) => {
                    weaponName.textContent = object.data.displayName;
                    weaponDesc.textContent = object.data.shopData.category;
                    weaponThumb.src = object.data.displayIcon;
                    skinPreview.src = object.data.skins[0].displayIcon;
                    skinName.textContent = object.data.skins[0].displayName;

                    // Weapon stats -------------------------------------------------------------
                    let weaponStats = Object.values(object.data.weaponStats);
                    Array.from(progressBar).forEach((el, index, arr) => {
                        el.setAttribute("value", weaponStats[index])
                    })
                    Array.from(statsValue).forEach((el, index, arr) => {
                        el.textContent = weaponStats[index]
                    })

                    // Weapon damage -------------------------------------------------------------
                    Array.from(damageDistance).forEach((el, index, arr) => {
                        if (index == 0) {
                            return;
                        } else {
                            if (index > object.data.weaponStats.damageRanges.length) {
                                return;
                            } else {
                                el.textContent = `${object.data.weaponStats.damageRanges[index - 1].rangeStartMeters} - ${object.data.weaponStats.damageRanges[index - 1].rangeEndMeters} m`
                            }
                        }
                    })
                    Array.from(damageHead).forEach((el, index, arr) => {
                        if (index >= object.data.weaponStats.damageRanges.length) {
                            return;
                        } else {
                            el.textContent = object.data.weaponStats.damageRanges[index].headDamage;
                        }
                    })
                    Array.from(damageBody).forEach((el, index, arr) => {
                        if (index >= object.data.weaponStats.damageRanges.length) {
                            return;
                        } else {
                            el.textContent = object.data.weaponStats.damageRanges[index].bodyDamage;
                        }
                    })
                    Array.from(damageLegs).forEach((el, index, arr) => {
                        if (index >= object.data.weaponStats.damageRanges.length) {
                            return;
                        } else {
                            el.textContent = object.data.weaponStats.damageRanges[index].legDamage;
                        }
                    })
                })
        })
}
getCardData()

// Change skin image
async function changeSkin(value) {
    await fetch(`https://valorant-api.com/v1/weapons/${localStorage.getItem("uuid")}`)
        .then((response) => {
            return response
        })
        .then((result) => {
            result.json()
                .then((object) => {
                    if (value == "prev") {
                        for (let i = 0; i < object.data.skins.length; i++) {
                            if (skinName.textContent == object.data.skins[i].displayIcon) {
                                skinIndex = i;
                                break;
                            }
                        }
                        if (skinIndex == 0) {
                            return
                        } else {
                            skinIndex--;
                            if (object.data.skins[skinIndex].displayIcon == "null") {
                                skinIndex--;
                            }
                        }
                    } else {
                        for (let i = 0; i < object.data.skins.length; i++) {
                            if (skinName.textContent == object.data.skins[i].displayIcon) {
                                skinIndex = i;
                                break;
                            }
                        }
                        if (skinIndex == object.data.skins.length - 1) {
                            return
                        } else {
                            skinIndex++;
                            if (object.data.skins[skinIndex].displayIcon == null) {
                                skinIndex++;
                            }
                        }
                    }
                    skinPreview.src = object.data.skins[skinIndex].displayIcon;
                    skinName.textContent = object.data.skins[skinIndex].displayName;
                })
        })
}

// Getting weapon stats
async function getWeaponStats() {
    await fetch(`https://valorant-api.com/v1/weapons/${localStorage.getItem("uuid")}`)
        .then((response) => {
            return response
        })
        .then((result) => {
            result.json()
                .then((object) => {
                    weaponName.textContent = object.data.displayName;
                    weaponDesc.textContent = object.data.shopData.category;
                    weaponThumb.src = object.data.displayIcon;
                    skinPreview.src = object.data.skins[0].displayIcon;
                    skinName.textContent = object.data.skins[0].displayName;
                })
        })
}

/* ======================
    Event Listeners
   ====================== */

for (const btn of skinBtn) {
    btn.addEventListener("click", function (e) {
        changeSkin(e.target.getAttribute("value"));
    })
}

// Menu buttons
menuBtn[0].onclick = () => {
    localStorage.setItem("active-menu", "0");
    window.location.href = "../index.html";
};
menuBtn[1].onclick = () => {
    localStorage.setItem("active-menu", "1");
    window.location.href = "../index.html";
};
menuBtn[2].onclick = () => {
    localStorage.setItem("active-menu", "2");
    window.location.href = "../index.html";
};