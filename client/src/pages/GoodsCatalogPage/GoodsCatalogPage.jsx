import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllGoods } from "../../store/slices/goodsSlice";
import GoodCard from "../../components/GoodCard/GoodCard";
import GoodsFilter from "../../components/GoodsFilter/GoodsFilter";
import styles from "./GoodsCatalogPage.module.css";

const GoodsCatalogPage = () => {
  const dispatch = useDispatch();
  const { list: goods, loading, error } = useSelector((state) => state.goods);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(loadAllGoods());
  }, [dispatch]);

  const filteredAndSortedGoods = useMemo(() => {
    let filtered = [...goods];

    // Фильтрация по цене
    if (priceFrom) {
      filtered = filtered.filter((good) => {
        const price = good.discountedPrice || good.price;
        return price >= parseFloat(priceFrom);
      });
    }
    if (priceTo) {
      filtered = filtered.filter((good) => {
        const price = good.discountedPrice || good.price;
        return price <= parseFloat(priceTo);
      });
    }

    // Фильтрация по скидке
    if (discountedOnly) {
      filtered = filtered.filter((good) => good.discountPercentage > 0);
    }

    // Сортировка
    const sorted = [...filtered];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case "price-high-low":
        sorted.sort((a, b) => {
          const priceA = a.discountedPrice || a.price || 0;
          const priceB = b.discountedPrice || b.price || 0;
          return priceB - priceA;
        });
        break;
      case "price-low-high":
        sorted.sort((a, b) => {
          const priceA = a.discountedPrice || a.price || 0;
          const priceB = b.discountedPrice || b.price || 0;
          return priceA - priceB;
        });
        break;
      default:
        break;
    }

    return sorted;
  }, [goods, priceFrom, priceTo, discountedOnly, sortBy]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.inner}>
        <div className={styles.topSection}>
          <h1 className={styles.heading}>All products</h1>
        </div>
        <GoodsFilter
          priceFrom={priceFrom}
          priceTo={priceTo}
          onPriceFromChange={setPriceFrom}
          onPriceToChange={setPriceTo}
          discountedOnly={discountedOnly}
          onDiscountedChange={setDiscountedOnly}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        {filteredAndSortedGoods.length === 0 ? (
          <p className={styles.empty}>No goods found</p>
        ) : (
          <div className={styles.itemsGrid}>
            {filteredAndSortedGoods.map((good) => (
              <GoodCard key={good.id} good={good} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoodsCatalogPage;
