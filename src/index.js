import Widget from './widget'
import './styles/main.css'

console.log('I am the entry point')

// Entire app launch initializations.
const _mainContainer = document.getElementById('_main-container')

// Make these accessible from browser dev tools console
window.Widget = Widget
window._mainContainer = _mainContainer