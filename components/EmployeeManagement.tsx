// components/EmployeeManagement.js
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, UserPlus } from "lucide-react";

export default function EmployeeManagement() {
  // Mock employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Smith",
      role: "Production Supervisor",
      department: "Production",
      status: "active",
      joinDate: "2022-05-15",
      contact: "555-1234",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Quality Control Specialist",
      department: "Quality",
      status: "active",
      joinDate: "2022-07-20",
      contact: "555-2345",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Production Operator",
      department: "Production",
      status: "active",
      joinDate: "2023-01-10",
      contact: "555-3456",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Inventory Manager",
      department: "Logistics",
      status: "active",
      joinDate: "2022-08-05",
      contact: "555-4567",
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Production Operator",
      department: "Production",
      status: "active",
      joinDate: "2023-03-18",
      contact: "555-5678",
    },
    {
      id: 6,
      name: "Jennifer Taylor",
      role: "Quality Control Specialist",
      department: "Quality",
      status: "leave",
      joinDate: "2022-09-12",
      contact: "555-6789",
    },
    {
      id: 7,
      name: "Robert Martinez",
      role: "Production Operator",
      department: "Production",
      status: "active",
      joinDate: "2023-02-22",
      contact: "555-7890",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      role: "Packaging Specialist",
      department: "Packaging",
      status: "active",
      joinDate: "2023-05-08",
      contact: "555-8901",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "",
    status: "active",
    contact: "",
  });

  // Handle adding new employee
  const handleAddEmployee = (e:any) => {
    e.preventDefault();

    const newEmployeeWithId = {
      ...newEmployee,
      id: employees.length + 1,
      joinDate: new Date().toISOString().split("T")[0],
    };

    setEmployees([...employees, newEmployeeWithId]);
    setNewEmployee({
      name: "",
      role: "",
      department: "",
      status: "active",
      contact: "",
    });
    setShowAddForm(false);
  };

  // Filter employees based on search term and department filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      employee.department.toLowerCase() === filter.toLowerCase() ||
      employee.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter details for the new employee.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={newEmployee.name}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    required
                    value={newEmployee.role}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, role: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newEmployee.department}
                    onValueChange={(value) =>
                      setNewEmployee({ ...newEmployee, department: value })
                    }
                    required
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Production">Production</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Packaging">Packaging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newEmployee.status}
                    onValueChange={(value) =>
                      setNewEmployee({ ...newEmployee, status: value })
                    }
                    required
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    required
                    value={newEmployee.contact}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Employee</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Production">Production</SelectItem>
              <SelectItem value="Quality">Quality</SelectItem>
              <SelectItem value="Logistics">Logistics</SelectItem>
              <SelectItem value="Packaging">Packaging</SelectItem>
              <SelectItem value="active">Active Employees</SelectItem>
              <SelectItem value="leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "active" ? "default" : "secondary"
                      }
                    >
                      {employee.status === "active" ? "Active" : "On Leave"}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell>{employee.contact}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-1">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
