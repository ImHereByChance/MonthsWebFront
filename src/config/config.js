const Config = require('./configHandler')


module.exports = new Config({

    LOCALE_TAG: 'en',

    SERVER_URLs: {
        base: 'http://192.168.1.15:8000/',
        changeDate: '/getDatePack',
        tasks: '/tasks',
    }

})
