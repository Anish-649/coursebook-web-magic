import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Users, LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  credits: number;
  fee: string;
  description: string;
}

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
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
      description: "Learn the fundamentals of programming using Python.",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    instructor: "",
    schedule: "",
    capacity: "",
    credits: "",
    fee: "",
    description: "",
  });

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      instructor: "",
      schedule: "",
      capacity: "",
      credits: "",
      fee: "",
      description: "",
    });
    setEditingCourse(null);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code || !formData.name || !formData.instructor || !formData.schedule || !formData.capacity || !formData.credits || !formData.fee) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newCourse: Course = {
      id: Date.now(),
      code: formData.code,
      name: formData.name,
      instructor: formData.instructor,
      schedule: formData.schedule,
      capacity: parseInt(formData.capacity),
      enrolled: 0,
      credits: parseInt(formData.credits),
      fee: formData.fee,
      description: formData.description,
    };

    setCourses([...courses, newCourse]);
    toast({
      title: "Course Added",
      description: `${formData.name} has been added successfully.`,
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingCourse) return;

    const updatedCourses = courses.map(course =>
      course.id === editingCourse.id
        ? {
            ...course,
            code: formData.code,
            name: formData.name,
            instructor: formData.instructor,
            schedule: formData.schedule,
            capacity: parseInt(formData.capacity),
            credits: parseInt(formData.credits),
            fee: formData.fee,
            description: formData.description,
          }
        : course
    );

    setCourses(updatedCourses);
    toast({
      title: "Course Updated",
      description: `${formData.name} has been updated successfully.`,
    });
    setEditingCourse(null);
    resetForm();
  };

  const handleDeleteCourse = (courseId: number, courseName: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast({
      title: "Course Deleted",
      description: `${courseName} has been removed.`,
    });
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      instructor: course.instructor,
      schedule: course.schedule,
      capacity: course.capacity.toString(),
      credits: course.credits.toString(),
      fee: course.fee,
      description: course.description,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Faculty Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your courses</p>
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
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold text-secondary">{courses.length}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-primary">
                    {courses.reduce((sum, course) => sum + course.enrolled, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Seats</p>
                  <p className="text-3xl font-bold text-accent">
                    {courses.reduce((sum, course) => sum + (course.capacity - course.enrolled), 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Management */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Course Management</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new course
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g., CS101"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Introduction to Programming"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor *</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="e.g., Dr. John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule *</Label>
                  <Input
                    id="schedule"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    placeholder="e.g., Mon, Wed 10:00 AM - 11:30 AM"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits *</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                      placeholder="3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee">Fee *</Label>
                    <Input
                      id="fee"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      placeholder="$500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Course description..."
                    rows={3}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-secondary hover:bg-secondary/90">
                    Add Course
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{course.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="secondary">{course.code}</Badge>
                      <span>{course.credits} Credits</span>
                      <span>•</span>
                      <span>{course.fee}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={editingCourse?.id === course.id} onOpenChange={(open) => !open && resetForm()}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(course)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Course</DialogTitle>
                          <DialogDescription>
                            Update course information
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditCourse} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-code">Course Code *</Label>
                              <Input
                                id="edit-code"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Course Name *</Label>
                              <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-instructor">Instructor *</Label>
                            <Input
                              id="edit-instructor"
                              value={formData.instructor}
                              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-schedule">Schedule *</Label>
                            <Input
                              id="edit-schedule"
                              value={formData.schedule}
                              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-capacity">Capacity *</Label>
                              <Input
                                id="edit-capacity"
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-credits">Credits *</Label>
                              <Input
                                id="edit-credits"
                                type="number"
                                value={formData.credits}
                                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-fee">Fee *</Label>
                              <Input
                                id="edit-fee"
                                value={formData.fee}
                                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => resetForm()}>
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-secondary hover:bg-secondary/90">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDeleteCourse(course.id, course.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Instructor</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Schedule</span>
                    <span className="font-medium">{course.schedule}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Enrollment</span>
                    <span className="font-medium">
                      {course.enrolled}/{course.capacity} students
                      <Badge variant={course.enrolled >= course.capacity ? "destructive" : "default"} className="ml-2">
                        {course.enrolled >= course.capacity ? "Full" : `${course.capacity - course.enrolled} seats`}
                      </Badge>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
