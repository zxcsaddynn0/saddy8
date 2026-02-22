import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadSectionGoods,
  loadAllSections,
} from "../../store/slices/sectionsSlice";
import GoodCard from "../../components/GoodCard/GoodCard";
import GoodsFilter from "../../components/GoodsFilter/GoodsFilter";
import styles from "./SectionGoodsPage.module.css";

const SectionGoodsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add("sections-page");
    return () => {
      document.body.classList.remove("sections-page");
    };
  }, []);
  const { sectionGoods, activeSection, loading, error } = useSelector(
    (state) => state.sections
  );

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (id) {
      dispatch(loadSectionGoods(id));
    }
    dispatch(loadAllSections());
  }, [id, dispatch]);

  const filteredAndSortedGoods = useMemo(() => {
    if (!Array.isArray(sectionGoods)) {
      return [];
    }
    let filtered = [...sectionGoods];

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
  }, [sectionGoods, priceFrom, priceTo, discountedOnly, sortBy]);

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
          <h1 className={styles.heading}>
            {activeSection?.title || "Section Goods"}
          </h1>
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
          <p className={styles.empty}>No goods found in this section</p>
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

export default SectionGoodsPage;
