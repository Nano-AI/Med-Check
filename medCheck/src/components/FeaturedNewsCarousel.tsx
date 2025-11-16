import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewsArticle } from "@/data/mockNewsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeaturedNewsCarouselProps {
  articles: NewsArticle[];
}

const FeaturedNewsCarousel = ({ articles }: FeaturedNewsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-orange-500 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="relative bg-primary/10 rounded-xl overflow-hidden border border-border w-full">
      <div className="relative h-[320px] sm:h-[400px] md:h-[450px]">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <div className="container mx-auto px-4 sm:px-8 py-6 sm:py-12 h-full flex items-center justify-center">
              <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
                <Badge className={getSeverityColor(article.severity)}>
                  {article.category}
                </Badge>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight break-words">
                  {article.title}
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                  {article.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
              ? "bg-primary w-6 sm:w-8"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedNewsCarousel;
