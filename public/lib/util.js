/** @param {string} email */
export function validEmail(email) {
    return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,4}$/g.test(email);
}

/** @param {string} password */
export function validPassword(password) {
    return password.length >= 8 && password.length <= 64;
}

export function validName(name) {
    return name.length > 0 && name.length <= 64 && /^[a-zA-Z-' ]+$/g.test(name);
}

/** @param {HTMLSelectElement} dropdown */
export function validDropdown(dropdown) {
    return dropdown.value !== "__placeholder__";
}

/** @param {HTMLElement} element */
export function shake(element) {
    element.classList.add("shake");
    setTimeout(() => element.classList.remove("shake"), 512);
}

/** @param {HTMLElement} element */
export function success(element) {
    element.classList.add("good");
    setTimeout(() => element.classList.remove("good"), 512);
}