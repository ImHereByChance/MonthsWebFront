const localesRegistratory = require('./languages/localesRegistratory')

function localeLoader(langCode) {
    try {
        localeObject = localesRegistratory[langCode]
        if (localeObject) {
            return localeObject
        } else {
            throw `cannot find locale ${langCode}`
        }
    } catch (error) {
        console.error('cannot access the file with locale information')
        throw error
    }
}


module.exports = {

    LOCALE_TAG: 'ru',

    get LOCALE() { return localeLoader(this.LOCALE_TAG) },
    
    SERVER_URLs: {
        base: 'http://192.168.1.15:8000/',
        changeDate: '/getDatePack',
        tasks: '/tasks'
    },
    
    
}