const { Widget } = require('./widget.js')
const { IconButton24 } = require('./widget.common.js')
const { svgPaths } = require('./svgpaths.js')
const { DateFormat, translate } = require('./tools.js')

const CONFIG = require('./config')
const LOCALE = CONFIG.LOCALE


class TaskPanel extends Widget {
    constructor(parent, cacheService) {
        super(parent)

        this.id = 'tp-taskpanel'
        this.cacheService = cacheService

        // the appropriate DayButton on the calendar widget, which have
        // the same date
        this.relatedDayButton

        // Child widgets
        this.Topbar = new Widget(this, {
            id: 'tp-topbar',
        })
        this.DateLabel = new Widget(this.Topbar, {
            id: 'tp-dateLabel',
            innerText: ''
        })
        this.TaskList = new TaskList(this)

        this.CreateTaskBt = new IconButton24(this.Topbar, {
            id: 'tp-createTaskBt',
            onclick: this.TaskList.openTaskAdder.bind(this.TaskList)
        }, svgPaths.addTask)

    }

    get dailyTaskArray() {
        if (this.relatedDayButton) {
            let date = this.relatedDayButton.date
            return this.cacheService.tasksArray.getDailyTasks(date)
        } else {
            return []
        }
    }

    build() {
        super.build()

        this.Topbar.build()
        this.DateLabel.build()
        this.TaskList.build()
    }

    boundDayBt(dayButton) {
        this.relatedDayButton = dayButton
        this.TaskList.update()
        this.DateLabel.element.innerText = DateFormat.dateLabel(
                                                dayButton.date, LOCALE)
        
        if (!this.CreateTaskBt.isBuilded()) {
            this.CreateTaskBt.build()
        }
    }

}


class TaskList extends Widget {
    constructor(parent) {
        super(parent)
        this.parent = parent
        this.id = 'tp-taskList'
        this.cacheService = this.parent.cacheService
        this.options = { innerText: translate('No tasks', LOCALE) }

        this.taskItemArray = this.initTaskItems()
    }

    initTaskItems() {
        let tasksToShow = this.taskArray
        if (tasksToShow) {
            let itemsArray = []
            for (let task of tasksToShow) {
                let taskItem = new TaskItem(this, task)
                itemsArray.push(taskItem)
            }
            return itemsArray
        }
    }

    build() {
        super.build()
        this.makeListObserver()
        this.buildTaskItems()

    }

    buildTaskItems() {
        if (this.taskItemArray) {
            this.taskItemArray.forEach(taskItem => taskItem.build())
        }
    }

    makeListObserver() {
        // creates a MutationObserver object that keeps track of the number
        // of tasks items in the TaskList div. If it becomes 0, the message “all tasks
        // completed” will be displayed.
        const itemsObserver = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (!mutation.target.childElementCount) {
                    mutation.target.style.fontSize = '18px'
                } else {
                    mutation.target.style.fontSize = '0px'
                }
                return
            }
        })
        const observerConfig = { attributes: false, childList: true, subtree: false }
        itemsObserver.observe(this.element, observerConfig)
    }

    clear() {
        this.taskItemArray.forEach(taskItem => taskItem.remove())
    }

    update() {
        this.clear()
        this.taskItemArray = this.initTaskItems()
        this.buildTaskItems()
    }


    openTaskAdder() {
        let adder = new TaskAdder(this)
        this.taskItemArray.push(adder)
        adder.build()

    }

    get relatedDayButton() {
        return this.parent.relatedDayButton
    }

    get taskArray() {
        return this.parent.dailyTaskArray
    }

    get date() {
        return this.parent.relatedDayButton.date
    }

}


