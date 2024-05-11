/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/urgency.ts":
/*!************************!*\
  !*** ./src/urgency.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Urgency = void 0;
class Urgency {
    compute() {
    }
    getScore() {
        return 12;
    }
    getExplaination() {
        return '';
    }
}
exports.Urgency = Urgency;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/tasks.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const urgency_1 = __webpack_require__(/*! ../src/urgency */ "./src/urgency.ts");
let urgency = new urgency_1.Urgency();
urgency.getScore();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLE1BQWEsT0FBTztJQVNoQixPQUFPO0lBRVAsQ0FBQztJQUNELFFBQVE7UUFDSixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFDRCxlQUFlO1FBQ1gsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFsQkQsMEJBa0JDOzs7Ozs7O1VDckJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3JCQSxnRkFBeUM7QUFFekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7QUFDNUIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2JzaWRpYW5fc2NyaXB0cy8uL3NyYy91cmdlbmN5LnRzIiwid2VicGFjazovL29ic2lkaWFuX3NjcmlwdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2JzaWRpYW5fc2NyaXB0cy8uL3NyYy90YXNrcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBJRGF0YXZpZXcgfSBmcm9tIFwiLi9pRGF0YXZpZXdcIjtcclxuLy8gaW1wb3J0IHsgSVRvZG9Db25maWd1cmF0aW9uIH0gZnJvbSBcIi4vaVRvZG9Db25maWd1cmF0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJnZW5jeSB7XHJcbiAgICAvLyAjZHY6IElEYXRhdmlldztcclxuICAgIC8vICNjb25mOiBJVG9kb0NvbmZpZ3VyYXRpb247XHJcblxyXG4gICAgLy8gY29uc3RydWN0b3IoZHY6IElEYXRhdmlldywgY29uZjogSVRvZG9Db25maWd1cmF0aW9uKSB7XHJcbiAgICAvLyAgICAgdGhpcy4jZHYgPSBkdlxyXG4gICAgLy8gICAgIHRoaXMuI2NvbmYgPSBjb25mO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICBjb21wdXRlKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFNjb3JlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEyO1xyXG4gICAgfVxyXG4gICAgZ2V0RXhwbGFpbmF0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlxyXG5pbXBvcnQgeyBVcmdlbmN5IH0gZnJvbSBcIi4uL3NyYy91cmdlbmN5XCI7XHJcblxyXG5sZXQgdXJnZW5jeSA9IG5ldyBVcmdlbmN5KCk7XHJcbnVyZ2VuY3kuZ2V0U2NvcmUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=