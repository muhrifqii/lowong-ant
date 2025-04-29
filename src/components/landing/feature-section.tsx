import { Card, CardContent } from "../ui/card";


const features = [
  {
    title: "Fast Posting",
    description: "Post a job in under 2 minutes with a simple form.",
  },
  {
    title: "Real Candidates",
    description: "Jobs seen by actual tech and startup job seekers.",
  },
  {
    title: "Simple & Clean",
    description: "No clutter, just a minimal, fast experience.",
  },
];

export function FeaturesSection() {

  return (
    <section id="features" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Use <span className="text-primary">LowongAnt</span> Job Board?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Designed for simplicity, speed, and efficiency for both companies and candidates.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
