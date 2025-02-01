// Apply Theme
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
}

/** @param {string} username */
function validUsername(username) {
    return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
}

/** @param {string} password */
function validPassword(password) {
    return password.length >= 8 && password.length <= 64;
}

/** @param {HTMLSelectElement} dropdown */
function validDropdown(dropdown) {
    return dropdown.value !== "__placeholder__";
}

/** @param {HTMLElement} element */
function shake(element) {
    element.classList.add("shake");
    setTimeout(() => element.classList.remove("shake"), 512);
}

/** @param {HTMLElement} element */
function success(element) {
    element.classList.add("good");
    setTimeout(() => element.classList.remove("good"), 512);
}

function validateLoginForm() {
    const form = document.querySelector("#login .form-contents");
    const username = form.querySelector("input#username");
    const password = form.querySelector("input#password");
    const dropdown = form.querySelector("select#realm");

    if (!validUsername(username.value)) {
        shake(username);
        return false;
    }

    success(username);

    if (!validPassword(password.value)) {
        shake(password);
        return false;
    }

    success(password);

    if (!validDropdown(dropdown)) {
        shake(dropdown);
        return false;
    }

    success(dropdown);
    return true;
}

document.querySelector("button#login-button").onclick = validateLoginForm;