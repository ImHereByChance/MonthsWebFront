const { PopUpWindow } = require("./widgets/widget.popup")


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
            caption: this.message,
            svgPicture: svgPaths.oopsError
        }).build()
    }

}


class ServerError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = 'ServerError'
        this.statusCode = statusCode

        this.displayPopup()
    }

    displayPopup() {
        new PopUpWindow({
            parent: _mainContainer,
            cssClass: 'popup-defaultError',
            caption: this.message,
            svgPicture: svgPaths.oopsError
        }).build()
    }
}


class ClientError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = 'ClientError'
        this.statusCode = statusCode

        this.displayPopup()
    }

    displayPopup() {
        new PopUpWindow({
            parent: _mainContainer,
            cssClass: 'popup-defaultError',
            caption: this.message,
            svgPicture: svgPaths.oopsError
        }).build()
    }
}

module.exports = { MissingServerError, ServerError, ClientError }