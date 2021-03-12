function copyObject(object) {
    let newCopy = {}
    Object.assign(newCopy, object)
    return newCopy
}

module.exports = {copyObject}