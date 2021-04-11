const { PopUpWindow } = require("./widgets/widget.popup")
const { translate } = require("./tools")

class MissingServerError extends Error {
    constructor(message) {
        super(message)
        this.name = 'MissingServerError'
        
        this.displayPopup()
    }


    displayPopup() {
        new PopUpWindow({
            parent: _mainContainer,
            cssClass: 'popup-defaultError',
            irreversible: true,
            caption: translate('server is temporary unavailable..'),
            svgPicture: svgPaths.oopsError
        }).build()
    }

}

module.exports = { MissingServerError }