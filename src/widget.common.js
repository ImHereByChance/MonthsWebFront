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
        if(this.defaultOptions.onclick) {
            this.element.onclick = this.defaultOptions.onclick
        }
        if (this.defaultOptions.context) {
            this.element.context = this.defaultOptions.context
        }
    }
}

module.exports = {IconButton24}