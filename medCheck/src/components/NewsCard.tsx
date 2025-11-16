import { AlertTriangle, Info, Newspaper } from "lucide-react";
import { NewsArticle } from "@/data/mockNewsData";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  const getCategoryIcon = () => {
    switch (article.category) {
      case "Recall":
        return <AlertTriangle className="w-4 h-4" />;
      case "Safety Alert":
        return <Info className="w-4 h-4" />;
      default:
        return <Newspaper className="w-4 h-4" />;
    }
  };

  const getSeverityColor = () => {
    switch (article.severity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-all hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-muted-foreground">{getCategoryIcon()}</div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-tight">
              {article.title}
            </h3>
            {article.severity && (
              <Badge variant="outline" className={getSeverityColor()}>
                {article.category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {article.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
