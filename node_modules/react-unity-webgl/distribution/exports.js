"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUnityContext = exports.Unity = void 0;
var unity_component_1 = require("./components/unity-component");
Object.defineProperty(exports, "Unity", { enumerable: true, get: function () { return unity_component_1.Unity; } });
var use_unity_context_1 = require("./hooks/use-unity-context");
Object.defineProperty(exports, "useUnityContext", { enumerable: true, get: function () { return use_unity_context_1.useUnityContext; } });
