export class Realm {
    constructor(host, secure) {
        this.ok = true;

        this.host = host;
        this.secure = secure;

        this.name = "";
        this.organization = "";
        this.contactEmail = "";

        /** @type {string[]} */
        this.emailDomainWhiteList = [];
    }

    get url() {
        return `${this.secure ? "https" : "http"}://${this.host}`;
    }
    
    async load() {
        try {
            const response = await fetch(this.url + "/metadata.json");

            if (!response.ok) {
                throw new Error(`Failed to load realm metadata: ${response.status}`);
            }

            const metadata = await response.json();

            this.name = metadata.name;
            this.organization = metadata.organization;
            this.contactEmail = metadata.contact;
            this.emailDomainWhiteList = metadata.emailDomainWhiteList;
        } catch (error) {
            this.ok = false;
            console.error(`Failed to load realm metadata: ${error}`);
        }
    }
}

/** @type {Realm[]} */
export const realms = [new Realm("localhost:8090", false)];

export async function loadRealms() {
    await Promise.all(realms.map(realm => realm.load()));
}

/** @type {Realm|null} */
export let currentRealm = null;

/** @param {Realm|string} realm */
export function setCurrentRealm(realm) {
    if (typeof realm === "string") {
        realm = realms.find(r => r.name === realm) || null;
    }

    currentRealm = realm;
}