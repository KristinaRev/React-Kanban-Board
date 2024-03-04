import React from 'react';
const BoardReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default BoardReducer;
