import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Вычисление процента скидки для товара
const computeDiscountPercentage = (goodData) => {
    if (!goodData.discont_price || !goodData.price) {
        return 0;
    }
    const priceDiff = goodData.price - goodData.discont_price;
    return Math.round((priceDiff / goodData.price) * 100);
};

// Преобразование данных товара в единый формат
const normalizeGoodData = (goodData) => {
    const discountPercent = computeDiscountPercentage(goodData);
    const finalPrice = goodData.discont_price || goodData.price;

    return {
        ...goodData,
        discountPercentage: discountPercent,
        discountedPrice: finalPrice
    };
};

// Получение всех товаров
export const loadAllGoods = createAsyncThunk(
    'goods/loadAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/products/all');
            if (!response.ok) {
                return rejectWithValue('Ошибка загрузки товаров');
            }
            const goodsData = await response.json();
            const normalizedGoods = Array.isArray(goodsData)
                ? goodsData.map(normalizeGoodData)
                : [];
            return normalizedGoods;
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка сети');
        }
    }
);

// Получение товара по идентификатору
export const loadGoodById = createAsyncThunk(
    'goods/loadById',
    async (goodId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/products/${goodId}`);
            if (!response.ok) {
                return rejectWithValue('Товар не найден');
            }
            const responseData = await response.json();
            const goodData = Array.isArray(responseData) ? responseData[0] : responseData;

            if (!goodData) {
                return rejectWithValue('Товар не найден');
            }

            return normalizeGoodData(goodData);
        } catch (error) {
            return rejectWithValue(error.message || 'Ошибка сети');
        }
    }
);

const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        list: [],
        selectedGood: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedGood: (state) => {
            state.selectedGood = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Загрузка всех товаров
            .addCase(loadAllGoods.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loadAllGoods.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(loadAllGoods.rejected, (state, action) => {
                state.error = action.payload || 'Неизвестная ошибка';
                state.loading = false;
            })
            // Загрузка товара по ID
            .addCase(loadGoodById.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loadGoodById.fulfilled, (state, action) => {
                state.selectedGood = action.payload;
                state.loading = false;
            })
            .addCase(loadGoodById.rejected, (state, action) => {
                state.error = action.payload || 'Неизвестная ошибка';
                state.loading = false;
            });
    },
});

export const { clearSelectedGood } = goodsSlice.actions;
export default goodsSlice.reducer;
