const { Widget } = require('./widget.js')
const { IconButton24 } = require('./widget.common.js')
const { svgPaths } = require('../svgpaths.js')
const { DateFormat } = require('../tools')

const CONFIG = require('../config')
const LOCALE = CONFIG.LOCALE


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
                innerText: DateFormat.monthLabel(this.date, LOCALE)
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
        this.DayButtonArr.forEach(btn => btn.build())
    }

    initDayButtons(frame, daysArr) {
        let array = []
        for (let date of daysArr) {
            let btn = new DayButton(frame, date, this.cacheService, 42) // TODO: fix task panel arg
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
                this.MonthLabel.element.innerText = DateFormat.monthLabel(this.date, LOCALE)
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
    constructor(parent, date, cacheService, taskPanel) {
        super(parent)
        this.tag = 'button'
        this.element = document.createElement(this.tag)
        this.id = this.makeId('dBtn')
        this.element.className = 'c-daysFrame__dayButton'

        this.cacheService = cacheService
        this.taskPanel = taskPanel
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

    boundSelf() {
        taskPanel.boundDayBt(this)
    }

}

function resetTimezone(date) {
    let timezoneOffset = date.getTimezoneOffset() * 60 * 1000
    let newDate = new Date(date.getTime() - timezoneOffset)
    return newDate
}


module.exports = { DayButton, Calendar }