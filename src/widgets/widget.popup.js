const { Widget } = require('./widget')
const { translate, traverseNodeChildren } = require('../tools')


class PopUpWindow extends Widget {
    constructor(options) {
        super(options.parent)
        this.cssClass = options.cssClass
        this.onclose = options.onclose
        if (options.caption) {
            this.Caption = new Widget(this, {
                className: 'popup-caption',
                innerText: options.caption
            })
        }
        if (options.svgPicture) {
            this.SvgPicture = Widget.fromHTML(this, options.svgPicture)
        }
        if (!options.irreversible) {
            this.ConformButton = new Widget(this, {
                tagName: 'button',
                innerText: translate('ok'),
                onclick: this.close.bind(this)
            })
        }
    }

    build() {
        super.build()
        this.addCssClass('popup')       
        if (this.cssClass) {
            this.addCssClass(this.cssClass)
        }     
        if (this.SvgPicture) {
            this.SvgPicture.build()
        }      
        if (this.Caption) {
            this.Caption.build()     
        }
        if (this.ConformButton) {
            this.ConformButton.build()
        }    
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
        traverseNodeChildren(parentNode, childNode => {
            childNode.disabled = flag
        }, [this.element])
        // dim (or brighten) parent node to make it look disabled (active)
        parentNode.childNodes.forEach(childNode => {
            if(childNode != this.element) {
                if (flag) {
                    childNode.style.filter = 'brightness(0.5)';
                } else {
                    childNode.style.filter = 'brightness(1)'
                }
            } 
        })
    }
}

module.exports = { PopUpWindow }
