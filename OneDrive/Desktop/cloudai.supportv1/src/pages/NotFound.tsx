import { Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">The page you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
