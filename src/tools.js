function copyObject(object) {
    let newCopy = {}
    Object.assign(newCopy, object)
    return newCopy
}


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


/**
 * Function to make a Date from given value, if it isn't
 * already type of Date.
 */
function toDateField(date) {
    if (date instanceof Date) {
        return date
    } else if (typeof date === 'string'){
        const dateObject = new Date(date)
        
        if (isNaN(dateObject.getDate())) {
            throw new TypeError ('cannot make valid Date object ' +
                                 `from "${date}"`)
        } else {
            return dateObject
        }
    }
    else {
        throw new TypeError ('cannot make valid Date object ' +
                             `from "${date}" - only Date objects ` +
                             'and strings are allowed as args')
    }
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


/** Make ISO string with trailing "+00:00" for a Date() object.
 * (e.g.'2021-02-01T00:00:00+00:00' instead of '2021-02-01T00:00:00Z'
 * as in the standard Date.toISOString() method). 
 * @param  {} dateObj
 */
function toProperISOString(dateObj) {
        let jsISOString = dateObj.toISOString()
        let properISOString = jsISOString.replace('Z','+00:00')
        return properISOString
}


module.exports = {
    copyObject, getCookie, toDateField, arraysEquals, toProperISOString
}