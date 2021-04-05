const DateFormat = {

    monthLabel: (dateObj, locale) => {
        let month = locale.months[dateObj.getMonth()]
        let year = dateObj.getYear() + 1900
        return `${month}, ${year}`
    },

    dateLabel: (dateObj, locale) => {
        const weekDay = locale.weekDays[dateObj.getDay()]
        const dateString = dateObj.toLocaleDateString(locale.languageTag)
        return `${weekDay}, ${dateString}`
    }

}

module.exports = { DateFormat }