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
      {/* Navbar with MedCheck and icon */}
      <div className="bg-background sticky top-0 z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Pill className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">MedCheck</h1>
        </div>
      </div>
      {/* Hero Section with background image and centered content */}
      <div
        className="w-full h-[340px] sm:h-[420px] md:h-[500px] flex flex-col items-center justify-center relative mb-8"
        style={{
          backgroundImage: "url(https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl sm:text-5xl font-bold text-white text-center drop-shadow-xl mb-4">MedCheck</h1>
          <div className="w-full max-w-2xl px-4">
            {/* Glassy search bar container */}
            <div className="rounded-2xl bg-white/30 backdrop-blur-md shadow-lg p-6">
              <CompactHashInput searchButtonClass="h-16 w-16 text-2xl rounded-full" inputClass="h-16 text-lg sm:text-2xl px-6 sm:px-12 w-full sm:w-[64rem] rounded-xl border-2 border-primary bg-white/40 backdrop-blur" />
            </div>
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
