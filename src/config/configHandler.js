const localesRegister = require('../languages/localesRegister')


/**
 * A class to encapsulate logic of the app's config properties
 * representation.
 * @param  {object} options
 */
class Config {
    constructor(options) {
        
        // copy all the properties that weren't reassigned above
        for (let prop in options) {
            if (!(prop in this)) {
                this[prop] = options[prop]
            }
        }
    }

    /**
     * modules in the app use this object to translate lines, 
     * formatting date/time etc.
     */
    get LOCALE() {
        const localeObject = localesRegister[this.LOCALE_TAG]

        if (!localeObject) {
            throw `there is no such locale in the localesRegister: ${this.LOCALE_TAG}`
        }
        return localeObject
    }

}

module.exports = Config
