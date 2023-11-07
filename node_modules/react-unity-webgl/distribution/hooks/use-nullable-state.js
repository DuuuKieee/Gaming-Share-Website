"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNullableState = void 0;
var react_1 = require("react");
/**
 * A hook that creates a nullable state.
 * @param initialState Optional initial state, defaults to null.
 * @returns a stateful value, and a function to update it.
 */
var useNullableState = function (initialState) {
    return (0, react_1.useState)(initialState || null);
};
exports.useNullableState = useNullableState;