class TaskItem extends Widget {
    constructor(parent, taskObj) {
        super(parent)

        this.parent = parent
        this.cacheService = this.parent.cacheService
        this.taskObj = taskObj ? taskObj : this._emptyTaskObj
        this.id = this.makeId('ti')
        this.element.className = 'tp-taskitem'

        // checkbox to mark the task as completed or vice versa
        this.checkDone = new Widget(this, {
            tagName: 'input',
            className: 'tp-taskCheckout',
            type: 'checkbox',
            checked: this.taskObj.completion,
            onclick: this.checkUncheckCompletion.bind(this)
        }),

            // container for a divs that displays the title and description
            // of the task or widgets for the user to edit the task
            this.Main = new Widget(this, {
                className: 'tp-taskitemMain'
            })


        // divs that displays task's title and description
        this.defaultWidgets = [
            this.Title = new Widget(this.Main, {
                className: 'tp-taskitemTitle',
                innerText: this.taskObj.title
            }),
            this.Description = new Widget(this.Main, {
                className: 'tp-taskitemDescr',
                innerText: this.taskObj.description,
            }),

        ]

        // widgets for editing task fields (user input)
        this.editingWidgets = [

            this.SaveCloseCont = new Widget(this.Main, {
                className: 'tp-taskitemSaveClose',
            }),
            this.SaveButton = new IconButton24(this.SaveCloseCont, {
                className: 'save_task',
                onclick: this.saveInputValues.bind(this)
            }, svgPaths.saveTask),
            this.CloseEditorButton = new IconButton24(this.SaveCloseCont, {
                className: 'closeEditor',
                onclick: this.switchToDefaultMode.bind(this),
            }, svgPaths.closeEditor),

            this.TaskTimeSettingsCont = new Widget(this.Main, {
                className: 'tp-taskTimeSettings'
            }),
            this.DateSettings = new TaskSettingsElement(
                this.TaskTimeSettingsCont,
                'date', this.taskObj, translate('Postpone:', LOCALE)
            ),
            this.IntervalSettings = new TaskSettingsElement(this.TaskTimeSettingsCont,
                'interval', this.taskObj, translate('Repeat:', LOCALE)),
            this.AutoshiftSettings = new TaskSettingsElement(this.TaskTimeSettingsCont,
                'autoshift', this.taskObj, translate('Auto postpone:', LOCALE)),

            this.InputTitle = new TaskSettingsElement(this.Main, 'input', this.taskObj,
                translate('Task name:', LOCALE)),

            this.InputDescription = new TaskSettingsElement(this.Main, 'textarea', this.taskObj,
                translate('Description:', LOCALE))
        ]

        // buttons 'edit task(switch to editor mode)' and 'delete task'
        // (located outside the task item's Main container)
        this.RightButtons = [
            this.RightButtonsCont = new Widget(this, {
                className: 'tp-taskitemRightBtns'
            }),
            this.EditTaskButton = new IconButton24(this.RightButtonsCont, {
                className: 'button-icon24',
                onclick: this.switchToEditMode.bind(this)
            }, svgPaths.editTask),
            this.DeleteTaskButton = new IconButton24(this.RightButtonsCont, {
                className: 'button-icon24',
                onclick: this.removeSelf.bind(this)
            }, svgPaths.deleteTask)
        ]
    }

    build() {
        super.build()
        this.checkDone.build()
        this.Main.build()
        this.RightButtons.forEach(wg => wg.build())

        this.SaveButton.addCssClass('ti-SaveTaskBt')
        this.CloseEditorButton.addCssClass('ti-CloseEditorBt')
        this.DeleteTaskButton.addCssClass('tp-RightBtnsDelTask')
        this.EditTaskButton.addCssClass('tp-RightBtnsEditTask')

        this.defaultWidgets.forEach(wg => wg.build())
    }

    switchToEditMode() {
        // hides a task's title and description divs and shows the widgets
        // for editing a task fields and options

        this.checkDone.hide()
        this.RightButtonsCont.hide()
        this.defaultWidgets.forEach(wg => wg.hide())
        this.editingWidgets.forEach(wg => {
            if (!wg.isBuilded()) {
                wg.build()
            } else {
                wg.show()
            }
        })
        this.makeConstraints()
    }

    switchToDefaultMode() {
        // hides a task's title and description divs and shows the widgets for
        // editing a task fields and options

        this.checkDone.show()
        this.defaultWidgets.forEach(wg => wg.show())
        this.editingWidgets.forEach(wg => wg.hide())
        this.RightButtonsCont.show()
    }

