const { Widget } = require('./widget')
const { translate, traverseNodeChildren } = require('../tools')


class PopUpWindow extends Widget {
    constructor(options) {
        super(options.parent)
        this.cssClass = options.cssClass
        this.onclose = options.onclose
        this.Caption = new Widget(this, { innerText: translate(options.message) })
        this.SvgPicture = Widget.fromHTML(this, options.svgPicture)
        this.ConformButton = new Widget(this, {
            tagName: 'button',
            innerText: translate('ok..'),
            onclick: this.close.bind(this)
        })
    }

    build() {
        super.build()
        this.addCssClass('popup')
        this.addCssClass(this.cssClass)
        this.SvgPicture.build()
        this.Caption.build()
        this.ConformButton.build()
        this.setDisabledForParent(true)
    }

    close() {
        if (this.onclose) {
            this.onclose()
        }
        this.setDisabledForParent(false)
        this.remove()
    }

    /**
     * Recursively traverse all child nodes of a parent Widget html
     * element and disable (enable) all its nodes according to given
     * boolean flag
     * @param  {boolean} flag - if true - disable, false - enable
     */
    setDisabledForParent(flag) {
        if (typeof flag != 'boolean') {
            throw TypeError('the function requires a boolean ' +
                            'value as an argument')
        }
        
        let parentNode
        if (this.parent.id === '_main-container') {
            parentNode = this.parent
        } else {
            parentNode = this.parent.element
        }
        // recursively traverse all child nodes of a parent Widget
        // element and disable (enable) all its nodes
        traverseNodeChildren(parentNode, node => {
            node.disabled = flag
        }, [this.element])
        // dim (or brighten) parent node to make it look disabled (active)
        parentNode.childNodes.forEach(node => {
            if(node != this.element) {
                if (flag) {
                    node.style.filter = 'brightness(0.5)';
                } else {
                    node.style.filter = 'brightness(1)'
                }
            } 
        })
    }
}

module.exports = { PopUpWindow }
