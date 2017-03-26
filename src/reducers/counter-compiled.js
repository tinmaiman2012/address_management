var counterReducer = function counterReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.TYPE) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

export default counterReducer;

//# sourceMappingURL=counter-compiled.js.map