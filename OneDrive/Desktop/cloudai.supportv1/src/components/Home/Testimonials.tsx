
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Verified Customer",
    content: "I'm extremely impressed with the quality of the products. The minimalist desk lamp I purchased exceeded my expectations and customer service was outstanding!",
    rating: 5,
    image: "/images/placeholder.svg"
  },
  {
    id: 2,
    name: "Michael T.",
    role: "Verified Customer",
    content: "Fast shipping and excellent quality. I've ordered multiple items and have never been disappointed. The attention to detail in packaging is also worth mentioning.",
    rating: 5,
    image: "/images/placeholder.svg"
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Verified Customer",
    content: "The Bluetooth speaker I bought has amazing sound quality for its size. I've recommended ModernShop to all my friends and family.",
    rating: 4,
    image: "/images/placeholder.svg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-shop-primary text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers about their shopping experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-shop-dark/30 p-6 rounded-lg border border-gray-700"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              <p className="mb-6 text-gray-300">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
