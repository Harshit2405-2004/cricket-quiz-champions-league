
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminQuizGenerator from "@/components/AdminQuizGenerator";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const { profile } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("questions");
  const [questionStats, setQuestionStats] = useState({
    total: 0,
    aiGenerated: 0,
    manuallyCreated: 0
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!profile?.id) {
        setIsAdmin(false);
        return;
      }

      try {
        // Check if user has admin role
        // In a real app, you would check against a roles table or admin flag
        // For now, we're using a simple check based on email
        // You should implement proper role-based access control
        const isAdminUser = profile.email?.endsWith('@admin.com') || false;
        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };

    const fetchQuestionStats = async () => {
      try {
        // Get question statistics
        const { data: allQuestions, error } = await supabase
          .from('quiz_questions')
          .select('id, source');
          
        if (error) throw error;
        
        const total = allQuestions?.length || 0;
        const aiGenerated = allQuestions?.filter(q => q.source === 'AI').length || 0;
        
        setQuestionStats({
          total,
          aiGenerated,
          manuallyCreated: total - aiGenerated
        });
      } catch (error) {
        console.error("Error fetching question stats:", error);
      }
    };

    checkAdminStatus();
    fetchQuestionStats();
  }, [profile]);

  // Redirect non-admin users
  if (isAdmin === false) {
    return <Navigate to="/" />;
  }

  const handleQuestionsGenerated = () => {
    // Refresh question stats after generating questions
    fetchQuestionStats();
  };

  const fetchQuestionStats = async () => {
    try {
      const { data: allQuestions, error } = await supabase
        .from('quiz_questions')
        .select('id, source');
        
      if (error) throw error;
      
      const total = allQuestions?.length || 0;
      const aiGenerated = allQuestions?.filter(q => q.source === 'AI').length || 0;
      
      setQuestionStats({
        total,
        aiGenerated,
        manuallyCreated: total - aiGenerated
      });
    } catch (error) {
      console.error("Error fetching question stats:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Admin Dashboard
        </h1>

        {isAdmin === null ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{questionStats.total}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Generated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{questionStats.aiGenerated}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Manually Created</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{questionStats.manuallyCreated}</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="questions" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="questions">
                <div className="max-w-2xl mx-auto">
                  <AdminQuizGenerator onSuccess={handleQuestionsGenerated} />
                </div>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      User management functionality will be implemented in a future update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rewards">
                <Card>
                  <CardHeader>
                    <CardTitle>Reward Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Reward management functionality will be implemented in a future update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
