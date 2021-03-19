const {Widget} = require('./widget')


class IconButton24 extends Widget {
    constructor(parent, options={}, svgHTML) {
        super(parent, options)
        this.tag = 'button'
        this.element = document.createElement(this.tag)
        this.element.className = 'button-icon24'

        this.SvgIcon = Widget.fromHTML(this, svgHTML)
    }

    build(){
        super.build()
        this.SvgIcon.build()
        if(this._localOptions.onclick) {
            this.element.onclick = this._localOptions.onclick
        }
        if (this._localOptions.context) {
            this.element.context = this._localOptions.context
        }
    }
}

module.exports = {IconButton24}