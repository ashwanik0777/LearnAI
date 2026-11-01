'use client';

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, BookOpen, Flame, ArrowUpRight, Loader2 } from "lucide-react";
import type { Recommendation, Subject } from "@/lib/db/schema";
import type { DashboardData } from "@/lib/types";

export default function RecommendationsPage() {
  const { user, loading: authLoading } = useAuth();

  const { data: dashboardData, isLoading, error, refetch } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    enabled: !!user,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm font-medium text-gray-500">Loading personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <h1 className="text-lg font-semibold text-red-600 mb-2">Error loading recommendations</h1>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  const recommendations: Recommendation[] = dashboardData?.recommendations || [];
  const userSubjects: (Subject & { progress: number })[] = dashboardData?.subjects || [];
  const userSubjectIds: number[] = userSubjects.map((s) => s.id);

  const filteredRecommendations: Recommendation[] = recommendations.filter((rec) =>
    rec.subjectId === null || userSubjectIds.includes(rec.subjectId)
  );

  const weakAreaRecs = filteredRecommendations.filter((rec) => rec.category === 'weak_area');
  const strengthRecs = filteredRecommendations.filter((rec) => rec.category === 'strength');
  const generalRecs = filteredRecommendations.filter((rec) => rec.category === 'recommended');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h1>
            <p className="mt-1 text-sm text-gray-600">Personalized learning resources tailored to your progress and goals</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={() => refetch()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Lightbulb className="mr-2 h-4 w-4" />
              Refresh Recommendations
            </Button>
          </div>
        </div>
      </div>

      {/* Recommendations Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="all">All Recommendations</TabsTrigger>
          <TabsTrigger value="improvement">Areas for Improvement</TabsTrigger>
          <TabsTrigger value="strengths">Build on Strengths</TabsTrigger>
          <TabsTrigger value="discover">Discover New Topics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.length > 0 ? (
              filteredRecommendations.map((recommendation) => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">No recommendations available yet</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Enroll in more subjects to receive personalized AI recommendations.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="improvement">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weakAreaRecs.length > 0 ? (
              weakAreaRecs.map((recommendation) => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Lightbulb className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">No improvement areas identified yet</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Take a few quizzes to help our AI identify target areas for improvement.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="strengths">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengthRecs.length > 0 ? (
              strengthRecs.map((recommendation) => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Flame className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">Building strength profile</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Complete lessons and score above 80% on assessments to unlock advanced recommendations.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="discover">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalRecs.length > 0 ? (
              generalRecs.map((recommendation) => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">Discover new topics</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Explore other subject areas to broaden your skillset.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getBadgeVariant = (category: string) => {
    switch (category) {
      case 'weak_area':
        return 'destructive' as const;
      case 'strength':
        return 'secondary' as const;
      case 'recommended':
        return 'default' as const;
      default:
        return 'outline' as const;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'weak_area':
        return 'Improvement Area';
      case 'strength':
        return 'Build on Strength';
      case 'recommended':
        return 'Recommended';
      default:
        return category;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border-gray-200/80">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant={getBadgeVariant(recommendation.category)}>
            {getCategoryLabel(recommendation.category)}
          </Badge>
          <Badge variant="outline" className="text-xs">{recommendation.type}</Badge>
        </div>
        <CardTitle className="mt-3 text-base text-gray-900 font-semibold">{recommendation.title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2 flex-1">
        <p className="text-sm text-gray-600 leading-relaxed">{recommendation.description}</p>
      </CardContent>
      <CardFooter className="border-t bg-gray-50/70 px-6 py-3 mt-4">
        <Button 
          variant="ghost" 
          className="w-full justify-between text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          asChild
        >
          <a href={recommendation.resourceUrl || '#'}>
            Explore Resource
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
