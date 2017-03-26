
const addressReducer = (state = {addresses: []}, action) => {
    switch (action.type) {
        case 'ADDRESS_FETCHED':
            return {...state, addresses: action.payload};

        case 'RECEIVER_ADDRESS_ERRORS':
            return {...state, addresses: action.data};

        case 'ADDRESS_SELECTED':
            return {...state};

        case 'ADDRESS_CREATED':
            console.log(action.payload);
            return {...state};

        default:
            return state
    }
};

export default addressReducer
