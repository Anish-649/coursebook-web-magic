import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Clock, LogOut, User, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const availableCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
    capacity: 50,
    enrolled: 35,
    credits: 3,
    fee: "$500",
    description: "Learn the fundamentals of programming using Python. Perfect for beginners.",
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures & Algorithms",
    instructor: "Prof. Michael Chen",
    schedule: "Tue, Thu 2:00 PM - 3:30 PM",
    capacity: 40,
    enrolled: 38,
    credits: 4,
    fee: "$650",
    description: "Advanced concepts in data structures and algorithmic problem-solving.",
  },
  {
    id: 3,
    code: "CS301",
    name: "Database Management Systems",
    instructor: "Dr. Emily Rodriguez",
    schedule: "Mon, Wed 1:00 PM - 2:30 PM",
    capacity: 45,
    enrolled: 30,
    credits: 3,
    fee: "$550",
    description: "Design, implement, and manage relational databases.",
  },
  {
    id: 4,
    code: "CS401",
    name: "Web Development",
    instructor: "Mr. James Wilson",
    schedule: "Tue, Thu 10:00 AM - 11:30 AM",
    capacity: 35,
    enrolled: 25,
    credits: 3,
    fee: "$600",
    description: "Build modern web applications using React, Node.js, and databases.",
  },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enrolledCourses, setEnrolledCourses] = useState<typeof availableCourses>([]);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const handleEnroll = (course: typeof availableCourses[0]) => {
    if (enrolledCourses.find(c => c.id === course.id)) {
      toast({
        title: "Already Enrolled",
        description: "You are already enrolled in this course.",
        variant: "destructive",
      });
      return;
    }

    if (course.enrolled >= course.capacity) {
      toast({
        title: "Course Full",
        description: "This course has reached maximum capacity.",
        variant: "destructive",
      });
      return;
    }

    setEnrolledCourses([...enrolledCourses, course]);
    toast({
      title: "Enrollment Successful",
      description: `You have been enrolled in ${course.name}`,
    });
  };

  const handleDropCourse = (courseId: number) => {
    setEnrolledCourses(enrolledCourses.filter(c => c.id !== courseId));
    toast({
      title: "Course Dropped",
      description: "You have been removed from this course.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back!</p>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-primary">{enrolledCourses.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Credits</p>
                  <p className="text-3xl font-bold text-secondary">
                    {enrolledCourses.reduce((sum, course) => sum + course.credits, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Courses</p>
                  <p className="text-3xl font-bold text-accent">{availableCourses.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="available">Available Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{course.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant="secondary">{course.code}</Badge>
                          <span>{course.credits} Credits</span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-accent">
                        {course.fee}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {course.enrolled}/{course.capacity} seats filled
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleEnroll(course)}
                      className="w-full"
                      disabled={enrolledCourses.some(c => c.id === course.id) || course.enrolled >= course.capacity}
                    >
                      {enrolledCourses.some(c => c.id === course.id) ? "Already Enrolled" : "Enroll Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Courses Enrolled</h3>
                  <p className="text-muted-foreground">
                    Browse available courses and enroll to get started!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="border-primary/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{course.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Badge variant="default">{course.code}</Badge>
                            <Badge variant="secondary">{course.credits} Credits</Badge>
                          </CardDescription>
                        </div>
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{course.schedule}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDropCourse(course.id)}
                        variant="outline"
                        className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        Drop Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
