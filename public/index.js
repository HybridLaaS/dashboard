import * as util from "./lib/util.js";
import * as config from "./lib/config.js";
import * as api from "./api/api.js";

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

/** @returns {boolean | { email: string, password: string, realm: string }} */
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
    return {
        email: email.value,
        password: password.value,
        realm: dropdown.value
    };
}

/** @returns {boolean | { email: string, firstName: string, lastName: string, password: string, realm: string }} */
function validateRegisterForm() {
    const form = document.querySelector("#register .form-contents");
    const email = form.querySelector("input#email");
    const firstName = form.querySelector("input#first-name");
    const lastName = form.querySelector("input#last-name");
    const password = form.querySelector("input#password");
    const confirmPassword = form.querySelector("input#password-confirm");
    const dropdown = form.querySelector("select#realm");

    if (!util.validEmail(email.value)) {
        util.shake(email);
        return false;
    }

    util.success(email);

    if (!util.validName(firstName.value)) {
        util.shake(firstName);
        return false;
    }

    util.success(firstName);

    if (!util.validName(lastName.value)) {
        util.shake(lastName);
        return false;
    }

    util.success(lastName);

    if (!util.validPassword(password.value)) {
        util.shake(password);
        return false;
    }

    util.success(password);

    if (password.value !== confirmPassword.value) {
        util.shake(confirmPassword);
        return false;
    }

    util.success(confirmPassword);

    if (!util.validDropdown(dropdown)) {
        util.shake(dropdown);
        return false;
    }

    util.success(dropdown);
    return {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        realm: dropdown.value
    };
}

function switchPage(pageID) {
    const currentPage = document.querySelector(".page.enabled");

    if (currentPage) {
        currentPage.classList.remove("enabled");
    }

    const nextPage = document.querySelector(`.page#${pageID}`);
    nextPage.classList.add("enabled");
}

document.querySelector("button#login-button").onclick = async function login() {
    const form = validateLoginForm();

    if (form === false) {
        return;
    }

    config.setCurrentRealm(form.realm);

    const response = await api.login(form.email, form.password);

    if (!response.ok) {
        alert(response.getStatusName());
        return;
    }

    alert("Logged in successfully");
    switchPage("home");
}

document.querySelector("button#register-button").onclick = async function register() {
    const form = validateRegisterForm();

    if (form === false) {
        return;
    }

    config.setCurrentRealm(form.realm);

    const response = await api.createAccount(form.email, form.firstName, form.lastName, form.password, form.realm);

    if (!response.ok) {
        alert(response.getStatusName());
        return;
    }

    switchPage("verify-email");

    document.querySelector("button#verify-email-button").onclick = async function verifyEmail() {
        const token = document.querySelector("input#email-token");

        if (!token.value) {
            util.shake(token);
            return;
        }

        util.success(token);

        const response = await api.verifyAccount(form.email, token.value);

        if (!response.ok) {
            alert(response.getStatusName());
            return;
        }

        alert("Account verified successfully");
        switchPage("home");
    }
}

document.getElementById("switch-to-register").onclick = () => switchPage("register");
document.getElementById("switch-to-login").onclick = () => switchPage("login");

window.api = api;
window.selectRealm = realm => config.setCurrentRealm(realm);