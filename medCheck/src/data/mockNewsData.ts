export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: "Recall" | "Safety Alert" | "Industry News";
  description: string;
  severity?: "high" | "medium" | "low";
}

export const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "FDA Issues Nationwide Recall for Blood Pressure Medication",
    date: "2025-11-14",
    category: "Recall",
    description: "Valsartan tablets recalled due to potential cancer-causing impurity detected in manufacturing process.",
    severity: "high"
  },
  {
    id: "2",
    title: "Popular Pain Relief Drug Withdrawn from Shelves",
    date: "2025-11-12",
    category: "Recall",
    description: "Major pharmacy chains removing acetaminophen product following contamination concerns at production facility.",
    severity: "high"
  },
  {
    id: "3",
    title: "New Counterfeit Detection Standards Announced",
    date: "2025-11-10",
    category: "Industry News",
    description: "Pharmaceutical industry adopts advanced blockchain verification system to combat fake medications.",
    severity: "medium"
  },
  {
    id: "4",
    title: "Diabetes Medication Shortage Continues",
    date: "2025-11-08",
    category: "Safety Alert",
    description: "Supply chain disruptions affect availability of insulin products across multiple regions.",
    severity: "medium"
  },
  {
    id: "5",
    title: "Antibiotic Packaging Error Prompts Voluntary Recall",
    date: "2025-11-05",
    category: "Recall",
    description: "Incorrect dosage information printed on labels for amoxicillin capsules.",
    severity: "medium"
  },
  {
    id: "6",
    title: "FDA Approves Enhanced Drug Tracking System",
    date: "2025-11-01",
    category: "Industry News",
    description: "New regulations require manufacturers to implement serialization for all prescription medications.",
    severity: "low"
  }
];
