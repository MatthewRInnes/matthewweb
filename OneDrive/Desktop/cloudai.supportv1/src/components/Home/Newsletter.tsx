import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/lib/prisma";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Subscribe to Our Newsletter</CardTitle>
        <CardDescription>
          Stay updated with the latest AI news, tips, and exclusive offers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </CardContent>
    </Card>
  );
}
