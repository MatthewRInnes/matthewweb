
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AnimatedSection } from "../Animation/AnimatedSection";
import { Textarea } from "@/components/ui/textarea";

interface SecureFormProps {
  type: "login" | "signup" | "contact" | "newsletter";
  onSubmit?: (data: Record<string, any>) => void;
  className?: string;
  isSubmitting?: boolean;
}

export const SecureForm = ({
  type,
  onSubmit,
  className = "",
  isSubmitting = false,
}: SecureFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localSubmitting, setLocalSubmitting] = useState(false);

  // Form schemas for validation
  const schemas = {
    login: z.object({
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    }),
    signup: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
    contact: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      message: z.string().min(10, "Message must be at least 10 characters"),
    }),
    newsletter: z.object({
      email: z.string().email("Please enter a valid email address"),
    }),
  };

  // Form fields based on form type
  const formFields = {
    login: [
      { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
      { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    ],
    signup: [
      { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
      { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
      { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
      { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
    ],
    contact: [
      { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
      { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
      { name: "message", label: "Message", type: "textarea", placeholder: "How can we help you?" },
    ],
    newsletter: [
      { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
    ],
  };

  // Form titles
  const formTitles = {
    login: "Sign In",
    signup: "Create an Account",
    contact: "Get in Touch",
    newsletter: "Subscribe to Our Newsletter",
  };

  // Submit button text
  const buttonText = {
    login: "Sign In",
    signup: "Create Account",
    contact: "Send Message",
    newsletter: "Subscribe",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalSubmitting(true);

    try {
      // Validate form data using the appropriate schema
      const schema = schemas[type];
      await schema.parseAsync(formData);

      // Call onSubmit if provided
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default success message
        toast.success("Form submitted successfully");
      }
      
      // Clear form after submission
      setFormData({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set validation errors
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the errors in the form");
      } else {
        toast.error("An error occurred. Please try again.");
        console.error("Form submission error:", error);
      }
    } finally {
      setLocalSubmitting(false);
    }
  };

  // Use either prop-passed isSubmitting or local state
  const submitting = isSubmitting || localSubmitting;

  return (
    <AnimatedSection direction="up" className={className}>
      <div className="glass-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-6">{formTitles[type]}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formFields[type].map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name} className="mb-1 block">
                {field.label}
              </Label>
              
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className={`w-full min-h-[100px] ${
                    errors[field.name] 
                      ? "border-shop-error focus:ring-shop-error" 
                      : ""
                  }`}
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className={errors[field.name] ? "border-shop-error focus:ring-shop-error" : ""}
                  autoComplete={field.type === "password" ? "current-password" : field.name === "email" ? "email" : "off"}
                />
              )}
              
              {errors[field.name] && (
                <p className="text-shop-error text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
          
          <Button 
            type="submit" 
            className="w-full bg-shop-secondary hover:bg-shop-secondary/90 text-white py-2 mt-6"
            disabled={submitting}
          >
            {submitting ? "Processing..." : buttonText[type]}
          </Button>
        </form>
      </div>
    </AnimatedSection>
  );
};
