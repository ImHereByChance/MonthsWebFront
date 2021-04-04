/**
 * Takes a string in english and object with translations and returns
 * translated string. Example:
 * ```
 * const DE = {'Good morning': 'Guten Morgen'}
 * translate('Good morning', DE) // Guten Morgen'
 * ```
 * @param  {string} str
 * @param  {object} lang
 */
function translate(str, lang) {
    let translation = lang[str]
    if (typeof translation === 'string') {
        return translation
    } else {
        console.error('no such line in the lines collection ' +
                      'or wrong type of string provident:', str)
        return str
    }
}


module.exports = { translate }