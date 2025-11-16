import { Pill } from "lucide-react";
import CompactHashInput from "@/components/CompactHashInput";
import FeaturedNewsCarousel from "@/components/FeaturedNewsCarousel";
import NewsCard from "@/components/NewsCard";
import { mockNewsArticles } from "@/data/mockNewsData";
import RedHat from "@/components/RedHat";

const Index = () => {
  const featuredArticles = mockNewsArticles.slice(0, 3);
  const remainingArticles = mockNewsArticles.slice(3);

  return (
    <div className="min-h-screen bg-background">
      {/* <RedHat /> */}
      {/* Compact Header - ensure solid backgrounds, no glassy styles */}
      <div className="bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              MedCheck
            </h1>
          </div>

          <div className="bg-transparent">
            <CompactHashInput />
          </div>
        </div>
      </div>

      {/* Featured News Carousel */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <FeaturedNewsCarousel articles={featuredArticles} />
      </div>

      {/* Additional News Section removed as requested */}
    </div>
  );
};

export default Index;
