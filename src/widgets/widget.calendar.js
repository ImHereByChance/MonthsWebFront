const { Widget } = require('./widget')
const { IconButton24 } = require('./widget.common')
const { svgPaths } = require('../svgpaths')
const { DateFormat, resetTimezone } = require('../tools')


class Calendar extends Widget {
    constructor(parent, cacheService) {
        super(parent)

        this.id = 'c-calendar'
        this.cacheService = cacheService

        this.date = this.cacheService.pageDate
        this.daysArr = this.cacheService.datesArray

        // Child widgets
        this.childWidgets = [
            this.Topbar = new Widget(this, { id: 'c-topbar' }),

            this.DaysFrame = new Widget(this, { id: 'c-daysFrame' }),

            this.PrevMonthBtn = new IconButton24(this.Topbar, {
                id: 'monthBack-bt',
                onclick: this.toPrevMonth.bind(this),
            }, svgPaths.pointLeft),


            this.MonthLabel = new Widget(this.Topbar, {
                id: 'c-topbar__monthLabel',
                innerText: DateFormat.monthLabel(this.date),
                onclick: this.switchLabelToPicker.bind(this),
            }),
            
            this.MonthPicker = new Widget(this.Topbar, {
                id: 'c-topbar__monthPicker',
                tagName: 'input',
                type: 'month',
                value: this.date.toISOString().slice(0, 7),  // 'YYYY-MM'
                onmouseout: this.switchPickerToLabel.bind(this)
            }),

            this.NextMonthBtn = new IconButton24(this.Topbar, {
                id: 'monthForv-bt',
                onclick: this.toNextMonth.bind(this),
            }, svgPaths.pointRight),
        ]

        this.DayButtonArr = this.initDayButtons(this.DaysFrame, this.daysArr)

        // some cosmetic appearance fixes
        this.PrevMonthBtn.addCssClass('c-topbar__swtcMonthBt')
        this.NextMonthBtn.addCssClass('c-topbar__swtcMonthBt')
    }

    build() {
        super.build()
        this.childWidgets.forEach(ch => ch.build())
        this.listenToMonthPicker()
        this.DayButtonArr.forEach(btn => btn.build())
    }
    
    /**
     * hide `this.MonthLabel` and show `this.MonthPicker`
     */
    switchLabelToPicker() {
        this.MonthLabel.hide()
        this.MonthPicker.show('block')
    }

    /**
     * hide `this.MonthPicker` and show `this.MonthLabel` 
     */
    switchPickerToLabel() {
        this.MonthLabel.show()
        this.MonthPicker.hide()
    }

    listenToMonthPicker() {
        this.MonthPicker.element.addEventListener('change', (event) => {
            this.reqChangeDate(new Date(event.target.value))
        } )
    }

    initDayButtons(frame, daysArr) {
        let array = []
        for (let date of daysArr) {
            let btn = new DayButton(frame, date, this.cacheService)
            array.push(btn)
        }
        return array
    }

    configurateDayButtons(newDateList) {
        let index = 0
        for (let btn of this.DayButtonArr) {
            btn.configurate(newDateList[index])
            index += 1
        }
    }

    updDayButtonsStatus() {
        this.DayButtonArr.forEach(bt => bt.updStatus())
    }

    reqChangeDate(newDate) {
        this.cacheService.setPageDate(newDate)
            .then(() => {
                this.date = this.cacheService.pageDate
                this.daysArr = this.cacheService.datesArray
                this.configurateDayButtons(this.daysArr)
                this.MonthLabel.element.innerText = DateFormat.monthLabel(this.date)
            })
            .catch(err => {
                // TODO: proper error handling 
                console.log('error catched in the end-point')
                throw err
            })
    }

    toNextMonth() {
        let newMonth, newYear
        if (this.date.getMonth() === 11) {
            newMonth = 0
            newYear = this.date.getYear() + 1 + 1900
        } else {
            newMonth = this.date.getMonth() + 1
            newYear = this.date.getYear() + 1900
        }

        let newDate = new Date(newYear, newMonth)
        this.reqChangeDate(resetTimezone(newDate))
    }

    toPrevMonth() {
        let newMonth, newYear
        if (this.date.getMonth() === 0) {
            newMonth = 11
            newYear = this.date.getYear() - 1 + 1900
        } else {
            newMonth = this.date.getMonth() - 1
            newYear = this.date.getYear() + 1900
        }

        let newDate = new Date(newYear, newMonth)
        this.reqChangeDate(resetTimezone(newDate))
    }

    refreshMonth() {
        this.reqChangeDate(this.date)
    }

}


class DayButton extends Widget {
    constructor(parent, date, cacheService) {
        super(parent)
        this.tag = 'button'
        this.element = document.createElement(this.tag)
        this.id = this.makeId('dBtn')
        this.element.className = 'c-daysFrame__dayButton'

        this.cacheService = cacheService
        this.date = date

        this.options = {
            onclick: this.boundSelf.bind(this),
        }

        this.configurate(this.date)
    }

    updStatus() {
        let status = this.cacheService.tasksArray.checkDailyTasks(this.date)
        let classList = this.element.classList  // shortcut

        if (status === 'no tasks') {
            classList.add('--no-tasks')
            classList.remove('--tasks-done', '--got-tasks')
        } else if (status === 'tasks done') {
            classList.add('--tasks-done')
            classList.remove('--no-tasks', '--got-tasks')
        } else if (status === 'got tasks') {
            classList.add('--got-tasks')
            classList.remove('--no-tasks', '--tasks-done')
        } else {
            throw 'no such status: ' + status
        }
    }

    configurate(newDate) {
        this.date = newDate
        this.element.innerText = newDate.getDate()

        this.updStatus()
        if (this.date.getMonth() != this.cacheService.pageDate.getMonth()) {
            this.element.classList.add('--out-month')
        } else {
            this.element.classList.remove('--out-month')
        }
    }

    reqChangeDate(newDate) {
        this.date = newDate
        this.configurate(newDate)
    }

    reachTaskPanel() {
        let taskPanel = Widget.instanceList['tp-taskpanel']
        if (!taskPanel) {
            throw 'DayButton on the calendar cannot reach taskPanel ' + 
                  `widget by id "tp-taskpanel": ${this.id}`
        }
        return taskPanel
    }

    boundSelf() {
        const taskPanel = this.reachTaskPanel()
        taskPanel.boundDayBt(this)
    }

}


module.exports = { DayButton, Calendar }