    removeSelf() {
        // remove the task-item widget from the TaskList widget and delete
        // related entry about the task in the database
        this.cacheService.deleteTask(this.taskObj)
            .then(() => {
                this.remove()
                // if the task have interval repeat and we need to refresh
                // all of DayButtons on calendar widget to deleted repeats 
                // that shouldn't exist anymore
                if (this.taskObj.interval) {
                    calendar.refreshMonth()
                } else {
                    this.relatedDayButton.updStatus()
                }
            })
            .catch(err => {
                throw err
            })
    }

    takeInputValues() {
        // returns the values of user input from a task editing widgets

        return {
            init_date: new Date(this.DateSettings.value),
            date: new Date(this.DateSettings.value),
            interval: this.IntervalSettings.value,
            autoshift: eval(this.AutoshiftSettings.value),  // "true" -> true
            title: this.InputTitle.value,
            description: this.InputDescription.value
        }
    }

    updateFields(newTaskFields) {
        // Updates the text of the divs, that displaying a task's
        // title and description

        this.Title.element.innerText = newTaskFields.title
        this.Description.element.innerText = newTaskFields.description
    }

    makeConstraints() {
        // To avoid conflicting states, in a task editing mode:
        //     1) disables the widgets for date changing and "auto-postpone until
        // completion" when chosen one of a task's interval repeating options;
        //     2) disables the date changing and 'auto-postpone until completion' 
        // widgets when a task marked as completed in the task settings;
        //     3) disables the interval choosing widget when 'postpone until 
        // completion' option is active;  

        const dateInput = this.DateSettings.inputWidget
        const intervalInput = this.IntervalSettings.inputWidget
        const autoshiftInput = this.AutoshiftSettings.inputWidget
        const checkDone = this.checkDone.element

        if (intervalInput.value != 'no' || checkDone.checked) {
            dateInput.disable()
            autoshiftInput.disable()
        } else if (!checkDone.checked) {
            dateInput.enable()
            autoshiftInput.enable()
        }
        intervalInput.element.addEventListener('change', event => {
            if (event.target.value != 'no' && !checkDone.checked) {
                dateInput.disable()
                autoshiftInput.disable()
            } else if (!checkDone.checked) {
                dateInput.enable()
                autoshiftInput.enable()
            }
        })

        if (autoshiftInput.value === 'true') {
            intervalInput.disable()
        }
        autoshiftInput.element.addEventListener('change', event => {
            if (event.target.value === 'true') {
                intervalInput.disable()
            } else {
                intervalInput.enable()
            }
        })
    }

    saveInputValues() {
        // takes the user's input from the task editing widgets and push it
        // on the server via cacheService.edit Task() method. If server succeed,
        // updates appearance ot the application appropriately

        let newTaskFields = this.takeInputValues()
        newTaskFields.id = this.taskObj.id

        this.cacheService.editTask(newTaskFields)
            .then(() => {
                calendar.updDayButtonsStatus()
                taskPanel.TaskList.update()
            })
            .catch(err => {
                console.error(err)
            })
    }

    checkUncheckCompletion() {
        // sends user input from checkDone checkbox (which indicates whether
        // a task marked as completed or not) to the server. If server
        // responds with succeed, the appearance of the application will
        // appropriately updated

        let checkObject = {
            id: this.taskObj.id,
            date: this.taskObj.date,
        }

        if (this.checkDone.element.checked) {
            checkObject.completion = this.taskObj.date
        } else {
            checkObject.completion = false
        }
        this.cacheService.checkUncheckTask(checkObject)
            .then(() => {
                this.relatedDayButton.updStatus()
            })
        //TODO: error catching

    }

    get relatedDayButton() {
        return this.parent.relatedDayButton
    }

    get _emptyTaskObj() {
        console.log(this.parent)
        return TaskObject.getEmpty({
            date: this.parent.date,
            init_date: this.parent.date,
        })
    }

}


class TaskAdder extends TaskItem {
    constructor(parent) {
        super(parent)
        this.id = this.makeId('ta')
    }

