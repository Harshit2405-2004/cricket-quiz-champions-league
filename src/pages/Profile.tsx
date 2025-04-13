
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Share2, Clock, Gift } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const { toast } = useToast();
  
  // In a real app, this would come from authentication and database
  const userProfile = {
    name: "Cricket Fan",
    email: "fan@cricketquiz.com",
    totalPoints: 3250,
    rank: 42,
    quizzesTaken: 175,
    correctAnswers: 743,
    accuracy: 85,
    referralCode: "CRICFAN42",
    badges: [
      { name: "Quiz Master", description: "Completed 100 quizzes", icon: "🏆" },
      { name: "Perfect Streak", description: "5 perfect quizzes in a row", icon: "🔥" },
      { name: "Early Bird", description: "Joined during beta", icon: "🦅" },
      { name: "Social Butterfly", description: "Referred 5 friends", icon: "🦋" }
    ],
    rewards: [
      { name: "IPL Team Cap", points: 2000, status: "redeemed", date: "2023-05-15" },
      { name: "₹500 Coupon", points: 1000, status: "available", date: null }
    ]
  };
  
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(userProfile.referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-cricket-ipl-blue flex items-center justify-center text-white text-4xl font-bold">
              {userProfile.name.charAt(0)}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">{userProfile.name}</h1>
              <p className="text-muted-foreground mb-4">{userProfile.email}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  <Trophy size={14} />
                  Rank #{userProfile.rank}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  <Award size={14} />
                  {userProfile.totalPoints} Points
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  <Clock size={14} />
                  {userProfile.quizzesTaken} Quizzes
                </Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm text-muted-foreground">
                        Referral Code
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 flex gap-2">
                      <Input 
                        value={userProfile.referralCode} 
                        readOnly 
                        className="font-mono text-center"
                      />
                      <Button size="sm" variant="outline" onClick={handleCopyReferral}>
                        <Share2 size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm text-muted-foreground">
                        Quiz Accuracy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="text-2xl font-bold text-center">
                        {userProfile.accuracy}%
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        {userProfile.correctAnswers} correct answers
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Content */}
          <Tabs
            defaultValue="stats"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Your Cricket Quiz Statistics</CardTitle>
                  <CardDescription>
                    Track your progress and performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                      <p className="text-3xl font-bold">{userProfile.quizzesTaken}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Correct Answers</p>
                      <p className="text-3xl font-bold">{userProfile.correctAnswers}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                      <p className="text-3xl font-bold">{userProfile.totalPoints}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Global Rank</p>
                      <p className="text-3xl font-bold">#{userProfile.rank}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="badges">
              <Card>
                <CardHeader>
                  <CardTitle>Your Earned Badges</CardTitle>
                  <CardDescription>
                    Collection of achievements you've unlocked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userProfile.badges.map((badge, index) => (
                      <div key={index} className="p-4 border rounded-lg flex items-center gap-3">
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                          <p className="font-semibold">{badge.name}</p>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Your Rewards</CardTitle>
                  <CardDescription>
                    Track your redeemed and available rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.rewards.map((reward, index) => (
                      <div 
                        key={index} 
                        className="p-4 border rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Gift className="text-cricket-ipl-purple" />
                          <div>
                            <p className="font-semibold">{reward.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {reward.points} points
                              {reward.status === "redeemed" && reward.date && 
                                ` • Redeemed on ${reward.date}`}
                            </p>
                          </div>
                        </div>
                        
                        <Badge variant={reward.status === "available" ? "outline" : "secondary"}>
                          {reward.status === "available" ? "Available" : "Redeemed"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    You have {userProfile.totalPoints} points available
                  </p>
                  <Button>
                    <Gift size={16} className="mr-2" />
                    View Reward Store
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
