// @ts-nocheck
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  CheckSquare,
  Clock,
  AlertCircle,
  ClipboardList,
  Goal,
  Microscope,
} from "lucide-react";

export default function QualityControl() {
  // Mock quality control data
  const [qualityTasks, setQualityTasks] = useState([
    {
      id: 1,
      batch: "B-1042",
      product: "Lavender Bliss",
      status: "pending",
      dueDate: "2025-03-31",
      assignedTo: "John Smith",
    },
    {
      id: 2,
      batch: "B-1041",
      product: "Ocean Breeze",
      status: "completed",
      dueDate: "2025-03-30",
      assignedTo: "John Smith",
      result: "pass",
    },
    {
      id: 3,
      batch: "B-1040",
      product: "Citrus Fresh",
      status: "in-progress",
      dueDate: "2025-03-31",
      assignedTo: "John Smith",
    },
    {
      id: 4,
      batch: "B-1039",
      product: "Honey Almond",
      status: "completed",
      dueDate: "2025-03-29",
      assignedTo: "Sarah Johnson",
      result: "pass",
    },
    {
      id: 5,
      batch: "B-1038",
      product: "Eucalyptus Mint",
      status: "completed",
      dueDate: "2025-03-28",
      assignedTo: "John Smith",
      result: "minor_issues",
    },
  ]);

  const [activeTask, setActiveTask] = useState(null);
  const [testResults, setTestResults] = useState({
    appearance: "",
    scent: "",
    texture: "",
    weight: "",
    pH: "",
    notes: "",
  });

  const handleSelectTask = (taskId) => {
    setActiveTask(taskId);
    // Reset test results when selecting a new task
    setTestResults({
      appearance: "",
      scent: "",
      texture: "",
      weight: "",
      pH: "",
      notes: "",
    });
  };

  const handleSubmitResults = (e) => {
    e.preventDefault();

    // Determine pass/fail result based on test results
    let result = "pass";
    if (!testResults.appearance || !testResults.scent || !testResults.texture) {
      result = "fail";
    } else if (
      testResults.appearance === "poor" ||
      testResults.scent === "poor" ||
      testResults.texture === "poor"
    ) {
      result = "fail";
    } else if (
      testResults.appearance === "fair" ||
      testResults.scent === "fair" ||
      testResults.texture === "fair"
    ) {
      result = "minor_issues";
    }

    // Update the task status and result
    const updatedTasks = qualityTasks.map((task) => {
      if (task.id === activeTask) {
        return { ...task, status: "completed", result };
      }
      return task;
    });

    setQualityTasks(updatedTasks);
    setActiveTask(null);
  };

  // Get status badge
  const getStatusInfo = (status, result) => {
    switch (status) {
      case "completed":
        if (result === "pass") {
          return {
            badge: "success",
            icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
            label: "Pass",
          };
        } else if (result === "minor_issues") {
          return {
            badge: "warning",
            icon: <AlertCircle className="h-4 w-4 mr-1" />,
            label: "Minor Issues",
          };
        } else {
          return {
            badge: "destructive",
            icon: <AlertCircle className="h-4 w-4 mr-1" />,
            label: "Fail",
          };
        }
      case "in-progress":
        return {
          badge: "default",
          icon: <Clock className="h-4 w-4 mr-1" />,
          label: "In Progress",
        };
      case "pending":
        return {
          badge: "secondary",
          icon: <ClipboardList className="h-4 w-4 mr-1" />,
          label: "Pending",
        };
      default:
        return {
          badge: "secondary",
          icon: <ClipboardList className="h-4 w-4 mr-1" />,
          label: status,
        };
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quality Control</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Control Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 space-y-3">
                  {qualityTasks
                    .filter(
                      (task) =>
                        task.status === "pending" ||
                        task.status === "in-progress"
                    )
                    .map((task) => (
                      <Card
                        key={task.id}
                        onClick={() => handleSelectTask(task.id)}
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
                                Due: {task.dueDate}
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
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Inspections</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 space-y-3">
                  {qualityTasks
                    .filter((task) => task.status === "completed")
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
                                Completed: {task.dueDate}
                              </p>
                            </div>
                            <Badge
                              variant={
                                getStatusInfo(task.status, task.result).badge
                              }
                              className="flex items-center"
                            >
                              {getStatusInfo(task.status, task.result).icon}
                              {getStatusInfo(task.status, task.result).label}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Quality Control Form */}
        <div className="lg:col-span-2">
          {activeTask ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  Quality Control Inspection -{" "}
                  {qualityTasks.find((t) => t.id === activeTask)?.product}
                </CardTitle>
                <CardDescription className="flex items-center">
                  <span className="font-medium text-foreground">Batch:</span>{" "}
                  {qualityTasks.find((t) => t.id === activeTask)?.batch} |
                  <span className="font-medium text-foreground ml-1">
                    Due Date:
                  </span>{" "}
                  {qualityTasks.find((t) => t.id === activeTask)?.dueDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitResults} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="appearance">Visual Appearance</Label>
                      <Select
                        required
                        value={testResults.appearance}
                        onValueChange={(value) =>
                          setTestResults({ ...testResults, appearance: value })
                        }
                      >
                        <SelectTrigger id="appearance" className="mt-1">
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="scent">Scent Evaluation</Label>
                      <Select
                        required
                        value={testResults.scent}
                        onValueChange={(value) =>
                          setTestResults({ ...testResults, scent: value })
                        }
                      >
                        <SelectTrigger id="scent" className="mt-1">
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="texture">Texture Assessment</Label>
                      <Select
                        required
                        value={testResults.texture}
                        onValueChange={(value) =>
                          setTestResults({ ...testResults, texture: value })
                        }
                      >
                        <SelectTrigger id="texture" className="mt-1">
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="weight">Weight Check (grams)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={testResults.weight}
                        onChange={(e) =>
                          setTestResults({
                            ...testResults,
                            weight: e.target.value,
                          })
                        }
                        placeholder="Target: 100g ± 2g"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ph">pH Level</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      value={testResults.pH}
                      onChange={(e) =>
                        setTestResults({ ...testResults, pH: e.target.value })
                      }
                      placeholder="Target: 8.0 - 10.0"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes and Observations</Label>
                    <Textarea
                      id="notes"
                      rows="4"
                      value={testResults.notes}
                      onChange={(e) =>
                        setTestResults({
                          ...testResults,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Enter any additional observations or concerns..."
                      className="mt-1"
                    />
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTask(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Results</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-8">
              <div className="text-muted-foreground mb-4">
                <Microscope className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Task Selected</h3>
              <p className="text-muted-foreground text-center">
                Select a quality control task from the left panel to begin
                inspection.
              </p>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Goal className="mr-2 h-5 w-5" />
                Quality Standards Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Visual Appearance</h3>
                  <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>
                      Excellent: No visual defects, consistent color, smooth
                      texture
                    </li>
                    <li>
                      Good: Minor variations in color, no significant defects
                    </li>
                    <li>
                      Fair: Noticeable color variations, minor surface defects
                    </li>
                    <li>
                      Poor: Significant defects, inconsistent coloring, cracks
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Scent Evaluation</h3>
                  <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>
                      Excellent: Strong, consistent fragrance matching product
                      profile
                    </li>
                    <li>
                      Good: Clear fragrance with slight variations from standard
                    </li>
                    <li>Fair: Mild fragrance with notable variations</li>
                    <li>
                      Poor: Weak fragrance, significant deviation, or unpleasant
                      notes
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">pH Standards</h3>
                  <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Target pH range: 8.0 - 10.0</li>
                    <li>Acceptable range: 7.5 - 10.5</li>
                    <li>
                      Outside this range requires further testing and evaluation
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
