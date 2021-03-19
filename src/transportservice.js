const SERVER_URLs = {
    base: 'http://127.0.0.1:8000/',
    changeDate: '/taskmanager/getDatePack',
    
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
            .catch(err => {
                console.error(err)
                throw err
            })
    }
}


module.exports = {TransportService}
