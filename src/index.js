import './styles/main.css'
const {Widget} = require('./widget')
const {DayButton, Calendar} = require('./widget.calendar.js')
const {copyObject} = require('./copy')
const {CacheService, TaskObject} = require('./cacheservice')
const {TransportService} = require('./transportservice')
const {IconButton24} = require('./widget.common.js')
const {svgPaths} = require('./svgpaths.js')


console.log('I am the entry point')

// Entire app launch initializations.
const _mainContainer = document.getElementById('_main-container')
const transportService = new TransportService()
const cacheService = new CacheService(transportService)
let calendar
    
cacheService.setPageDate(cacheService.today)
    .then( () => {
        calendar = new Calendar(_mainContainer, cacheService)
        calendar.build()
    })
    .catch( err => {
        console.error(err)
        alert(err.errorTraceback)
    })


// Make these accessible from browser dev tools console
window.Widget = Widget
window._mainContainer = _mainContainer
window.copyObject = copyObject
window.TaskObject = TaskObject
window.TransportService = TransportService
window.CacheService = CacheService
window.DayButton = DayButton
window.Calendar = Calendar
window.IconButton24 = IconButton24
window.svgPaths = svgPaths

window.calendar = calendar
