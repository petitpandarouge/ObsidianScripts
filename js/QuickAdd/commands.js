/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commands.ts":
/*!*************************!*\
  !*** ./src/commands.ts ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const urgency_1 = __webpack_require__(/*! @obsidian/urgency */ "./src/urgency.ts");
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    debugger;
    let urgency = new urgency_1.Urgency();
    console.log(urgency.getScore());
});


/***/ }),

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/commands.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUZBQTRDO0FBRTVDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBUyxFQUFFO0lBQ3hCLFFBQVE7SUFDUixJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDSEQsTUFBYSxPQUFPO0lBU2hCLE9BQU87SUFFUCxDQUFDO0lBQ0QsUUFBUTtRQUNKLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNELGVBQWU7UUFDWCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQWxCRCwwQkFrQkM7Ozs7Ozs7VUNyQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29ic2lkaWFuX3NjcmlwdHMvLi9zcmMvY29tbWFuZHMudHMiLCJ3ZWJwYWNrOi8vb2JzaWRpYW5fc2NyaXB0cy8uL3NyYy91cmdlbmN5LnRzIiwid2VicGFjazovL29ic2lkaWFuX3NjcmlwdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2JzaWRpYW5fc2NyaXB0cy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL29ic2lkaWFuX3NjcmlwdHMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL29ic2lkaWFuX3NjcmlwdHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVyZ2VuY3kgfSBmcm9tIFwiQG9ic2lkaWFuL3VyZ2VuY3lcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgZGVidWdnZXJcclxuICAgIGxldCB1cmdlbmN5ID0gbmV3IFVyZ2VuY3koKTtcclxuICAgIGNvbnNvbGUubG9nKHVyZ2VuY3kuZ2V0U2NvcmUoKSk7XHJcbn0iLCIvLyBpbXBvcnQgeyBJRGF0YXZpZXcgfSBmcm9tIFwiLi9pRGF0YXZpZXdcIjtcclxuLy8gaW1wb3J0IHsgSVRvZG9Db25maWd1cmF0aW9uIH0gZnJvbSBcIi4vaVRvZG9Db25maWd1cmF0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJnZW5jeSB7XHJcbiAgICAvLyAjZHY6IElEYXRhdmlldztcclxuICAgIC8vICNjb25mOiBJVG9kb0NvbmZpZ3VyYXRpb247XHJcblxyXG4gICAgLy8gY29uc3RydWN0b3IoZHY6IElEYXRhdmlldywgY29uZjogSVRvZG9Db25maWd1cmF0aW9uKSB7XHJcbiAgICAvLyAgICAgdGhpcy4jZHYgPSBkdlxyXG4gICAgLy8gICAgIHRoaXMuI2NvbmYgPSBjb25mO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICBjb21wdXRlKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldFNjb3JlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEyO1xyXG4gICAgfVxyXG4gICAgZ2V0RXhwbGFpbmF0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbW1hbmRzLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9