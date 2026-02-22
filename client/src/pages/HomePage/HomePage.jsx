import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSections } from "../../store/slices/sectionsSlice";
import { loadAllGoods } from "../../store/slices/goodsSlice";
import HeroSection from "../../components/HeroSection/HeroSection";
import SectionsSlider from "../../components/SectionsSlider/SectionsSlider";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import DiscountsSlider from "../../components/DiscountsSlider/DiscountsSlider";

const HomePage = () => {
  const dispatch = useDispatch();
  const { list: sections } = useSelector((state) => state.sections);
  const { list: goods } = useSelector((state) => state.goods);

  useEffect(() => {
    dispatch(loadAllSections());
    dispatch(loadAllGoods());
  }, [dispatch]);

  const discountedGoods = goods.filter((good) => good.discountPercentage > 0);

  return (
    <>
      <HeroSection />
      <SectionsSlider sections={sections} />
      <DiscountForm />
      <DiscountsSlider goods={discountedGoods} />
    </>
  );
};

export default HomePage;
