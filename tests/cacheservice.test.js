const { ContextExclusionPlugin } = require('webpack');
const {cacheService, TaskObject} = require('../src/cacheservice');
const {copyObject} = require('../src/copy')


const taskFromServer = {
    id: 1,
    date: '2021-02-02T00:00:00+00:00',
    init_date: '2021-02-01T00:00:00+00:00',
    title: 'task from server',
    description: "user task just received from server" +
    "and retrieved from JSON",
    interval: "every_day",
    autoshift: false,
    completion: '2021-02-01T00:00:00+00:00',
    files: [ 
        { id: 1, link: 'file/for/task from server', related_task_id: 1 },
        { id: 1,
          link: 'second_file/for/task from server',
          related_task_id: 1 } 
    ]
}
    
test('TaskObject throws error if no id', () => {
    
    let taskWithoutId = copyObject(taskFromServer)
    delete taskWithoutId.id
    expect(() => {
        new TaskObject(taskWithoutId)
    }).toThrow('task should have id')
})

test('TaskObject throws error if invalid id', () => {

    let taskWithInvalidId = copyObject(taskFromServer)
    taskWithInvalidId.id  = 'string instead number'
    expect(() => {
        new TaskObject(taskWithInvalidId)
    }).toThrow('task id should be an integer')

})

test('TaskObject._DateField converts date-isostring to Date', () => {

    let taskObject = new TaskObject(taskFromServer)
    expect(taskObject.date).toStrictEqual(new Date(taskFromServer.date))

})

test('Task.object._DateField throws error if invalid value was given', () => {
    let taskWithInvalidDate = copyObject(taskFromServer)
    taskWithInvalidDate.date = '20invalid_date20'
    expect(() => {
        new TaskObject(taskWithInvalidDate)
    }).toThrow(TypeError)

    let taskWithInvalidInitDate = copyObject(taskFromServer)
    taskWithInvalidInitDate.init_date = 42
    expect(() => {
        new TaskObject(taskWithInvalidInitDate)
    }).toThrow(TypeError)

    let taskWithInvalidDate2 = copyObject(taskFromServer)
    taskWithInvalidDate2.date = null 
    expect(() => {
        new TaskObject(taskWithInvalidDate2)
    }).toThrow(TypeError)
})

test('Task.object.completion is whether a date or false', () => {
    
    let taskWithCompletionFalse = copyObject(taskFromServer)
    taskWithCompletionFalse.completion = false
    let taskObject = new TaskObject(taskWithCompletionFalse)
    expect(taskObject.completion).toBe(false)
})

test('Task throws error if given autoshift ' + 
     'when interval value already exists',() => {
    
    let taskObject = new TaskObject(taskFromServer)
    expect(() => {
        taskObject.autoshift = true
    }).toThrow('cannot assign autoshift to the ' + 
               'task where exists interval value')

})

test('Task throws error if given interval '  + 
     'when autoshift value already exists', () => {

        let taskObject = new TaskObject(taskFromServer)
        taskObject.interval = 'no'
        taskObject.autoshift = true
        expect(() => {
            taskObject.interval = 'every_day'
        }).toThrow('cannot assign interval to the task ' + 
                   'where exists autoshift value')

})


