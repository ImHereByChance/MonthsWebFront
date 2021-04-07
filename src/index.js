// uncomment to add styles in main.html header -->
// import './styles/main.css'
const {Widget} = require('./widgets/widget')
const {DayButton, Calendar} = require('./widgets/widget.calendar')
const {IconButton24} = require('./widgets/widget.common')
const {TaskPanel} = require('./widgets/widget.taskpanel')
const {copyObject} = require('./tools')
const {CacheService, TaskObject} = require('./cacheservice')
const {TransportService} = require('./transportservice')
const {svgPaths} = require('./svgpaths')


// Entire app launch initializations.
const _mainContainer = document.getElementById('_main-container')
const transportService = new TransportService()
const cacheService = new CacheService(transportService)
let calendar
let taskPanel
    
cacheService.setPageDate(cacheService.today)
    .then( () => {
        calendar = new Calendar(_mainContainer, cacheService)
        taskPanel = new TaskPanel(_mainContainer, cacheService)
        calendar.build()
        taskPanel.build()
        
    })
    .catch( err => {
        console.error(err)
        alert(err.errorTraceback)
    })
    .then(() => {

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
window.TaskPanel = TaskPanel


window.calendar = calendar
window.taskPanel = taskPanel

})
