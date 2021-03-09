export default class Widget {
    constructor(parent, options={}) {
        // parent widget, where this widget will be located
        this.parent = parent
        // html element associated with this class instance 
        this.element = document.createElement(
            options.tagName ? options.tagName : 'DIV'
        )
        // this.element attributes you may override during initialization
        this.options = options
        // html id attribute and identifier of this widget instance
        this.id = options.id ? options.id : this.makeId('w')
        // Flex, block, etc. Private parameter to use it in this.hide()
        // and this.show() methods.
        this._defaultDisplayMode
        // Keeps available the this.options, how they was given on
        // instance constructor - otherwise, they would be assign via
        // setter to the this.element object and not available any more.
        this._localOptions = options
    }
 
    // The alternative constructor, that takes as args parent Widget and raw
    // html string and returns a new Widget object based on given html string 
    static fromHTML(parent, rawHTML) {
        let element = Widget.makeElementFromHTML(rawHTML)
        let Widget = new Widget(parent)
        Widget.element = element
        return Widget
    }

    // creates html element from a raw html string
    static makeElementFromHTML(rawHTML) {
        let parser = new DOMParser()
        let newDoc = parser.parseFromString(rawHTML, 'text/html')
        let element = newDoc.body.firstElementChild
        return element
    }

    build() {
        try {
            this.element.id = this.id
            let parentNode = document.getElementById(this.parent.id)
            parentNode.insertAdjacentElement('beforeend', this.element)
            this._defaultDisplayMode = this.element.style.display
        } catch (err) {
            console.error('cannot build Widget:', this)
            throw(err)
        }
    }

    isBuilded(){
        if(document.getElementById(this.id)){
            return true
        } else {
            return false
        }
    }

    set options(newOptions) {
        delete newOptions.tagName
        Object.assign(this.element, newOptions)
    }

    makeId(typeChar) {
        let randInt = Math.floor(Math.random() * 99999)
        return typeChar + randInt
    }

    remove() {
        this.element.remove()
    }

    hide() {
        if(this._defaultDisplayMode != 'none'){
            let currentMode = this.element.style.display
            this.element._defaultDisplayMode = currentMode
        }
        this.element.style.display = 'none'
    }

    show() {
        this.element.style.display = this._defaultDisplayMode
    }

    disable() {
        this.element.disabled = true
    }

    enable() {
        this.element.disabled = false
    }

    addCssClass(className) {
        this.element.classList.add(className)
    }

    removeCssClass(className) {
        this.element.classList.remove(className)
    }
}