    build() {
        super.build()
        this.switchToEditMode()
        this.reBind()
        this.element.style.order = '-1'
    }

    reBind() {
        this.CloseEditorButton.element.onclick = this.remove.bind(this)
        this.SaveButton.element.onclick = this.createNewTask.bind(this)
    }

    createNewTask() {
        let newTask = this.takeInputValues()
        newTask.id = this.taskObj.id

        let thereIsInterval
        if (newTask.interval && newTask.interval != 'no') {
            thereIsInterval = true
        } else {
            thereIsInterval = false
        }

        this.cacheService.createTask(newTask)
            .then(() => {
                this.remove()
                calendar.updDayButtonsStatus()
                taskPanel.TaskList.update()
                if (thereIsInterval) {
                    calendar.refreshMonth()
                }
            })
            .catch(err => {
                console.error('catched in the end point:', err)
            })
    }
}


class TaskSettingsElement extends Widget {
    constructor(parent, inputType, taskObj, labelText) {
        super(parent)
        this.parent = parent
        this.element.className = 'tp-SettingsElement'
        this.taskObj = taskObj

        this.inputWidget = this.initInputWg(inputType)
        this.label = new Widget(this, { tagName: 'label', innerText: labelText })
    }

    build() {
        super.build()
        this.label.build()
        this.inputWidget.build()
    }

    get value() {
        return this.inputWidget.value
    }

    set value(defaultValue) {
        this.inputWidget.value = defaultValue
    }

    initInputWg(type) {
        if (type === 'date') {
            return new Widget(this, {
                tagName: 'input',
                type: 'date',
                name: 'new_date',
                value: this.taskObj.init_date.toISOString().slice(0, 10)
            })
        } else if (type === 'interval') {
            const inputWg = new Select(this, [
                ['no', 'no interval'],
                ['every_day', 'every day'],
                ['every_workday', 'every workday'],
                ['every_week', 'every week'],
                ['every_month', 'every month'],
                ['every_year', 'every year']
            ])
            inputWg.defaultValue = this.taskObj.interval
            return inputWg
        } else if (type === 'autoshift') {
            const inputWg = new Select(this, [
                [false, 'no'],
                [true, 'until completed']
            ])
            inputWg.defaultValue = this.taskObj.autoshift
            return inputWg
        } else if (type === 'input') {
            const inputWg = new Widget(this, {
                tagName: 'input',
                type: 'text',
                name: 'new_title',
                maxlength: "80",
                minlength: "1",
                value: this.taskObj.title
            })
            return inputWg
        } else if (type === 'textarea') {
            return new Widget(this, {
                tagName: 'textarea',
                name: 'newDescription',
                rows: '5',
                cols: '3',
                value: this.taskObj.description
            })
        }
    }

    get value() {
        return this.inputWidget.element.value
    }

    set value(newValue) {
        this.inputWidget.element.value = newValue
    }

    get cacheService() {
        return this.parent.cacheService
    }

}


class Select extends Widget {
    //  Constructor of the Widget takes two args: parent Widget and optionList.
    //  OptionsList arg should be represented as an array of arrays. 
    //  Each nested array must consists of two items: 
    //  1) value attr of html <option> element;
    //  2) inner text of <option>.
    constructor(parent, optionsList) {
        super(parent)
        this.tag = 'select'
        this.element = document.createElement(this.tag)
        this.optionsList = this.initOptions(optionsList)
        this.defaultValue
    }

    get value() {
        return this.element.value
    }

    set value(newValue) {
        this.element.value = newValue
    }

    initOptions(optionsList) {
        let optionWidgets = []
        optionsList.forEach(pair => {
            let value = pair[0]
            let text = translate(pair[1], LOCALE)
            const optionWidget = new Widget(this, {
                tagName: 'option',
                value: value,
                text: text
            })
            optionWidgets.push(optionWidget)
        })
        return optionWidgets
    }

    build() {
        super.build()
        this.optionsList.forEach(opt => opt.build())

        if (this.defaultValue) {
            this.value = this.defaultValue
        }
    }
}


module.exports = { TaskPanel }
