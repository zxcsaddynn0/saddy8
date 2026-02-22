import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import SectionsListPage from './pages/SectionsListPage/SectionsListPage';
import SectionGoodsPage from './pages/SectionGoodsPage/SectionGoodsPage';
import GoodsCatalogPage from './pages/GoodsCatalogPage/GoodsCatalogPage';
import GoodDetailsPage from './pages/GoodDetailsPage/GoodDetailsPage';
import DiscountsPage from './pages/DiscountsPage/DiscountsPage';
import BasketPage from './pages/BasketPage/BasketPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sections" element={<SectionsListPage />} />
                <Route path="/sections/:id" element={<SectionGoodsPage />} />
                <Route path="/goods" element={<GoodsCatalogPage />} />
                <Route path="/goods/:id" element={<GoodDetailsPage />} />
                <Route path="/discounts" element={<DiscountsPage />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppLayout>
    );
}

export default App;
