const { translate } = require('../src/tools')


const RU_locale = {
    lines: {'No tasks': 'Задач нет'} 
 }
 
test('translate translates', () => {
    
    expect(translate('No tasks', RU_locale)).toEqual('Задач нет')
    
    expect(translate('non-existent', RU_locale)).toEqual('non-existent')

})
