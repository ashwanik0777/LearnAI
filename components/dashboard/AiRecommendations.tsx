'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, GraduationCap, Calendar, Bookmark, PlayCircle } from "lucide-react";
import { Recommendation } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

interface AiRecommendationsProps {
  recommendations: Recommendation[];
}

export function AiRecommendations({ recommendations }: AiRecommendationsProps) {
  const router = useRouter();
  // Helper function to get icon based on recommendation type
  const getIcon = (type: string) => {
    switch (type) {
      case 'improvement':
        return Brain;
      case 'course':
        return Lightbulb;
      case 'exercise':
        return GraduationCap;
      default:
        return Lightbulb;
    }
  };
  
  // Helper function to get background gradient based on category
  const getBackgroundStyle = (category: string) => {
    switch (category) {
      case 'weak_area':
        return 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100';
      case 'strength':
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100';
      case 'recommended':
        return 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100';
      default:
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100';
    }
  };
  
  // Helper function to get category badge
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'weak_area':
        return 'bg-red-100 text-red-600';
      case 'strength':
        return 'bg-green-100 text-green-600';
      case 'recommended':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  // Helper function to get button text based on type
  const getButtonText = (type: string) => {
    switch (type) {
      case 'improvement':
        return 'Start Now';
      case 'course':
        return 'Explore';
      case 'exercise':
        return 'Try Now';
      default:
        return 'View';
    }
  };
  
  // Helper function to get icon color based on category
  const getIconColor = (category: string) => {
    switch (category) {
      case 'weak_area':
        return 'text-indigo-600';
      case 'strength':
        return 'text-amber-600';
      case 'recommended':
        return 'text-emerald-600';
      default:
        return 'text-blue-600';
    }
  };
  
  const [showAll, setShowAll] = useState(false);
  // Filter recommendations to only show those related to user's selected subjects
  const filteredRecommendations = recommendations.filter(rec => 
    // Include recommendations that are linked to a subject
    rec.subjectId !== null
  );
  
  const displayRecs = showAll ? filteredRecommendations : filteredRecommendations.slice(0, 3);
  
  return (
    <Card className="border-gray-100">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">AI-Powered Recommendations</h3>
          <Button 
            variant="link" 
            className="text-primary-600 p-0 h-auto"
            onClick={() => router.push("/recommendations")}
          >
            View All
          </Button>
        </div>
        
        <div className={cn(
          "space-y-4", 
          !showAll && "max-h-[400px] overflow-hidden"
        )}>
          {displayRecs.length > 0 ? (
            displayRecs.map((rec) => {
              const Icon = getIcon(rec.type);
              const categoryText = rec.category === 'weak_area' ? 'Weak Area' : 
                                  rec.category === 'strength' ? 'Strength' : 'Recommended';
                                  
              return (
                <div 
                  key={rec.id} 
                  className={cn("p-4 rounded-lg border", getBackgroundStyle(rec.category))}
                >
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-lg mr-4">
                      <Icon className={cn("text-lg h-5 w-5", getIconColor(rec.category))} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                        <span className={cn("text-xs px-2 py-1 rounded-full font-medium", getCategoryBadge(rec.category))}>
                          {categoryText}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <div className="mt-3 flex items-center space-x-3">
                        <Button 
                          className="bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm px-3 py-1.5 h-auto shadow-sm"
                          onClick={() => {
                            if (rec.resourceUrl) {
                              window.open(rec.resourceUrl, '_blank');
                            } else if (rec.subjectId) {
                              router.push(`/courses`);
                            } else {
                              router.push(`/recommendations`);
                            }
                          }}
                        >
                          <PlayCircle className="mr-1 h-4 w-4" />
                          {getButtonText(rec.type)}
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 h-auto"
                        >
                          {rec.type === 'improvement' ? (
                            <>
                              <Calendar className="mr-1 h-4 w-4" />
                              Schedule
                            </>
                          ) : (
                            <>
                              <Bookmark className="mr-1 h-4 w-4" />
                              Save
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recommendations available for your selected subjects.</p>
            </div>
          )}
        </div>
        
        {filteredRecommendations.length > 3 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="w-full"
            >
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AiRecommendations;
