// @ts-nocheck
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  TimerReset,
  Users,
} from "lucide-react";

export default function ProductionTasks() {
  // Mock data for employee tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      batch: "B-1043",
      product: "Lavender Bliss",
      quantity: 300,
      status: "in-progress",
      deadline: "2025-03-31 15:00",
      assigned: true,
    },
    {
      id: 2,
      batch: "B-1044",
      product: "Ocean Breeze",
      quantity: 250,
      status: "pending",
      deadline: "2025-04-01 12:00",
      assigned: true,
    },
    {
      id: 3,
      batch: "B-1045",
      product: "Citrus Fresh",
      quantity: 350,
      status: "pending",
      deadline: "2025-04-01 16:30",
      assigned: true,
    },
    {
      id: 4,
      batch: "B-1046",
      product: "Honey Almond",
      quantity: 200,
      status: "pending",
      deadline: "2025-04-02 11:00",
      assigned: false,
    },
    {
      id: 5,
      batch: "B-1047",
      product: "Eucalyptus Mint",
      quantity: 280,
      status: "pending",
      deadline: "2025-04-02 15:00",
      assigned: false,
    },
  ]);

  const [checklist, setChecklist] = useState({
    1: {
      steps: [
        { id: 1, text: "Prepare base oils", completed: true },
        { id: 2, text: "Mix lye solution", completed: true },
        { id: 3, text: "Blend oils and lye", completed: false },
        { id: 4, text: "Add essential oils", completed: false },
        { id: 5, text: "Pour into molds", completed: false },
        { id: 6, text: "Allow to cure", completed: false },
      ],
    },
  });

  const [activeTask, setActiveTask] = useState(1);

  const handleCheckStep = (taskId, stepId) => {
    const updatedChecklist = { ...checklist };

    const stepIndex = updatedChecklist[taskId].steps.findIndex(
      (step) => step.id === stepId
    );
    updatedChecklist[taskId].steps[stepIndex].completed =
      !updatedChecklist[taskId].steps[stepIndex].completed;

    // Check if all steps are completed
    const allCompleted = updatedChecklist[taskId].steps.every(
      (step) => step.completed
    );

    if (allCompleted) {
      const updatedTasks = [...tasks];
      const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
      updatedTasks[taskIndex].status = "completed";
      setTasks(updatedTasks);
    }

    setChecklist(updatedChecklist);
  };

  // Get status badge and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "completed":
        return {
          badge: "success",
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
          label: "Completed",
        };
      case "in-progress":
        return {
          badge: "default",
          icon: <Clock className="h-4 w-4 mr-1" />,
          label: "In Progress",
        };
      case "pending":
        return {
          badge: "secondary",
          icon: <TimerReset className="h-4 w-4 mr-1" />,
          label: "Pending",
        };
      case "delayed":
        return {
          badge: "destructive",
          icon: <AlertCircle className="h-4 w-4 mr-1" />,
          label: "Delayed",
        };
      default:
        return {
          badge: "secondary",
          icon: <TimerReset className="h-4 w-4 mr-1" />,
          label: status,
        };
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Production Tasks</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Assigned Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 space-y-3">
                  {tasks
                    .filter((task) => task.assigned)
                    .map((task) => (
                      <Card
                        key={task.id}
                        onClick={() => setActiveTask(task.id)}
                        className={`cursor-pointer transition-colors ${
                          activeTask === task.id ? "border-primary" : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{task.product}</h3>
                              <p className="text-sm text-muted-foreground">
                                Batch: {task.batch}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {task.quantity} units
                              </p>
                            </div>
                            <Badge
                              variant={getStatusInfo(task.status).badge}
                              className="flex items-center"
                            >
                              {getStatusInfo(task.status).icon}
                              {getStatusInfo(task.status).label}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>Deadline: {task.deadline}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 space-y-3">
                  {tasks
                    .filter((task) => !task.assigned)
                    .map((task) => (
                      <Card key={task.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{task.product}</h3>
                              <p className="text-sm text-muted-foreground">
                                Batch: {task.batch}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {task.quantity} units
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="flex items-center"
                            >
                              <Users className="h-4 w-4 mr-1" />
                              Upcoming
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>Deadline: {task.deadline}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Task Details and Checklist */}
        <div className="lg:col-span-2 space-y-4">
          {tasks.find((task) => task.id === activeTask) && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Task Details</CardTitle>
                    <Badge
                      variant={
                        getStatusInfo(
                          tasks.find((t) => t.id === activeTask).status
                        ).badge
                      }
                      className="flex items-center"
                    >
                      {
                        getStatusInfo(
                          tasks.find((t) => t.id === activeTask).status
                        ).icon
                      }
                      {
                        getStatusInfo(
                          tasks.find((t) => t.id === activeTask).status
                        ).label
                      }
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Product</p>
                      <p className="font-medium">
                        {tasks.find((t) => t.id === activeTask).product}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Batch ID</p>
                      <p className="font-medium">
                        {tasks.find((t) => t.id === activeTask).batch}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-medium">
                        {tasks.find((t) => t.id === activeTask).quantity} units
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">
                        {tasks.find((t) => t.id === activeTask).deadline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Recipe Details</h3>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        <strong>Base Oils:</strong> Olive Oil (40%), Coconut Oil
                        (30%), Shea Butter (15%), Castor Oil (15%)
                      </p>
                      <p className="text-sm mt-1">
                        <strong>Essential Oils:</strong> Lavender (3%),
                        Eucalyptus (1%)
                      </p>
                      <p className="text-sm mt-1">
                        <strong>Additives:</strong> Dried Lavender Buds, Purple
                        Clay for color
                      </p>
                      <p className="text-sm mt-1">
                        <strong>Cure Time:</strong> 4-6 weeks
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="checklist">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="checklist">
                    Production Checklist
                  </TabsTrigger>
                  <TabsTrigger value="quality">Quality Control</TabsTrigger>
                </TabsList>

                <TabsContent value="checklist">
                  <Card>
                    <CardContent className="pt-6">
                      {checklist[activeTask] && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {checklist[activeTask].steps.map((step) => (
                              <div
                                key={step.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`step-${step.id}`}
                                  checked={step.completed}
                                  onCheckedChange={() =>
                                    handleCheckStep(activeTask, step.id)
                                  }
                                />
                                <Label
                                  htmlFor={`step-${step.id}`}
                                  className={
                                    step.completed
                                      ? "line-through text-muted-foreground"
                                      : ""
                                  }
                                >
                                  {step.text}
                                </Label>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="notes">Notes</Label>
                              <Textarea
                                id="notes"
                                placeholder="Add production notes here..."
                                className="mt-1"
                              />
                            </div>

                            <div className="flex space-x-3">
                              <Button>Update Progress</Button>
                              <Button variant="outline">
                                Request Assistance
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quality">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <Label htmlFor="ph">pH Level</Label>
                        <Input
                          id="ph"
                          type="number"
                          step="0.1"
                          placeholder="8.0 - 10.0"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight (grams)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Target: 100g ± 2g"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visual">Visual Inspection</Label>
                        <select
                          id="visual"
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        >
                          <option value="">Select result</option>
                          <option value="pass">Pass</option>
                          <option value="minor_issues">Minor Issues</option>
                          <option value="fail">Fail</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
