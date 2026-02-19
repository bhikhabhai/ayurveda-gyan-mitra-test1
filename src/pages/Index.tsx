import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Flower2, Heart, Sparkles } from "lucide-react";

const features = [
  { icon: Leaf, title: "Herbal Remedies", desc: "Learn about powerful Ayurvedic herbs and their healing properties" },
  { icon: Heart, title: "Dosha Analysis", desc: "Understand your Vata, Pitta, and Kapha constitution" },
  { icon: Flower2, title: "Daily Wellness", desc: "Get personalized Ayurvedic diet and lifestyle guidance" },
  { icon: Sparkles, title: "Ancient Wisdom", desc: "Explore Panchakarma, Rasayana, and traditional practices" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute top-10 left-10 text-[200px] leading-none select-none">🍃</div>
          <div className="absolute bottom-10 right-10 text-[160px] leading-none select-none">🪷</div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 animate-fade-in-up">
            Ancient Wisdom · Modern Guidance
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight mb-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            भारत संस्कृति संवित
          </h1>
          <p className="font-display text-xl md:text-2xl text-primary mt-2 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Bharat Sanskriti Samvita
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Your personal Ayurveda companion — ask about herbs, remedies, doshas, diet, and the timeless healing traditions of India. In Hindi or English.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/chat")}
            className="text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Leaf className="mr-2 h-5 w-5" />
            Start Conversation
          </Button>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="flex gap-4 p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border/50">
        <p>🍃 Rooted in Ayurveda · Powered by AI</p>
      </footer>
    </div>
  );
};

export default Index;
