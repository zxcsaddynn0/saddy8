import { configureStore } from '@reduxjs/toolkit';
import sectionsReducer from './slices/sectionsSlice';
import goodsReducer from './slices/goodsSlice';
import basketReducer from './slices/basketSlice';

export const store = configureStore({
    reducer: {
        sections: sectionsReducer,
        goods: goodsReducer,
        basket: basketReducer,
    },
});

export default store;
