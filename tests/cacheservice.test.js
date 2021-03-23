const {cacheService, TaskObject, TaskArray, DatesArray} = require('../src/cacheservice')
const {copyObject} = require('../src/tools')


// ----TaskObject test----

// SETUPS:
// task as it comes from server (parsed from JSON object)
const taskFromServer = {
    id: 1,
    date: '2021-02-02T00:00:00.000+00:00',
    init_date: '2021-02-01T00:00:00.000+00:00',
    title: 'task from server',
    description: "user task just received from server " +
    "and retrieved from JSON",
    interval: "every_day",
    autoshift: false,
    completion: '2021-02-01T00:00:00.000+00:00',
    files: [ 
        { id: 1, link: 'file/for/task from server', related_task_id: 1 },
        { id: 1,
          link: 'second_file/for/task from server',
          related_task_id: 1 } 
    ]
}
    
test('TaskObject throws error if no id', () => {
    
    let taskWithoutId = copyObject(taskFromServer)
    taskWithoutId.id = undefined
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

test('TaskObject._DateField converts date-isostring to Date()', () => {

    let taskObject = new TaskObject(taskFromServer)
    expect(taskObject.date).toStrictEqual(new Date(taskFromServer.date))

})

test('TaskObject.object._DateField throws TypeError if invalid value was given', () => {
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

test('TaskObject.object.completion is whether a date or false', () => {
    
    let taskWithCompletionFalse = copyObject(taskFromServer)
    taskWithCompletionFalse.completion = false
    let taskObject = new TaskObject(taskWithCompletionFalse)
    expect(taskObject.completion).toBe(false)
    
})


test('TaskObject throws error if given autoshift ' + 
     'when interval value already exists',() => {
    
    let taskObject = new TaskObject(taskFromServer)
    expect(() => {
        taskObject.interval = 'every_day'
        taskObject.autoshift = true
    }).toThrow('cannot assign autoshift to the ' + 
               'task where exists interval value')

})

test('TaskObject throws error if given interval '  + 
     'when autoshift value already exists', () => {

        let taskObject = new TaskObject(taskFromServer)
        taskObject.interval = 'no'
        taskObject.autoshift = true
        expect(() => {
            taskObject.interval = 'every_day'
        }).toThrow('cannot assign interval to the task ' + 
                   'where exists autoshift value')

})

test('TaskObject return it own fields as an object with Date objects ' +
     'converted to ISOStrings with trailing timezone notation', () => {

    expect(new TaskObject(taskFromServer).object)
        .toEqual(taskFromServer)
        
})


// ----MonthTasks test----

// SETUPs:
// generate fake array of tasks and TaskObjects.

let taskObjectsExample = []
for (let i=1; i<11; i++) {
    let newTask = new TaskObject(taskFromServer)
    newTask.id = i
    newTask.title = newTask.title + ` #${i}`
    newTask.description = newTask.description + ` #${i}`
    newTask.interval = 'no'
    newTask.date = new Date(newTask.date.setDate(i))
    newTask.init_date = new Date (newTask.init_date.setDate(i))
    // tasks with id 3,6,9 will be marked as completed
    if (i % 3 === 0) {
        newTask.completion = newTask.date
        newTask.description = newTask.description + ' - completed' 
    } else {
        newTask.completion = false
    }
    taskObjectsExample.push(newTask)
}
`
console.log('"taskObjectsExample" - array of TaskObjects generated ' + 
            'for testing MonthTasks class', taskObjectsExample)
`

test('TaskArray.checkDailyTasks returns "got tasks" string', () => {
    let taskArray = TaskArray.from(taskObjectsExample)
    
    expect(taskArray.checkDailyTasks(new Date(2021, 1, 1))).toBe('got tasks')
    expect(taskArray.checkDailyTasks(new Date(2021, 1, 2))).toBe('got tasks')

    // case when there is completed and uncompleted task at the same date
    // should also return 'got tasks'
    let extraTask = new TaskObject(taskArray[2]._object)
    extraTask.id = 99
    extraTask.title = 'extra task for tasting'
    extraTask.completion = false
    taskArray.push(extraTask) 
    expect(taskArray.checkDailyTasks(new Date(2021, 1, 3))).toBe('got tasks')
})

test('TaskArray.checkDailyTasks returns "tasks done" string', () => {

    let taskArray = TaskArray.from(taskObjectsExample)
    
    expect(taskArray.checkDailyTasks(new Date(2021, 1, 3))).toBe('tasks done')
    expect(taskArray.checkDailyTasks(new Date(2021, 1, 6))).toBe('tasks done')
    expect(taskArray.checkDailyTasks(new Date(2021, 1, 9))).toBe('tasks done')

})

test('TaskArray.checkDailyTasks returns "no tasks" string', () => {

    let taskArray = TaskArray.from(taskObjectsExample)

    expect(taskArray.checkDailyTasks(new Date(2021, 1, 11)))
        .toBe('no tasks')
    
    expect(taskArray.checkDailyTasks(new Date(2021, 0, 31)))
        .toBe('no tasks')
        
    expect(taskArray.checkDailyTasks(new Date(2021, 0, 31)))
        .toBe('no tasks')   
})

test('TaskArray.getDailyTasks', () => {

    let taskArray = TaskArray.from(taskObjectsExample)
    let expectedOutput = [
        new TaskObject({
            id: 1,
            date: '2021-02-01T00:00:00.000Z',
            init_date: '2021-02-01T00:00:00.000Z',
            title: 'task from server #1',
            description: "user task just received from server " +
                         "and retrieved from JSON #1",
            interval: 'no',
            autoshift: false,
            completion: false,
            files: [
                { id: 1, link: 'file/for/task from server', related_task_id: 1 },
                { id: 1,
                  link: 'second_file/for/task from server',
                  related_task_id: 1 },
            ] 
        })
    ]

    expect(taskArray.getDailyTasks(new Date(2021, 1, 1)))
        .toEqual(expectedOutput)

    taskArray.push(taskArray[0])
    expectedOutput.push(expectedOutput[0])
    
    expect(taskArray.getDailyTasks(new Date(2021, 1, 1)))
        .toEqual(expectedOutput)

    expect(taskArray.getDailyTasks(new Date(2021, 1, 11)))
    .toEqual( [] )
})


//--- 
// SETUPS:
let dateStringsArray = [
'2021-02-01T00:00:00+00:00',
'2021-02-02T00:00:00+00:00',
'2021-02-03T00:00:00+00:00',
'2021-02-04T00:00:00+00:00',
]


test('DatesArray converts date-strings to Date objects ' + 
'during initialization', () => {

    let datesArray = new DatesArray(...dateStringsArray)

    expect(datesArray.map(d => d.getTime()))
        .toEqual(dateStringsArray
            .map(d => new Date(d))
            .map(d => d.getTime())
        )
    })

test('DatesArray converts date-strings to Date objects ' + 
'when used DatesArray.from() method', () => {
    
    let datesArray2 = DatesArray.from(dateStringsArray)
    
    expect(datesArray2.map(d => d.getTime()))
        .toEqual(dateStringsArray
            .map(d => new Date(d))
            .map(d => d.getTime())
        )
})
        
// ----CacheService test----

// SETUPs:
// create class imitating behavior of the dependency of the CacheService

class TransportServiceImitation {
    static getChangeMonthPack(date) {
        return new Promise((resolve, reject) => {
            let dates = []
            let startDate = new Date(2021, 1, 1)
            let newDate = new Date()
            
            // push to dates array: 1 - 28 Feb, 2021
            for (let i=1; i<29; i++) {
                newDate = new Date(startDate.setDate(i))
                dates.push(newDate)
            }
            
            // push to dates array: 1 - 11 March, 2021
            startDate = new Date(2021, 2, 1)
            for (let i=1; i<15; i++) {
                newDate = new Date(startDate.setDate(i))
                dates.push(newDate)
            }
            
            let tasksArray = [
                
                {id: 1,
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
                ]}
                
            ]

            let monthPack =  {
                monthDates: dates,
                tasksArray: tasksArray
            }
            resolve(monthPack)
        })
    }

}


