/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/cjs.js!./styles/main.css":
/*!****************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./styles/main.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"../node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \":root {\\n    --basedark: #718AAD;\\n    --baselight: #A2C7FA;\\n    --additdark: #4174BB;\\n    --additlight: #579BFA;\\n    --extradark: #50617A;\\n}\\n\\n/*MAIN */\\nhtml {\\n    overflow-y: hidden;\\n}\\n\\nhtml, body, #main-container {\\n    height: 100%;\\n    width: 100%;\\n    font-family: arial;\\n    display: flex;\\n}\\n\\n#main-container {\\n    display: flex;\\n    align-items: stretch;\\n    background: cornflowerblue;\\n    flex-grow: 1;\\n}\\n\\n/*COMMON ELEMENTS */\\n\\nbutton {\\n    cursor: pointer;\\n}\\n\\nbutton > * {\\n  pointer-events: none;\\n}\\n\\ninput, select, textarea {\\n    outline: none;\\n}\\n\\ninput:focus-within,\\nselect:focus-within,\\ntextarea:focus-within {\\n    outline: 1px solid var(--additdark); \\n    border: 2px solid rgba(255, 255, 255, 0);\\n    box-shadow: 0px 0px 2px 1px #00adff;\\n}\\n\\n.button-icon24 {\\n    align-items: center;\\n    justify-content: center;\\n    border: none;\\n    transition: 0.3s;\\n    padding: 0;\\n    background-color: #ffffff00;\\n    margin: 2px;\\n}\\n\\n.button-icon12 {\\n    align-items: center;\\n    justify-content: center;\\n    border: none;\\n    transition: 0.3s;\\n    padding: 0;\\n    background-color: #ffffff00;\\n}\\n\\n.button-icon24:focus {\\n    outline: none;\\n    border: 1px dashed var(--baselight);\\n    }\\n\\n.button-icon24:active {\\n    outline: none;\\n    border: 1px dashed aliceblue;\\n}\\n\\n.svg-icon {\\n  width: 24px;\\n  height: 24px;\\n}\\n\\n.svg-icon12 {\\n  width: 12px;\\n  height: 12px;\\n}\\n\\n.svg-icon path,\\n.svg-icon polygon,\\n.svg-icon rect {\\n  fill: var(--additdark);\\n}\\n\\n.svg-icon12 circle, .svg-icon circle  {\\n  stroke: #4691f6;\\n  stroke-width: 1;\\n}\\n\\n/*CALENDAR*/\\n#c-calendar {\\n    max-width: 336px;\\n    flex-grow: 0;\\n    display: flex;\\n    flex-direction: column;\\n    background-color: var(--additdark);\\n}\\n\\n#c-topbar {\\n    flex-basis: 48px;\\n    background-color: var(--additlight);\\n    display: flex;\\n    justify-content: space-between;\\n}\\n\\n#c-daysFrame {\\n    height: 288px;\\n    width: 336px;\\n    display: flex;\\n    flex-wrap: wrap;\\n    margin: auto;\\n    background-color: #a85e5e;\\n}\\n\\n/*DAY BUTTON*/\\n.c-daysFrame__dayButton {\\n    height: 48px; \\n    width: 48px;  \\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    color: #ffffff;\\n    border: #579bfa9e solid 1px;\\n    transition: 0.3s;\\n}\\n\\n.c-daysFrame__dayButton:hover {\\n    background-color: var(--additlight);\\n    border-color: var(--baselight);\\n    box-shadow: inset 0px 0px 6px 0px var(--baselight);\\n}\\n\\n.c-daysFrame__dayButton:focus {\\n    outline: none;\\n    border: 1px solid var(--baselight);\\n    box-shadow: 1px 1px 1px 1px aliceblue;\\n}\\n\\n.c-daysFrame__dayButton:active {\\n}\\n\\n.--no-tasks {\\n    background-color: var(--additdark);\\n}\\n.--tasks-done {\\n    background-color: #5689d6;\\n}\\n.--got-tasks {\\n    background-color: #355f9e;\\n}\\n\\n.--out-month {\\n    color: #a2c0eb;\\n}\\n\\n.c-topbar__swtcMonthBt {\\n    height: 43px;\\n    width: 45px;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    transition: 0.5s;\\n}\\n\\n.c-topbar__swtcMonthBt:hover path {\\n    fill: var(--baselight);\\n    transition: 0.2s;\\n}\\n\\n#c-topbar__monthLabel {\\n    display: flex;\\n    align-items: center;\\n    color: aliceblue;\\n}\\n\\n/*TASK PANEL*/\\n#tp-taskpanel {\\n    flex-grow: 1;\\n    background: var(--additdark);\\n    display: flex;\\n    flex-direction: column;\\n}\\n\\n#tp-topbar {\\n    min-height: 48px;\\n    background-color: var(--additlight);\\n    display: flex;\\n    justify-content: space-between;\\n    color: aliceblue;\\n}\\n\\n#tp-dateLabel {\\n    align-self: center;\\n    margin-left: 4rem;\\n}\\n\\n#tp-createTaskBt {\\n    height: 44px;\\n    width: 44px;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    transition: 0.5s;\\n    background-color: var(--additlight);\\n    margin-right: 20px;\\n}\\n\\n#tp-createTaskBt .svg-icon {\\n    width:36px;\\n    height: 36px;\\n}\\n\\n#tp-createTaskBt\\n    .svg-icon path,\\n    .svg-icon polygon,\\n    .svg-icon rect,\\n    .svg-icon circle {\\n    stroke: var(--baselight);\\n    transition: 0.2s;\\n}\\n\\n#tp-createTaskBt:hover > \\n    .svg-icon path,\\n    .svg-icon polygon,\\n    .svg-icon rect,\\n    .svg-icon circle{\\n    stroke: #fffedf;\\n}\\n\\n/*container where located taskitelms*/\\n#tp-taskList {\\n    flex-basis: 30%;\\n    flex-grow: 1;\\n    display: flex;\\n    flex-direction: column;\\n    margin: 10px 5px;\\n    overflow-y: scroll;\\n    text-align: center;\\n    color: #bfc9d2;\\n    border-left: 1px solid var(--basedark);\\n}\\n\\n/*single task item*/\\n.tp-taskitem {\\n    background-color: var(--baselight);\\n    border-radius: 2px;\\n    transition: 0.2s;\\n    border: solid 1px var(--additlight);\\n    margin-bottom: 5px;\\n    margin-left: 5px;\\n    flex-basis: 56px;\\n    flex-shrink: 0;\\n    display: flex;\\n    align-items: center;\\n    text-align: initial;\\n    color: black;\\n}\\n\\n.tp-taskitem:hover {\\n    border-color: var(--baselight);\\n    background-color: #dbebff;\\n}\\n\\n.tp-taskitem \\n.button-icon24:active, .button-icon24:focus {\\n    border: 1px dashed var(--extradark);\\n}\\n\\n.tp-taskitem .button-icon12:focus {\\n    border: 1px dashed var(--extradark);\\n    background: rgb(0, 255, 13);   \\n}\\n\\n.tp-taskCheckout {\\n    margin-left: 5px;\\n}\\n\\n/*section with task-settings, task-title and task-description*/\\n.tp-taskitemMain {\\n    flex-grow: 1;\\n    display: flex;\\n    flex-direction: column;\\n    padding: 0px 5px;\\n}\\n\\n.tp-taskitemTitle {\\n    overflow: hidden;\\n    overflow-wrap: anywhere;\\n    flex-grow: 1;\\n    font-size: 14px;\\n    margin: 3px;\\n}\\n\\n.tp-taskitemDescr {\\n    border-radius: 2px;\\n    background-color: #c9d2ef;\\n    overflow-wrap: anywhere;\\n    flex-grow: 1;\\n    font-size: 14px;\\n    margin: 3px;\\n}\\n\\n.ti-SaveTaskBt:hover path {\\n    fill: #2aa9c6;\\n}\\n\\n.ti-CloseEditorBt:hover path {\\n    fill: #5c698f;\\n}\\n\\n/*buttons, that displais in to the right of tp-taskitem when it is not unfold*/\\n.tp-taskitemRightBtns * {\\n    display: flex;\\n    flex-direction: column;\\n    transition: 0.2s;\\n}\\n\\n.tp-taskitemRightBtns .button-icon24 {\\n    display: none\\n}\\n\\n.tp-RightBtnsDelTask:hover path {\\n    fill:crimson;\\n}\\n\\n.tp-RightBtnsEditTask:hover path{\\n    fill: var(--baselight);\\n    fill: #202e5f;\\n}\\n\\n.tp-taskitem:hover > .tp-taskitemRightBtns .button-icon24 {\\n    display: flex;\\n}\\n\\n/*container for the 'save changes' and the 'close task redactor' buttons*/\\n.tp-taskitemSaveClose{\\n    align-self: flex-end;\\n    margin-top: 3px;\\n}\\n\\n.tp-taskTimeSettings {\\n    display: flex;\\n    justify-content: space-between;\\n    font-size: 14px;\\n}\\n\\n/*container for wraping a task-item settings element and its label*/\\n.tp-SettingsElement {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: space-evenly;\\n    font-size: 14px;\\n    margin-bottom: 5px;\\n}\\n\\n.tp-SettingsElement label {\\n    margin-bottom: 5px;\\n    font-size: 14px;\\n}\\n\\n.tp-taskFilesArea {\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-between;\\n    padding: 5px;\\n    border: solid 1px var(--extradark);\\n    border-radius: 2px;\\n    margin-bottom: 5px;\\n}\\n\\n.tp-taskFileSet {\\n    display: flex;\\n    justify-content: start;\\n    flex-wrap: wrap;\\n    font-size: 12;\\n}\\n\\n.tp-taskFile {\\n    display: flex;\\n    align-items: center;\\n    text-decoration: underline;\\n    cursor: pointer;\\n    margin-right: 5px;\\n    background-color: aliceblue;\\n    border-radius: 4px;\\n    padding: 3px;\\n    max-height: 14px;\\n}\\n\\n.tp-taskFileAdd {\\n}\\n\\n.tp-taskFile\\n.svg-icon12 path,\\n.svg-icon12 polygon,\\n.svg-icon12 rect,\\n.svg-icon12 circle,\\n.tp-taskFileDelete {\\n  fill: red;\\n}\\n\\n\\n\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./styles/main.css?../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack:///../node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./styles/main.css":
/*!*************************!*\
  !*** ./styles/main.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"../node_modules/css-loader/dist/cjs.js!./styles/main.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack:///./styles/main.css?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./widget */ \"./widget.js\");\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.css */ \"./styles/main.css\");\n\n\n\nconsole.log('I am entry point')\n\n// Entire app launch initializations.\nconst mainContainer = document.getElementById('main-container')\n\n\n\nwindow.Widget = _widget__WEBPACK_IMPORTED_MODULE_0__.default\nwindow.mainContainer = mainContainer\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./widget.js":
