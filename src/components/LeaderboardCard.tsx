
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Medal } from "lucide-react";

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  rank: number;
  avatar?: string;
}

const LeaderboardRow = ({ entry, isCurrentUser = false }: { entry: LeaderboardEntry, isCurrentUser?: boolean }) => {
  // Determine badge color based on rank
  const badgeIcon = () => {
    switch (entry.rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-700" size={20} />;
      default:
        return <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
          {entry.rank}
        </span>;
    }
  };
  
  return (
    <div className={`flex items-center justify-between py-3 px-4 ${
      isCurrentUser ? "bg-accent/20" : ""
    } ${
      entry.rank <= 3 ? "border-l-4" : ""
    } ${
      entry.rank === 1 ? "border-yellow-500" : 
      entry.rank === 2 ? "border-gray-400" :
      entry.rank === 3 ? "border-amber-700" : ""
    } rounded-md mb-2`}>
      <div className="flex items-center gap-3">
        {badgeIcon()}
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">
            {entry.avatar ? (
              <img src={entry.avatar} alt={entry.name} className="w-full h-full rounded-full" />
            ) : (
              entry.name.charAt(0).toUpperCase()
            )}
          </div>
          <span className={`font-medium ${isCurrentUser ? "text-primary" : ""}`}>
            {entry.name}
          </span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center bg-muted px-2 py-0.5 rounded-full">
          <Award size={16} className="mr-1 text-cricket-ipl-purple" />
          <span className="font-medium">{entry.score}</span>
        </div>
      </div>
    </div>
  );
};

interface LeaderboardCardProps {
  title: string;
  entries: LeaderboardEntry[];
  currentUserId?: number;
}

const LeaderboardCard = ({ title, entries, currentUserId }: LeaderboardCardProps) => {
  return (
    <Card className="w-full cricket-card border-cricket-ipl-blue">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy size={20} className="text-cricket-ipl-blue" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {entries.map((entry) => (
            <LeaderboardRow 
              key={entry.id} 
              entry={entry} 
              isCurrentUser={currentUserId === entry.id} 
            />
          ))}
          
          {entries.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No entries yet. Be the first to earn points!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
