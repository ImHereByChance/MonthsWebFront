const {copyObject} = require('./copy')

class TaskArray extends Array {
    checkDailyTasks(checkingDate) {
        let haveDoneTasks = false
        for (let task of this) {
            if (this._equals(
                [task.date.getDate(), task.date.getMonth()],
                [checkingDate.getDate(), checkingDate.getMonth()]
            )) {
                if (!task.completion) {
                    return 'got tasks'
                } else {
                    haveDoneTasks = true
                }
                
            }
        }
        if (haveDoneTasks) {
            return 'tasks done'
        } else {
            return 'no tasks'
        }
    }

    /**
     * Simple function to compare two arrays
     * @param  {Array} a - first array
     * @param  {Array} b - second array
     */
    _equals(a, b) {
        return a.length === b.length && a.every((v, i) => v === b[i])
    }

}

class CacheService {
    constructor(transportService) {
        this.transportService = transportService
        
        this.today = new Date()
        
        this.pageDate = this.currentDate
        
        this.monthDaysArray = []
        
        this.taskArray = []
        // Promise, of the data from the server
        this.readyToRun = this._requestMonthPack(this.currentDate)  
    }


    setDate(newDate) {
        // also returns promise, that indicates receiving data from server
        console.log('%c requesting data for changing page date: ' +
                    `${this.pageDate}`, 'color: cornflowerblue')
        return this._requestMonthPack(newDate)
    }
    
    _requestMonthPack(date) {
        // returns promise, that should contain the data from the server
        return transportService.getChangeMonthPack(date)
            .then(pack => {
                this.pageDate = toDateField(date)
                this.monthDaysArray = pack.monthDates.map(d => new Date(d))
                this.tasksArray = pack.tasksArray
                
                console.log('%c requested data successfully received ' + 
                            'from the server', 'color: yellowgreen')
                console.log(this.tasksArray)
            })
            .catch(err => {
                console.log('%c Failed to receive data for changing ' + 
                            `page date: ${this.pageDate}`, 'color: crimson')
                throw err
            })
    }




    createTask(newTask) {
        return this.transportService.addNewTask(newTask)
        .then(() => {
            console.log('%c the task successfully added to DB', 'color: yellowgreen')
        })
        .then(() => this.refreshData())
        .catch(err => {
            console.error('fail to add the task')
            throw err
        })
    }
    
    editTask(changedFields) {
        return this.transportService.changeTask(changedFields)
        .then(() => {
            console.log('%c the task successfully changed at DB', 'color: yellowgreen')
        })
        .then(() => this.refreshData())
        .catch(err => {
            console.error('fail to edit the task')
            throw err
        })
    }
    
    deleteTask(deletedTask) {
        return this.transportService.deleteTask(deletedTask)
        .then(() => {
            console.log('%c the task was successfully deleted from DB', 'color: yellowgreen')
            let taskIndex = this.tasksArray.indexOf(deletedTask)
            this.tasksArray.splice(taskIndex, 1)
        })
        .catch(err => {
            console.error('failed to delete the task')
            throw err
        })
    }
    
    checkUncheckTask(checkingTask) {
        return this.transportService.checkUncheckTask(checkingTask)
        .then(() => {
            console.log('%c information about the task completion was changed on DB', 'color: yellowgreen')
            let unchangedTask
            for(let task of this.tasksArray) {
                if(task.id === checkingTask.id && task.date === checkingTask.date) {
                    task.completion = checkingTask.completion
                    break
                }
            }
        })
        .catch(err => {
            console.error('failed to change information about the task completion on DB')
            throw err
        })
    }
    
    // methods to move to another places
    checkDailyTasks(date) {
        throw ('move this method away from this class!') // TODO: fix it!
        let dateString = DateFormater.formatForBackend(date)
        let haveDoneTasks = false
        
        for (let task of this.tasksArray) {
            if (task.date === dateString) {
                if (!task.completion) {
                    return 'got tasks'
                } else {
                    haveDoneTasks = true
                }
            }
        }
        if (haveDoneTasks) {
            return 'tasks done'
        } else {
            return 'no tasks'
        }
    }
    getDailyTasks(date){
        throw ('move this method away from this class!') // TODO: fix it!
        let dateString = DateFormater.formatForBackend(date)
        let dailyTasks = []
        
        for(let task of this.tasksArray) {
            if (dateString === task.date){
                dailyTasks.push(task)
            }
        }
        return dailyTasks
    }
    isDateInMonth(date) {
        throw ('move this method away from this class!') // TODO: fix it!
        return date.getMonth() === this.pageDate.getMonth()
    }

