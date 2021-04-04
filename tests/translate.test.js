const {translate} = require('../src/translate')


const RU = {
    'No tasks': 'Задач нет' 
 }
 
test('translate translates', () => {
    
    expect(translate('No tasks', RU)).toEqual('Задач нет')
    
    expect(translate('non-existent', RU)).toEqual('non-existent')

})
