import * as util from "./lib/util.js";
import * as config from "./lib/config.js";

// Apply Theme
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
}

await config.loadRealms();

const realmsList = document.querySelectorAll("#realm");
realmsList.forEach(realmSelector => {
    config.realms.forEach(realm => {
        if (!realm.ok) {
            return;
        }

        const option = document.createElement("option");
        option.value = realm.name;
        option.innerText = realm.name;
        realmSelector.appendChild(option);
    });
});

function validateLoginForm() {
    const form = document.querySelector("#login .form-contents");
    const email = form.querySelector("input#email");
    const password = form.querySelector("input#password");
    const dropdown = form.querySelector("select#realm");

    if (!util.validEmail(email.value)) {
        util.shake(email);
        return false;
    }

    util.success(email);

    if (!util.validPassword(password.value)) {
        util.shake(password);
        return false;
    }

    util.success(password);

    if (!util.validDropdown(dropdown)) {
        util.shake(dropdown);
        return false;
    }

    util.success(dropdown);
    return true;
}

function switchPage(pageID) {
    const currentPage = document.querySelector(".page.enabled");

    if (currentPage) {
        currentPage.classList.remove("enabled");
    }

    const nextPage = document.querySelector(`.page#${pageID}`);
    nextPage.classList.add("enabled");
}

document.querySelector("button#login-button").onclick = validateLoginForm;

document.getElementById("switch-to-register").onclick = () => switchPage("register");
document.getElementById("switch-to-login").onclick = () => switchPage("login");