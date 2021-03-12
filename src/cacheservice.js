const {copyObject} = require('./copy')


class CacheService {
    constructor(transportService) {
        this.transportService = transportService
        
        this.currentDate = new Date()
        
        this.pageDate = this.currentDate
        
        this.pageDaysArr = []
        
        this.taskList = []
        // Promise, of the data from the server
        this.readyToRun = this._requestDataPack(this.currentDate)  
    }

    // TODO refactor following 3 methods
    _requestDataPack(date) {
        // returns promise, that should contain the data from the server
        return transportService.getChangeMonthPack(date)
            .then(pack => {
                this.pageDate = date
                this.pageDaysArr = pack.monthdates.map(i => new Date(i))
                this.taskList = pack.tasks
                console.log('%c requested data successfully received from the server',
                            'color: yellowgreen')
                console.log(this.taskList)
            })
    }
    reqChangeDate(newDate) {
        // also returns promise, that indicates receiving data from server
        console.log('%c requesting data for changing page date: ' +
                    `${this.pageDate}`,
                    'color: cornflowerblue')
        return this._requestDataPack(newDate)
            .catch(err => {
                console.log(`%c Failed to receive data for changing page date: 
                ${this.pageDate}`,
                'color: crimson')
                throw err
            })
    }
    refreshData() {
        return this.reqChangeDate(this.pageDate)
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
            let taskIndex = this.taskList.indexOf(deletedTask)
            this.taskList.splice(taskIndex, 1)
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
            for(let task of this.taskList) {
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
        
        for (let task of this.taskList) {
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
        
        for(let task of this.taskList) {
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
}


/**Self-validating Object, of the user's task.
 * @param  {} object
 */
class TaskObject {
    constructor(object) {
        // Task identifier
        this.id = object.id
        this._id
        // Current date of the task. The task might be created on another
        // date and repeated according to this.interval parameter.
        // Therefore this.date and this.init_date can differ)
        this.date = object.date
        this._date
        // Date when the task was created by user
        this.init_date = object.init_date
        this._init_date
        // User-defined task name 
        this.title = object.title
        this._title 
        // user-defined description of the task 
        this.description = object.description
        this._description 
        // date and time when a user marked the task as completed
        this.completion = object.completion
        this._completion
        // Parameter which represents whether the task should be repeated
        // according to certain interval of time or not
        this.interval = object.interval
        this._interval
        // a value indicating whether the task should be rescheduled to the
        // next date if it was not completed on time (shifted if not completed)
        this.autoshift = object.autoshift
        this._autoshift
        // File, attached to the user-created task (text document,
        // spreadsheet, etc.). File represented as a link to the place
        // where the task stored.
        this.files = object.files
        this._files
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
            this._id = newValue
        }
    }

    get id() {
        return this._interval
    }
    
    set date(newValue) {
        try {
            this._date = this._DateField(newValue)
        } catch(err) {
            throw TypeError(`Invalid value of date: ${err.message}`)
        }
    }

    get date() {
        return this._date
    }

    set init_date(newValue) {
        try {
            this._init_date = this._DateField(newValue)
        } catch(err) {
            throw TypeError(`Invalid value of init_date: ${err.message}`)
        }
    }

    get init_date() {
        return this._init_date
    }

    set title(newValue) {
        this._title = toString(newValue)
    }

    get title() {
        return this._title
    }

    set description(newValue) {
        this._description = toString(newValue)
    }

    set completion(newValue) {
        if (newValue === false) {
            this._completion = newValue
        } else {
            try {
                this._completion = this._DateField(newValue)
            } catch(err) {
                throw TypeError(`Invalid value of completion: ${err.message}`)
            } 
        }
    }

    get completion() {
        return this._completion
    }

    set interval(newValue) {
        if (newValue === 'no' || newValue === false) {
            this._interval = newValue
        }
        else if (!this.autoshift) {
            this._interval = newValue
        } else {
            throw 'cannot assign interval to the task ' + 
                  'where exists autoshift value'
        } 
    }

    get interval() {
        return this._interval
    }

    set autoshift(newValue) {
        if (newValue === false) {
            this._autoshift = newValue
        } else if (this.interval === 'no' || !this.interval) {
            this._autoshift = newValue
        } else {
            throw 'cannot assign autoshift to the ' + 
                  'task where exists interval value'
        }
    }

    get autoshift() {
        return this._autoshift
    }

    get files() {
        return this._files
    }

    set files(newValue) {
        // TODO: files attaching
        this._files = newValue
    }

    
    /**
     * @param  {object} definedValues
     */
    static getEmpty(definedValues) {
        let taskObj = {
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
        if(definedValues) {
            Object.assign(taskObj, definedValues)
        }
        return taskObj
    }

    /**
     * Descriptor that makes from given value a Date if it isn't
     * already type of Date.
     */
    _DateField(date) {
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
}


module.exports = {CacheService, TaskObject}
