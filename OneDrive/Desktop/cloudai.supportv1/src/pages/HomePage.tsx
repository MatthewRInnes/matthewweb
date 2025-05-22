import Layout from "@/components/Layout/Layout";
import { Hero } from "@/components/Home/Hero";
import { Newsletter } from "@/components/Home/Newsletter";

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <Newsletter />
      </div>
    </Layout>
  );
};

export default HomePage;