/*!*******************!*\
  !*** ./widget.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Widget)\n/* harmony export */ });\nclass Widget {\n    constructor(parent, options={}) {\n        // parent widget, where this widget will be located\n        this.parent = parent\n        // html element associated with this class instance \n        this.element = document.createElement(\n            options.tagName ? options.tagName : 'DIV'\n        )\n        // this.element attributes you may override during initialization\n        this.options = options\n        // html id attribute and identifier of this widget instance\n        this.id = options.id ? options.id : this.makeId('w')\n        // Flex, block, etc. Private parameter to use it in this.hide()\n        // and this.show() methods.\n        this._defaultDisplayMode\n        // Keeps available the this.options, how they was given on\n        // instance constructor - otherwise, they would be assign via\n        // setter to the this.element object and not available any more.\n        this._localOptions = options\n    }\n \n    // The alternative constructor, that takes as args parent Widget and raw\n    // html string and returns a new Widget object based on given html string \n    static fromHTML(parent, rawHTML) {\n        let element = Widget.makeElementFromHTML(rawHTML)\n        let Widget = new Widget(parent)\n        Widget.element = element\n        return Widget\n    }\n\n    // creates html element from a raw html string\n    static makeElementFromHTML(rawHTML) {\n        let parser = new DOMParser()\n        let newDoc = parser.parseFromString(rawHTML, 'text/html')\n        let element = newDoc.body.firstElementChild\n        return element\n    }\n\n    build() {\n        try {\n            this.element.id = this.id\n            let parentNode = document.getElementById(this.parent.id)\n            parentNode.insertAdjacentElement('beforeend', this.element)\n            this._defaultDisplayMode = this.element.style.display\n        } catch (err) {\n            console.error('cannot build Widget:', this)\n            throw(err)\n        }\n    }\n\n    isBuilded(){\n        if(document.getElementById(this.id)){\n            return true\n        } else {\n            return false\n        }\n    }\n\n    set options(newOptions) {\n        delete newOptions.tagName\n        Object.assign(this.element, newOptions)\n    }\n\n    makeId(typeChar) {\n        let randInt = Math.floor(Math.random() * 99999)\n        return typeChar + randInt\n    }\n\n    remove() {\n        this.element.remove()\n    }\n\n    hide() {\n        if(this._defaultDisplayMode != 'none'){\n            let currentMode = this.element.style.display\n            this.element._defaultDisplayMode = currentMode\n        }\n        this.element.style.display = 'none'\n    }\n\n    show() {\n        this.element.style.display = this._defaultDisplayMode\n    }\n\n    disable() {\n        this.element.disabled = true\n    }\n\n    enable() {\n        this.element.disabled = false\n    }\n\n    addCssClass(className) {\n        this.element.classList.add(className)\n    }\n\n    removeCssClass(className) {\n        this.element.classList.remove(className)\n    }\n}\n\n\n//# sourceURL=webpack:///./widget.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;