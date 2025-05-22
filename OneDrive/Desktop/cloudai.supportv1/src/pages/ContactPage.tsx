import Layout from "@/components/Layout/Layout";
import { ContactForm } from "../components/Contact/ContactForm";

const ContactPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <ContactForm />
      </div>
    </Layout>
  );
};

export default ContactPage;
