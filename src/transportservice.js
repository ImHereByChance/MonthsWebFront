const CONFIG = require('./config/config')
const { getCookie, translate } = require('./tools.js')
const { MissingServerError, ServerError, ClientError } = require('./errors')


class TransportService {
    constructor(serverURLs = CONFIG.SERVER_URLs) {
        this.urls = serverURLs
    }

    /**
     * A wrapper for the standard js fetch() function witch throws an
     * appropriate errors if response was finished undesirable or
     * returns the response with a resolved Promise if everything is ok
     * @param  {} args - the same as for the standard js fetch()
     */
    fetchFromServer(...args) {
        return fetch(...args)
            .then(response => this._checkResponseForErrors(response))
            .catch(error => {
                if (error.message === "Failed to fetch") {
                    throw new MissingServerError(
                        translate('server is temporary unavailable..')
                    )
                } else throw error
            })
    }


    /**
     * Takes a response object from the standard js fetch() function.
     * Depending on response.status, throws an appropriate error or
     * returns a resolved Promise with the response object if
     * everything is ok. 
     * @param  {response} response
     */
    _checkResponseForErrors(response) {
        if (!response.ok){
            
            if (500 <= response.status <= 511) {
                throw new ServerError('we have some problems on the server', response.status)
            } else if (400 <= response.status <= 451) {
                throw new ClientError('we have some error in the application', response.status)
            }

        } else {
            return Promise.resolve(response)
        }
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

        return this.fetchFromServer(url)
            .then(response => response.json())
    }


    addNewTask(task) {
        const url = new URL(this.urls.tasks + '/', this.urls.base)
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }

        return this.fetchFromServer(url, requestOptions)
    }


    deleteTask(taskID) {
        const url = new URL(this.urls.tasks + `/${taskID}`, this.urls.base)
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
        }

        return this.fetchFromServer(url, requestOptions)
    }


    changeTask(task, checkUncheck = false) {
        const url = new URL(this.urls.tasks + `/${task.id}/`, this.urls.base)
        const requestOptions = {
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
            requestOptions.headers['checkUncheck'] = 1
        }

        return this.fetchFromServer(url, requestOptions)
    }
}


module.exports = { TransportService }
