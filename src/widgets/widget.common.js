const { Widget } = require('./widget')
const { translate } = require('../tools')


class IconButton24 extends Widget {
    constructor(parent, options = {}, svgHTML) {
        super(parent, options)
        this.tag = 'button'
        this.element = document.createElement(this.tag)
        this.element.className = 'button-icon24'

        this.SvgIcon = Widget.fromHTML(this, svgHTML)
    }

    build() {
        super.build()
        this.SvgIcon.build()
        if (this.defaultOptions.onclick) {
            this.element.onclick = this.defaultOptions.onclick
        }
        if (this.defaultOptions.context) {
            this.element.context = this.defaultOptions.context
        }
    }
}

/**
 * Constructor of the Widget takes two args: parent Widget and
 * optionList which should be represented as an array of arrays.
 * Each nested array must consists of two items: 
 * 1) value attr of html <option> element;
 * 2) inner text of <option>.
 * @param  {Widget} parent
 * @param  {object} optionsList
 */
class Select extends Widget {
    constructor(parent, optionsList) {
        super(parent)
        this.tag = 'select'
        this.element = document.createElement(this.tag)
        this.optionsList = this.initOptions(optionsList)
        this.defaultValue
    }

    get value() {
        return this.element.value
    }

    set value(newValue) {
        this.element.value = newValue
    }

    initOptions(optionsList) {
        let optionWidgets = []
        optionsList.forEach(pair => {
            let value = pair[0]
            let text = translate(pair[1])
            const optionWidget = new Widget(this, {
                tagName: 'option',
                value: value,
                text: text
            })
            optionWidgets.push(optionWidget)
        })
        return optionWidgets
    }

    build() {
        super.build()
        this.optionsList.forEach(opt => opt.build())

        if (this.defaultValue) {
            this.value = this.defaultValue
        }
    }
}

module.exports = { IconButton24, Select }