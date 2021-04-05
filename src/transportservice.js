const {getCookie} = require('./tools.js')


// TODO: move to settings module
const SERVER_URLs = {
    base: 'http://127.0.0.1:8000/',
    changeDate: '/getDatePack',
    tasks: '/tasks'
}


class TransportService {
    constructor(serverURLs=SERVER_URLs) {
        this.urls = serverURLs
    }

    /**
     * Request from server JSON file consisting of: 
     * 1) list of all days in the month of specified date (as
     * ISOStrings). List contains extra-days to make 6 full weeks and
     * look as a pretty calendar (used in Calendar widget);
     * 2) All user tasks for this month including repeated by specified
     * time interval.
     * @param  {Date} date
     */
    getMonthPack(date) {
        let httpParamDate = date.toISOString().replace('Z', '+00:00')
        
        let url = new URL(this.urls.changeDate, this.urls.base)
        url.searchParams.append('date', httpParamDate)
        
        return fetch(url)
            .then(response => response.json())
    }
    
    addNewTask(task) {
        const url = new URL(this.urls.tasks + '/', this.urls.base)
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    deleteTask(taskID) {
        const url = new URL(this.urls.tasks + `/${taskID}`, this.urls.base)
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
        })
    }

    changeTask(task, checkUncheck=false) {
        const url = new URL(this.urls.tasks + `/${task.id}/`, this.urls.base)
        let reqInit = {
            method: 'PUT',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }

        if (checkUncheck) {
            reqInit.headers['checkUncheck'] = 1
        }
        
        return fetch(url, reqInit)
    }

    
}


module.exports = {TransportService}