    // deprecated
    get taskList() {
        throw 'this property renamed to this.tasksArray'
    }
    get pageDaysArr() {
        throw 'this property renamed to this.monthDaysArray'
    }
    _requestDataPack(...args) {
        throw 'this method renamed to this._requestMonthPack()'
    }
    reqChangeDate(...args) {
        throw 'this method renamed to this.setDate()'
    }
    refreshData() {
        throw "method deprecated - use setDate() instead it"
    }

}


/**Self-validating object of the user's task.
 * Accepts an object from the server, where fields are parameters of
 * a user task, checks them, throws an error if the data is not
 * consistent (there are mutually exclusive fields, etc.)
 * @param  {object} object
 */
class TaskObject {
    constructor(object) {
        this._object = copyObject(object)

        // Task identifier
        this.id = object.id
        // Current date of the task. The task might be created on another
        // date and repeated according to this.interval parameter.
        // Therefore this.date and this.init_date can differ)
        this.date = object.date
        // Date when the task was created by user
        this.init_date = object.init_date
        // User-defined task name 
        this.title = object.title
        // user-defined description of the task 
        this.description = object.description
        // date and time when a user marked the task as completed
        this.completion = object.completion
        // Parameter which represents whether the task should be repeated
        // according to certain interval of time or not
        this.interval = object.interval
        // a value indicating whether the task should be rescheduled to the
        // next date if it was not completed on time (shifted if not completed)
        this.autoshift = object.autoshift
        // File, attached to the user-created task (text document,
        // spreadsheet, etc.). File represented as a link to the place
        // where the task stored.
        this.files = object.files
    }

    set id(newValue) {
        // TODO: need custom error
        if (!newValue) {
            throw 'task should have id'
        } else if (Math.ceil(newValue) != newValue) {
            throw 'task id should be an integer'
        } else if (newValue < 1) {
            throw 'task id should be >= 1'
        } else {
            this._object.id = newValue
        }
    }

    get id() {
        return this._object.id
    }
    
    set date(newValue) {
        try {
            this._object.date = toDateField(newValue)
        } catch(err) {
            throw TypeError(`Invalid value of date: ${err.message}`)
        }
    }
    
    get date() {
        return this._object.date
    }

    set init_date(newValue) {
        try {
            this._object.init_date = toDateField(newValue)
        } catch(err) {
            throw TypeError(`Invalid value of init_date: ${err.message}`)
        }
    }

    get init_date() {
        return this._object.init_date
    }
 
    set title(newValue) {
        this._object.title = newValue
    }

    get title() {
        return this._object.title
    }

    set description(newValue) {
        this._object.description = newValue
    }

    get description() {
        return this._object.description
    }

    set completion(newValue) {
        if (newValue === false) {
            this._object.completion = newValue
        } else {
            try {
                this._object.completion = toDateField(newValue)
            } catch(err) {
                throw TypeError(`Invalid value of completion: ${err.message}`)
            } 
        }
    }

    get completion() {
        return this._object.completion
    }

    set interval(newValue) {
        if (newValue === 'no' || newValue === false) {
            this._object.interval = newValue
        }
        else if (!this._object.autoshift) {
            this._object.interval = newValue
        } else {
            throw 'cannot assign interval to the task ' + 
                  'where exists autoshift value'
        } 
    }

    get interval() {
        return this._object.interval
    }

    set autoshift(newValue) {
        if (newValue === false) {
            this._object.autoshift = newValue
        } else if (this._object.interval === 'no' || !this._object.interval) {
            this._object.autoshift = newValue
        } else {
            throw ('cannot assign autoshift to the ' + 
                   'task where exists interval value')
        }
    }

    get autoshift() {
        return this._object.autoshift
    }

    set files(newValue) {
        // TODO: files attaching
        this._object.files = newValue
    }

    get files() {
        return this._object.files
    }

    static getEmpty(definedValues) {
        let emptyTaskObj = {
            id: undefined,
            date: undefined,
            init_date: undefined,
            title: '',
            description: '',
            completion: false,
            interval: 'no',
            autoshift: false,
            files: [],
        }
        if (definedValues) {
            Object.assign(emptyTaskObj, definedValues)
        }
        return emptyTaskObj
    }
}


/**
 * Function to make a Date from given value, if it isn't
 * already type of Date.
 */
function toDateField(date) {
    if (date instanceof Date) {
        return date
    } else if (typeof date === 'string'){
        const dateObject = new Date(date)
        
        if (isNaN(dateObject.getDate())) {
            throw new TypeError ('cannot make valid Date object ' +
                                    `from "${date}"`)
        } else {
            return dateObject
        }
    }
    else {
        throw new TypeError ('cannot make valid Date object ' +
                                `from "${date}" - only Date objects ` +
                                'and strings are allowed as args')
    }
}


module.exports = {CacheService, TaskObject, TaskArray}
