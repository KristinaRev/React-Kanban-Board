import React from 'react';

const boardReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default boardReducer;
