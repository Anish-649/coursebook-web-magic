import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, BookOpen, LogOut, TrendingUp, DollarSign, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const stats = {
    totalStudents: 156,
    totalFaculty: 12,
    totalCourses: 24,
    totalRevenue: "$156,000",
    enrollmentRate: 78,
    activeUsers: 142,
  };

  const recentEnrollments = [
    { id: 1, student: "John Doe", course: "CS101 - Intro to Programming", date: "2025-11-15", status: "Confirmed" },
    { id: 2, student: "Jane Smith", course: "CS201 - Data Structures", date: "2025-11-14", status: "Confirmed" },
    { id: 3, student: "Mike Johnson", course: "CS301 - Database Systems", date: "2025-11-14", status: "Pending" },
    { id: 4, student: "Sarah Wilson", course: "CS401 - Web Development", date: "2025-11-13", status: "Confirmed" },
  ];

  const topCourses = [
    { name: "Introduction to Programming", enrolled: 45, capacity: 50, percentage: 90 },
    { name: "Web Development", enrolled: 38, capacity: 40, percentage: 95 },
    { name: "Data Structures", enrolled: 35, capacity: 45, percentage: 78 },
    { name: "Database Systems", enrolled: 30, capacity: 45, percentage: 67 },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">System Overview</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalStudents}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Faculty</p>
                  <p className="text-3xl font-bold text-secondary">{stats.totalFaculty}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    2 new this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold text-accent">{stats.totalCourses}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    3 added this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold">{stats.totalRevenue}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    18% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrollment Rate</p>
                  <p className="text-3xl font-bold text-secondary">{stats.enrollmentRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    5% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-accent">{stats.activeUsers}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently online
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="enrollments">Recent Enrollments</TabsTrigger>
            <TabsTrigger value="courses">Popular Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <CardTitle>Recent Enrollments</CardTitle>
                <CardDescription>Latest student course registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{enrollment.student}</p>
                        <p className="text-sm text-muted-foreground">{enrollment.course}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={enrollment.status === "Confirmed" ? "default" : "secondary"}>
                          {enrollment.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{enrollment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Courses</CardTitle>
                <CardDescription>Top courses by enrollment percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topCourses.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{course.name}</p>
                        <span className="text-sm text-muted-foreground">
                          {course.enrolled}/{course.capacity} students
                        </span>
                      </div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                          style={{ width: `${course.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{course.percentage}% capacity</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
