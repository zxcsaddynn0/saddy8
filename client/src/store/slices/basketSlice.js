import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        list: [],
    },
    reducers: {
        addToBasket: (state, action) => {
            const goodToAdd = action.payload;
            const existingGoodIndex = state.list.findIndex(
                (item) => item.id === goodToAdd.id
            );

            if (existingGoodIndex >= 0) {
                const existingGood = state.list[existingGoodIndex];
                existingGood.amount += goodToAdd.amount || 1;
            } else {
                state.list.push({
                    ...goodToAdd,
                    amount: goodToAdd.amount || 1,
                });
            }
        },
        removeFromBasket: (state, action) => {
            const goodId = action.payload;
            state.list = state.list.filter((item) => item.id !== goodId);
        },
        changeQuantity: (state, action) => {
            const { id, amount } = action.payload;
            const goodToUpdate = state.list.find((item) => item.id === id);
            if (goodToUpdate) {
                goodToUpdate.amount = amount;
            }
        },
        emptyBasket: (state) => {
            state.list = [];
        },
    },
});

export const { addToBasket, removeFromBasket, changeQuantity, emptyBasket } =
    basketSlice.actions;

export const getBasketItemsCount = (state) => {
    return state.basket.list.reduce((total, item) => total + item.amount, 0);
};

export default basketSlice.reducer;
