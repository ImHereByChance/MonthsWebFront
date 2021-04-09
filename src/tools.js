const CONFIG = require('./config')
const LOCALE = CONFIG.LOCALE


/**
 *                           MISC                           
 ************************************************************/

function copyObject(object) {
    let newCopy = {}
    Object.assign(newCopy, object)
    return newCopy
}

/**
 * Simple function to compare two arrays
 * @param  {Array} a - first array
 * @param  {Array} b - second array
 */
function arraysEquals(a, b) {
    return (a.length === b.length
        && a.every((v, i) => v === b[i]))
}

/**
 * Recursive traverse of child nodes of the given HTML element.
 * @param  {object} element - html element
 * @param  {function} handler - function to handle descendants of the given element
 * @param  {Array} exclusions - list of nodes to exclude during traversal
 */
function traverseNodeChildren(element, handler, exclusions = []) {
    if (element.childElementCount < 1) {
        return
    }
    element.childNodes.forEach(childNode => {
        if (!exclusions.includes(childNode)) {
            traverseNodeChildren(childNode, handler, exclusions)
        }
    })
    element.childNodes.forEach(childNode => {
        handler(childNode)
    })
}


/*                        NETWORK                           
 ************************************************************/

function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}


/*           WORKING WITH DATES AND RELATED TO IT                           
 ************************************************************/

/**
 * Function to make a Date from given value, if it isn't
 * already type of Date.
 */
function toDateField(date) {
    if (date instanceof Date) {
        return date
    } else if (typeof date === 'string') {
        const dateObject = new Date(date)

        if (isNaN(dateObject.getDate())) {
            throw new TypeError('cannot make valid Date object ' +
                `from "${date}"`)
        } else {
            return dateObject
        }
    }
    else {
        throw new TypeError('cannot make valid Date object ' +
            `from "${date}" - only Date objects ` +
            'and strings are allowed as args')
    }
}

function resetTimezone(date) {
    let timezoneOffset = date.getTimezoneOffset() * 60 * 1000
    let newDate = new Date(date.getTime() - timezoneOffset)
    return newDate
}

const DateFormat = {
    monthLabel: (dateObj, locale=LOCALE) => {
        let month = locale.months[dateObj.getMonth()]
        let year = dateObj.getYear() + 1900
        return `${month}, ${year}`
    },
    dateLabel: (dateObj, locale=LOCALE) => {
        const weekDay = locale.weekDays[dateObj.getDay()]
        const dateString = dateObj.toLocaleDateString(locale.languageTag)
        return `${weekDay}, ${dateString}`
    },
    /** Make ISO string with trailing "+00:00" for a Date() object.
     * (e.g.'2021-02-01T00:00:00+00:00' instead of '2021-02-01T00:00:00Z'
     * as in the standard Date.toISOString() method). 
     * @param  {Date} dateObj
     */
    toProperISOString: (dateObj) => {
        let jsISOString = dateObj.toISOString()
        let properISOString = jsISOString.replace('Z', '+00:00')
        return properISOString
    }
}


/*               LANGUAGES AND TRANSLATIONS                           
 ************************************************************/

/**
 * Takes a string in english and object of locale with
 * translations and returns translated string.
 * Example:
 * ```
 * const DE = {'Good morning': 'Guten Morgen'}
 * translate('Good morning', DE) // 'Guten Morgen'
 * ```
 * @param  {string} str
 * @param  {object} lang
 */
function translate(str, locale=LOCALE) {
    let translation = locale.lines[str]
    if (typeof translation === 'string') {
        return translation
    } else {
        console.error('no such line in the lines collection ' +
            'or wrong type of string provident:', str)
        return str
    }
}


module.exports = {
    copyObject, getCookie, toDateField, arraysEquals,
    translate, DateFormat: DateFormat, resetTimezone,
    traverseNodeChildren
}
