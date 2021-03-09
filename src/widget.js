/**
* The base class for widget, entity, that combine simple
* html element and logic of its behavior with attached data 
* to provide this logic.
* @param  {Widget} parent  -  where to place this 
* @param  {object} options={ }  -  options of HTML Element
*/
export default class Widget {
    constructor(parent, options={}) {
        this._checkTypes(parent, options)

        // Parent widget - this widget will be located inside it.
        this.parent = parent
        // HTML Element associated with this class instance 
        this.element = document.createElement(
            // if tagName of element specified in this.option element,
            // it will be taken from there, otherwise will be set as <div>
            options.tagName ? options.tagName : 'DIV'
        )
        // HTML Element attributes you may specify before initialization
        this.options = options
        // HTML id attribute (of this.element) and identifier of this class
        // instance. If tagName of this.element specified is this.options arg,
        // it will be taken from there, otherwise will it be <div>.
        this.id = options.id ? options.id : this.makeId('w')
        
        //                          Privates

        // Flex, block, etc. Private parameter to use it in this.hide()
        // and this.show() methods.
        this._defaultDisplayMode
        // Keeps available the this.options, how they was given on
        // instance constructor - otherwise, they would be assign via
        // setter to the this.element object and not available any more.
        this._localOptions = options
    }
     
    /**
     * The alternative constructor, that takes as args parent Widget and raw
     * html string and returns a new Widget object based on given html string 
     * @param  {Widget} parent  -  where to place this 
     * @param  {string} rawHTML  -  e.g "<div>example</div>"
     * @returns {Widget} Widget
     */
    static fromHTML(parent, rawHTML) {
        let element = Widget.makeElementFromHTML(rawHTML)
        let Widget = new Widget(parent)
        Widget.element = element
        return Widget
    }
    
    /**
     * Creates HTML Element from a raw string.
     * 
     * @param  {string} rawHTML  -  e.g "<div>example</div>"
     */
    static makeElementFromHTML(rawHTML) {
        let parser = new DOMParser()
        let newDoc = parser.parseFromString(rawHTML, 'text/html')
        let element = newDoc.body.firstElementChild
        return element
    }

    /**
     * Places this.element inside the specified parent widget
     * (renders it).
     */
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
    /**
     * Is this.element already on the page?
     */
    isBuilded(){
        if(document.getElementById(this.id)){
            return true
        } else {
            return false
        }
    }

    set options(newOptions) {
        delete newOptions.tagName
        try {
            Object.assign(this.element, newOptions)
        } catch(err) {
            console.error(`cannot assign given options ${newOptions} to the`
                          + `HTML element of the Widget`)
            throw err
        }
    }
    
    /**
     * Make id for this instance from some random integers and 
     * the character which will be concatenated to this integers
     * (may use to represent type of this Widget, for example).
     * 
     * Usage:
     * ```
     * > this.makeID('MyWidgetType')
     * 'MyWidgetType14336'
     * 
     * > this.makeID('w')
     * 'w54023'
     * ```
     * @param  {string} typeChar  - 
     */
    makeId(typeChar) {
        let randInt = Math.floor(Math.random() * 99999)
        return typeChar + randInt
    }
    
    /**
     * Removes HTML element of this Widget from the document.
     * Can be restored via this.build() 
     */
    remove() {
        this.element.remove()
    }
    /**
     * Set this.element.style.display to 'none' - hides im from the page
     */
    hide() {
        if(this._defaultDisplayMode != 'none'){
            let currentMode = this.element.style.display
            this.element._defaultDisplayMode = currentMode
        }
        this.element.style.display = 'none'
    }
    
    /**
     * Sets this.element.style.display to the value, that was
     * given during initialization of this Widget instance
     */
    show() {
        this.element.style.display = this._defaultDisplayMode
    }
    
    /**
     * Make user unable to interact with this.element on the page
     */
    disable() {
        this.element.disabled = true
    }
    
    /**
     * Make user able to interact with this.element on the page (if it was
     * disabled)
     */
    enable() {
        this.element.disabled = false
    }

    addCssClass(className) {
        this.element.classList.add(className)
    }

    removeCssClass(className) {
        this.element.classList.remove(className)
    }
    
    /**
     * Validate args.
     * @param  {Widget} parent
     * @param  {object} options
     */
    _checkTypes(parent, options) {
        if (
            !(parent instanceof Widget)
            & (parent.id != '_main-container')
        ) {
            throw new TypeError('first argument (parent) should'
                                + 'be instance of Widget')
        }
    }
}