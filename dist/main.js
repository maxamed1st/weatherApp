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

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"changeBackground\": () => (/* binding */ changeBackground),\n/* harmony export */   \"clearNode\": () => (/* binding */ clearNode),\n/* harmony export */   \"newElement\": () => (/* binding */ newElement),\n/* harmony export */   \"toggleTemp\": () => (/* binding */ toggleTemp)\n/* harmony export */ });\nfunction newElement(element, id, node=false, content=false) {\n    //create new element and append to node\n    let el = document.createElement(element);\n    el.setAttribute('id', id);\n    if (content) {\n        //if content is passed, set it as textContent\n        el.textContent = content;\n    }\n    if (node) {\n        //if node is passed, append element to node\n        node.appendChild(el);\n    }\n    return el;\n}\n\nfunction clearNode(node) {\n    //remove all children from node\n    while (node.firstChild) {\n        node.removeChild(node.firstChild);\n    }\n    return node;\n}\n//present tempeture in celsius\nlet celsius = true;\n//Toggle tempeture unit\nconst toggleCelsius = () => celsius = !celsius;\nfunction toggleTemp (c, f) {\n    //Toggle the tempeture that is showing\n    toggleCelsius();\n    let temputure = clearNode(document.getElementById(\"tempeture\"));\n    if (celsius) {\n        temputure.innerText = c + \" °C\";\n        return [c, f]\n    } else {\n        temputure.innerText = f + \" °F\";\n        [f, c]\n    }   \n}\nfunction changeBackground(tempInC) {\n    //Change background and font color depending on the tempeture\n    if (tempInC < 17.5) {\n        document.body.style.backgroundColor = \"#6699CC\";\n        document.body.style.color = \"##1A1A2E\";\n    } else {\n        document.body.style.backgroundColor = \"#FFB347\";\n        document.body.style.color = \"#000000\";\n    }\n}\n\n\n//# sourceURL=webpack://weatherapp/./src/DOM.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n/* harmony import */ var _weatherapi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherapi */ \"./src/weatherapi.js\");\n\n\n//select submit button and information div\nlet submit = document.getElementById(\"submit\");\nlet info = document.getElementById(\"information\");\n//Get Data for the requisted city\nfunction handleSubmit(e) {\n    e.preventDefault();\n    //Clear previous data on the screen\n    (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.clearNode)(info);\n    //Get city name from the search box and then get the data for that city\n    let city = document.getElementById(\"searchBox\").value;\n    (0,_weatherapi__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(city).then(data => {\n        //If the response is not valid, display the error message\n        if (typeof data === \"string\") {\n            (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.newElement)(\"div\",\"error\", info, data);\n            return;\n        }\n        //Display the data on the screen\n        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.newElement)(\"div\",\"name\", info, data.name);\n        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.newElement)(\"div\",\"country\", info, data.country);\n        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.newElement)(\"div\",\"localTime\", info, data.localtime);\n        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.newElement)(\"div\",\"condition\", info, data.text);\n        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.newElement)(\"div\",\"lastUpdated\", info, data.last_updated);\n        let tempeture = (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.newElement)(\"div\",\"tempeture\", info, data.temp_c + \" °C\");\n        let currentTemp = data.temp_c\n        let otherTemp = data.temp_f\n        tempeture.addEventListener(\"click\", () => {\n            [currentTemp, otherTemp] = (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.toggleTemp)(currentTemp, otherTemp);\n        });\n        (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.changeBackground)(data.temp_c);\n    });\n}\nsubmit.addEventListener(\"click\", handleSubmit);\n\n\n//# sourceURL=webpack://weatherapp/./src/index.js?");

/***/ }),

/***/ "./src/weatherapi.js":
/*!***************************!*\
  !*** ./src/weatherapi.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getData)\n/* harmony export */ });\n//Object to store the data necessary for the app\nlet finalObj = {};\n//iterate over the nested data fetched from the api and retrieve only the data we need\nfunction trimData(obj) {\n    //array of the data necessary for the app\n    let dataArr = [\"temp_c\", \"temp_f\", \"text\", \"icon\", \"is_day\", \"last_updated\", \"name\", \"localtime\", \"country\"];\n    for (const [k,v] of Object.entries(obj)) {\n        if (typeof v === \"object\") {\n            trimData(v);\n        } else {\n            if (dataArr.includes(k)){\n                finalObj[k] = v;\n            }\n        }\n    }\n    return finalObj;\n}\n\n//Get weather data for the given location\nasync function getData(location) {\n        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=a986c6321f714aa5ba752739232704&q=${location}`);\n        if (!response.ok) {\n            let res = await response.json();\n            let errorMsg = res.error.message;\n            return errorMsg;\n        }\n        let data = await response.json();\n        //reduce data to only the data we need\n        finalObj = trimData(data);\n        return finalObj;\n}\n\n\n//# sourceURL=webpack://weatherapp/./src/weatherapi.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;