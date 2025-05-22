
import { getFeaturedProducts } from "@/data/products";
import AdvertGrid from "../Product/AdvertGrid";
import { AnimatedSection } from "@/components/Animation/AnimatedSection";
import { StaggeredContainer } from "@/components/Animation/StaggeredContainer";

const FeaturedProducts = () => {
  const featuredAdverts = getFeaturedProducts();
  
  return (
    <section className="py-16">
      <div className="container-custom">
        <AnimatedSection direction="up">
          <h2 className="text-3xl font-bold text-center text-shop-primary dark:text-white mb-8">Featured Advertisements</h2>
          <StaggeredContainer>
            <AdvertGrid adverts={featuredAdverts} title="" />
          </StaggeredContainer>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedProducts;
