
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardCard from "@/components/LeaderboardCard";
import Layout from "@/components/Layout";

// Sample leaderboard data - in a real app, this would come from an API
const sampleDailyLeaderboard = [
  { id: 1, name: "Rohit S.", score: 210, rank: 1 },
  { id: 2, name: "Virat K.", score: 180, rank: 2 },
  { id: 3, name: "Dhoni M.", score: 150, rank: 3 },
  { id: 4, name: "Jasprit B.", score: 140, rank: 4 },
  { id: 5, name: "Hardik P.", score: 130, rank: 5 },
  { id: 6, name: "Ravindra J.", score: 120, rank: 6 },
  { id: 7, name: "KL Rahul", score: 110, rank: 7 },
  { id: 8, name: "Rishabh P.", score: 100, rank: 8 },
  { id: 9, name: "Yuzvendra C.", score: 90, rank: 9 },
  { id: 10, name: "Shikhar D.", score: 80, rank: 10 },
];

const sampleWeeklyLeaderboard = [
  { id: 2, name: "Virat K.", score: 980, rank: 1 },
  { id: 1, name: "Rohit S.", score: 940, rank: 2 },
  { id: 3, name: "Dhoni M.", score: 850, rank: 3 },
  { id: 5, name: "Hardik P.", score: 780, rank: 4 },
  { id: 4, name: "Jasprit B.", score: 720, rank: 5 },
  { id: 8, name: "Rishabh P.", score: 650, rank: 6 },
  { id: 6, name: "Ravindra J.", score: 590, rank: 7 },
  { id: 7, name: "KL Rahul", score: 540, rank: 8 },
  { id: 11, name: "Shreyas I.", score: 500, rank: 9 },
  { id: 12, name: "Suryakumar Y.", score: 470, rank: 10 },
];

const sampleAllTimeLeaderboard = [
  { id: 2, name: "Virat K.", score: 5430, rank: 1 },
  { id: 3, name: "Dhoni M.", score: 5280, rank: 2 },
  { id: 1, name: "Rohit S.", score: 4950, rank: 3 },
  { id: 13, name: "Sachin T.", score: 4800, rank: 4 },
  { id: 14, name: "Rahul D.", score: 4650, rank: 5 },
  { id: 5, name: "Hardik P.", score: 4200, rank: 6 },
  { id: 6, name: "Ravindra J.", score: 3980, rank: 7 },
  { id: 4, name: "Jasprit B.", score: 3750, rank: 8 },
  { id: 15, name: "Sourav G.", score: 3600, rank: 9 },
  { id: 7, name: "KL Rahul", score: 3450, rank: 10 },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("daily");
  // In a real app, this would be the logged-in user's ID
  const currentUserId = 5; // For demonstration
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Cricket Quiz Leaderboard
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="all-time">All Time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <LeaderboardCard 
                title="Today's Top Players" 
                entries={sampleDailyLeaderboard} 
                currentUserId={currentUserId}
              />
            </TabsContent>
            
            <TabsContent value="weekly">
              <LeaderboardCard 
                title="This Week's Champions" 
                entries={sampleWeeklyLeaderboard} 
                currentUserId={currentUserId}
              />
            </TabsContent>
            
            <TabsContent value="all-time">
              <LeaderboardCard 
                title="All Time Cricket Masters" 
                entries={sampleAllTimeLeaderboard} 
                currentUserId={currentUserId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
