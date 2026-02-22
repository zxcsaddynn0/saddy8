import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Вычисление процента скидки
const getDiscountPercentage = (good) => {
    if (!good.discont_price || !good.price) {
        return 0;
    }
    const discount = good.price - good.discont_price;
    return Math.round((discount / good.price) * 100);
};

// Преобразование товара для единообразия
const processGood = (good) => {
    const discountPercent = getDiscountPercentage(good);
    return {
        ...good,
        discountPercentage: discountPercent,
        discountedPrice: good.discont_price || good.price
    };
};

// Загрузка всех категорий
export const loadAllSections = createAsyncThunk(
    'sections/loadAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/categories/all');
            if (!response.ok) {
                return rejectWithValue('Ошибка загрузки категорий');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка сети');
        }
    }
);

// Загрузка товаров категории
export const loadSectionGoods = createAsyncThunk(
    'sections/loadProducts',
    async (sectionId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/categories/${sectionId}`);
            if (!response.ok) {
                return rejectWithValue('Ошибка загрузки товаров категории');
            }
            const responseData = await response.json();
            const goodsList = (responseData.data || []).map(processGood);

            return {
                section: responseData.category,
                goods: goodsList
            };
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка сети');
        }
    }
);

const sectionsSlice = createSlice({
    name: 'sections',
    initialState: {
        list: [],
        sectionGoods: [],
        activeSection: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSectionData: (state) => {
            state.sectionGoods = [];
            state.activeSection = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Загрузка категорий
            .addCase(loadAllSections.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loadAllSections.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(loadAllSections.rejected, (state, action) => {
                state.error = action.payload || 'Неизвестная ошибка';
                state.loading = false;
            })
            // Загрузка товаров категории
            .addCase(loadSectionGoods.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loadSectionGoods.fulfilled, (state, action) => {
                state.sectionGoods = action.payload.goods || [];
                state.activeSection = action.payload.section || null;
                state.loading = false;
            })
            .addCase(loadSectionGoods.rejected, (state, action) => {
                state.error = action.payload || 'Неизвестная ошибка';
                state.loading = false;
            });
    },
});

export const { clearSectionData } = sectionsSlice.actions;
export default sectionsSlice.reducer;
