import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              Welcome to CloudAI Support
            </CardTitle>
            <CardDescription className="text-xl text-center mt-4">
              Your trusted partner in AI solutions and support
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              We provide cutting-edge AI solutions and expert support to help your business thrive in the digital age.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
