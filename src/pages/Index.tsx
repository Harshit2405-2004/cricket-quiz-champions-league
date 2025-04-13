
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Play, Users, Gift } from "lucide-react";
import Layout from "@/components/Layout";

const featuresData = [
  {
    icon: <Play className="w-12 h-12 text-cricket-ipl-blue" />,
    title: "Daily Cricket Quizzes",
    description: "Test your cricket knowledge with new quizzes every day and 5 attempts to maximize points"
  },
  {
    icon: <Trophy className="w-12 h-12 text-cricket-ipl-purple" />,
    title: "Leaderboards",
    description: "Compete with other cricket fans and climb the daily and weekly leaderboards"
  },
  {
    icon: <Users className="w-12 h-12 text-cricket-ipl-blue" />,
    title: "Refer Friends",
    description: "Earn bonus points by inviting your friends to join the Cricket Quiz Champions"
  },
  {
    icon: <Gift className="w-12 h-12 text-cricket-ipl-purple" />,
    title: "Win Rewards",
    description: "Redeem your points for cricket merchandise, coupons, and exclusive content"
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cricket-ipl-blue to-cricket-ipl-purple text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cricket Quiz Champions League
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Test your cricket knowledge, earn points, and win exciting prizes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="cricket-button bg-accent hover:bg-accent/90 text-primary">
              <Link to="/quiz">
                <Play className="mr-2 h-5 w-5" />
                Start Quiz
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="cricket-button bg-white/10 hover:bg-white/20">
              <Link to="/leaderboard">
                <Trophy className="mr-2 h-5 w-5" />
                View Leaderboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuresData.map((feature, index) => (
              <div 
                key={index}
                className="cricket-card p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cricket-ipl-purple to-cricket-ipl-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Test Your Cricket Knowledge?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans and start earning points today!
          </p>
          <Button asChild size="lg" className="cricket-button bg-accent hover:bg-accent/90 text-primary">
            <Link to="/quiz">
              Start Quiz Now
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
