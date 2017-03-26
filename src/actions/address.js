export const selectAddress = (address) => {
    return {
        type: 'ADDRESS_SELECTED',
        payload:address
    }
};

export const fetchedAddresses = (address) => {
    return {
        type: 'ADDRESS_FETCHED',
        payload:address
    }
};

export const createNewAddresses = (address) => {
    return {
        type: 'ADDRESS_CREATED',
        payload:address
    }
};