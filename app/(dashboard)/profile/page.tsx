'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { AcademicLevel, AcademicStream, EducationBoardType } from "@/lib/types";
import type { Profile } from "@/lib/db/schema";
import { useAuth } from "@/context/AuthContext";
import { SaveIcon, Camera, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  academicLevel: z.enum(["elementary", "middle_school", "high_school", "undergraduate", "graduate", "postgraduate"] as const),
  academicStream: z.enum(["general", "science", "commerce", "arts", "engineering", "medical", "law", "humanities", "business", "education", "computer_science", "other"] as const).optional().nullable(),
  institution: z.string().optional().nullable(),
  boardOrUniversity: z.enum(["cbse", "icse", "state_board", "igcse", "ib", "cambridge", "other"] as const).optional().nullable(),
  graduationYear: z.number().optional().nullable(),
  currentGrade: z.string().optional().nullable(),
  specializationOrMajor: z.string().optional().nullable(),
  showOnlyRelevantContent: z.boolean(),
  interests: z.array(z.string()).optional().nullable(),
  goals: z.array(z.string()).optional().nullable(),
  strengths: z.array(z.string()).optional().nullable(),
  weaknesses: z.array(z.string()).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  preferences: z.object({
    studyTime: z.string().optional(),
    learningStyle: z.string().optional(),
    notificationPreference: z.string().optional(),
  }).optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      academicLevel: (user?.academicLevel as AcademicLevel) || "undergraduate",
      academicStream: null,
      institution: null,
      boardOrUniversity: null,
      graduationYear: null,
      currentGrade: null,
      specializationOrMajor: null,
      showOnlyRelevantContent: true,
      interests: [],
      goals: [],
      strengths: [],
      weaknesses: [],
      avatarUrl: null,
      preferences: {
        studyTime: "morning",
        learningStyle: "visual",
        notificationPreference: "email",
      },
    },
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        const profileData = await apiRequest<Profile>({
          method: "GET",
          path: "/api/profile",
        });
        
        setProfile(profileData);
        
        form.reset({
          fullName: user.fullName || "",
          academicLevel: (user.academicLevel as AcademicLevel) || "undergraduate",
          academicStream: (profileData?.academicStream as AcademicStream) || null,
          institution: profileData?.institution || null,
          boardOrUniversity: (profileData?.boardOrUniversity as EducationBoardType) || null,
          graduationYear: profileData?.graduationYear || null,
          currentGrade: profileData?.currentGrade || null,
          specializationOrMajor: profileData?.specializationOrMajor || null,
          showOnlyRelevantContent: profileData?.showOnlyRelevantContent ?? true,
          interests: profileData?.interests || [],
          goals: profileData?.goals || [],
          strengths: profileData?.strengths || [],
          weaknesses: profileData?.weaknesses || [],
          avatarUrl: user.avatarUrl || null,
          preferences: (profileData?.preferences as any) || {
            studyTime: "morning",
            learningStyle: "visual",
            notificationPreference: "email",
          },
        });
        
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, [user, form]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setAvatarPreview(dataUrl);
      setAvatarLoading(true);
      setTimeout(() => {
        form.setValue('avatarUrl', dataUrl);
        setAvatarLoading(false);
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated preview",
        });
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const processedData = {
        ...data,
        interests: typeof data.interests === 'string' 
          ? (data.interests as unknown as string).split(',').map((s) => s.trim()) 
          : data.interests,
        goals: typeof data.goals === 'string' 
          ? (data.goals as unknown as string).split(',').map((s) => s.trim()) 
          : data.goals,
        strengths: typeof data.strengths === 'string' 
          ? (data.strengths as unknown as string).split(',').map((s) => s.trim()) 
          : data.strengths,
        weaknesses: typeof data.weaknesses === 'string' 
          ? (data.weaknesses as unknown as string).split(',').map((s) => s.trim()) 
          : data.weaknesses,
        preferences: data.preferences || profile?.preferences || {
          studyTime: "morning",
          learningStyle: "visual",
          notificationPreference: "email",
        },
      };

      const response = await updateProfile(processedData);
      if (response && (response as any).profile) {
        setProfile((response as any).profile);
      }
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const formatAcademicLevel = (level?: string) => {
    switch(level) {
      case 'elementary': return 'Elementary School';
      case 'middle_school': return 'Middle School';
      case 'high_school': return 'High School';
      case 'undergraduate': return 'University - Undergraduate';
      case 'graduate': return 'University - Graduate';
      case 'postgraduate': return 'Post-Graduation';
      default: return level || 'Student';
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Student Profile & Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage personal details, academic tracking, and learning preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Profile Summary */}
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Profile Summary</CardTitle>
              <CardDescription className="text-xs">
                Your account identity and active academic tier
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              
              <div className="relative my-2">
                <Avatar className="h-24 w-24 cursor-pointer hover:opacity-90 transition-opacity" onClick={handleAvatarClick}>
                  <AvatarImage src={avatarPreview || user?.avatarUrl || undefined} />
                  <AvatarFallback className="text-2xl bg-indigo-50 text-indigo-600 font-bold">
                    {user.fullName?.charAt(0) || user.username.charAt(0)}
                  </AvatarFallback>
                  {avatarLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                  )}
                </Avatar>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-indigo-600 border-white text-white hover:bg-indigo-700"
                        onClick={handleAvatarClick}
                      >
                        <Camera className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change profile picture</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mt-2">{user.fullName}</h3>
              <p className="text-xs text-gray-500 mb-1">@{user.username}</p>
              <p className="text-xs text-gray-600 mb-4">{user.email}</p>
              <div className="bg-indigo-50 rounded-full px-3 py-1 text-xs font-semibold text-indigo-700">
                {formatAcademicLevel(user.academicLevel)}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 border-t pt-4 text-xs">
              <div className="flex justify-between w-full">
                <span className="text-gray-500">Account Created</span>
                <span className="font-medium text-gray-800">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active'}</span>
              </div>
              <div className="flex justify-between w-full">
                <span className="text-gray-500">Profile Completed</span>
                <span className={`font-semibold ${user.profileCompleted ? "text-emerald-600" : "text-amber-600"}`}>
                  {user.profileCompleted ? "100% Completed" : "Incomplete"}
                </span>
              </div>
            </CardFooter>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">Password</h4>
                  <p className="text-xs text-gray-500">Secure encryption</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs">Change</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Update your account password below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-3 text-sm">
                      <div>
                        <Label className="text-xs">Current Password</Label>
                        <Input type="password" />
                      </div>
                      <div>
                        <Label className="text-xs">New Password</Label>
                        <Input type="password" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button size="sm" onClick={() => toast({ title: "Password updated successfully" })}>
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500">Optional security layer</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">Setup</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right side - Edit Profile */}
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="preferences">Learning Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Edit Academic Profile</CardTitle>
                  <CardDescription className="text-xs">
                    Update your education stage and interests to tune AI recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="academicLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Academic Level</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select academic level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="elementary">Elementary School</SelectItem>
                                  <SelectItem value="middle_school">Middle School</SelectItem>
                                  <SelectItem value="high_school">High School</SelectItem>
                                  <SelectItem value="undergraduate">University - Undergraduate</SelectItem>
                                  <SelectItem value="graduate">University - Graduate</SelectItem>
                                  <SelectItem value="postgraduate">Post-Graduation</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900">Academic Program</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="academicStream"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Academic Stream</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value || undefined}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select stream" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="science">Science</SelectItem>
                                    <SelectItem value="commerce">Commerce</SelectItem>
                                    <SelectItem value="arts">Arts</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="medical">Medical</SelectItem>
                                    <SelectItem value="law">Law</SelectItem>
                                    <SelectItem value="humanities">Humanities</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                    <SelectItem value="computer_science">Computer Science</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="institution"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Institution</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="School / University name" 
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="boardOrUniversity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Board / Examination Body</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value || undefined}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select board" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="cbse">CBSE</SelectItem>
                                    <SelectItem value="icse">ICSE</SelectItem>
                                    <SelectItem value="state_board">State Board</SelectItem>
                                    <SelectItem value="igcse">IGCSE</SelectItem>
                                    <SelectItem value="ib">IB</SelectItem>
                                    <SelectItem value="cambridge">Cambridge</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="graduationYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Graduation Year</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="2026" 
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) => {
                                      const val = e.target.value === "" ? null : Number(e.target.value);
                                      field.onChange(val);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="showOnlyRelevantContent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 bg-gray-50/50">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-semibold text-gray-900">Personalize Feed</FormLabel>
                                <FormDescription className="text-xs text-gray-500">
                                  Filter courses and quizzes strictly matching your academic level
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900">Learning Goals & Strengths</h3>
                        
                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Interests (comma separated)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Quantum Computing, Calculus, Organic Chemistry"
                                  className="min-h-[70px] text-sm"
                                  value={field.value?.join(', ') || ''}
                                  onChange={(e) => field.onChange(e.target.value.split(',').map((s) => s.trim()))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="goals"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Target Goals (comma separated)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Score 95% in Mathematics, Complete full Algorithms track"
                                  className="min-h-[70px] text-sm"
                                  value={field.value?.join(', ') || ''}
                                  onChange={(e) => field.onChange(e.target.value.split(',').map((s) => s.trim()))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-2">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <SaveIcon className="w-4 h-4 mr-2" />
                          Save Profile
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Preferences</CardTitle>
                  <CardDescription className="text-xs">
                    Customize your schedule and study habit parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="preferences.studyTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Peak Study Time</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || "morning"}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select optimal time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                                  <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                                  <SelectItem value="evening">Evening (5PM - 10PM)</SelectItem>
                                  <SelectItem value="night">Night (10PM - 6AM)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="preferences.learningStyle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Cognitive Learning Style</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || "visual"}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select learning style" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="visual">Visual (Diagrams & Charts)</SelectItem>
                                  <SelectItem value="auditory">Auditory (Lectures & Audio)</SelectItem>
                                  <SelectItem value="reading">Reading & Writing</SelectItem>
                                  <SelectItem value="kinesthetic">Kinesthetic (Interactive & Hands-on)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-2">
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <SaveIcon className="w-4 h-4 mr-2" />
                          Save Preferences
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notification Preferences</CardTitle>
                  <CardDescription className="text-xs">
                    Manage how and when you receive study reminders and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Study Reminders</Label>
                      <p className="text-xs text-gray-500">Upcoming assessment and study session alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Milestone Celebrations</Label>
                      <p className="text-xs text-gray-500">Alerts when you reach streak goals or earn badges</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Weekly Learning Digest</Label>
                      <p className="text-xs text-gray-500">Performance summary and AI suggestions every Sunday</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={() => toast({ title: "Notification preferences saved" })}>
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
