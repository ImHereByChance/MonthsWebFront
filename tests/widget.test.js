const {Widget} = require('../src/widgets/widget')


document.body.innerHTML = '<div id="_main-container"></div>'
const _mainContainer = document.getElementById('_main-container')


test('Widget builded', () => {
    // inside #mainContainer
    const testWidget_1 = new Widget(_mainContainer, {
        innerText: 'test', 
        id: 'testWG_1'
    })
    testWidget_1.build()
    expect(testWidget_1.element).toBe(document.querySelector('#testWG_1'))
    
    // inside another Widget
    const testWidget_2 = new Widget(testWidget_1, {
        tagName: 'input',
        type: 'text', 
        id: 'testWG_2'
    })
    testWidget_2.build()
    let builded_2 = document.querySelector('#testWG_2')
    expect(testWidget_2.element).toBe(builded_2)
    expect(testWidget_2.parent.element).toBe(builded_2.parentNode)
})

test('Widget raises custom error if invalid "parent" arg was given', () => {
    expect(() => {
        testWidget = new Widget('wrong arg type')
    }).toThrow('first argument (parent) should be an instance of Widget')

    expect(() => {
        testWidget = new Widget(-1)
    }).toThrow('first argument (parent) should be an instance of Widget')
})

test('Widget removes itself from document', () => {
    const testWidget_3 = new Widget(_mainContainer, {
        innerText: 'test', 
        id: 'testWG_3'
    })
    testWidget_3.build()

    testWidget_3.remove()
    expect(document.querySelector('#testWG_3')).toBe(null)
})
