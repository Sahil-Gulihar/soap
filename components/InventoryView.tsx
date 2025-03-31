import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function InventoryView() {
  // Mock inventory data (read-only for employees)
  const [inventory] = useState([
    {
      id: 1,
      name: "Olive Oil",
      category: "Base Oil",
      stock: 350,
      unit: "liters",
      reorderLevel: 100,
      lastUpdated: "2025-03-28",
    },
    {
      id: 2,
      name: "Coconut Oil",
      category: "Base Oil",
      stock: 280,
      unit: "liters",
      reorderLevel: 100,
      lastUpdated: "2025-03-29",
    },
    {
      id: 3,
      name: "Shea Butter",
      category: "Butter",
      stock: 120,
      unit: "kg",
      reorderLevel: 50,
      lastUpdated: "2025-03-30",
    },
    {
      id: 4,
      name: "Lavender Essential Oil",
      category: "Essential Oil",
      stock: 25,
      unit: "liters",
      reorderLevel: 10,
      lastUpdated: "2025-03-25",
    },
    {
      id: 5,
      name: "Peppermint Essential Oil",
      category: "Essential Oil",
      stock: 18,
      unit: "liters",
      reorderLevel: 10,
      lastUpdated: "2025-03-27",
    },
    {
      id: 6,
      name: "Citric Acid",
      category: "Chemical",
      stock: 75,
      unit: "kg",
      reorderLevel: 30,
      lastUpdated: "2025-03-28",
    },
    {
      id: 7,
      name: "Sodium Hydroxide",
      category: "Chemical",
      stock: 45,
      unit: "kg",
      reorderLevel: 20,
      lastUpdated: "2025-03-29",
    },
    {
      id: 8,
      name: "Packaging Boxes",
      category: "Packaging",
      stock: 1200,
      unit: "pieces",
      reorderLevel: 500,
      lastUpdated: "2025-03-30",
    },
    {
      id: 9,
      name: "Label Stickers",
      category: "Packaging",
      stock: 2500,
      unit: "pieces",
      reorderLevel: 1000,
      lastUpdated: "2025-03-30",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestItem, setRequestItem] = useState({
    itemId: "",
    name: "",
    quantity: "",
    unit: "",
    urgency: "normal",
    notes: "",
  });

  // Filter inventory based on search term and category filter
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "low" && item.stock <= item.reorderLevel) ||
      item.category.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleRequestItem = (item:any) => {
    setRequestItem({
      itemId: item.id,
      name: item.name,
      quantity: "",
      unit: item.unit,
      urgency: "normal",
      notes: "",
    });
    setShowRequestForm(true);
  };

  const handleSubmitRequest = (e:any) => {
    e.preventDefault();
    // In a real app, this would submit the request to the backend
    alert(
      `Request submitted for ${requestItem.quantity} ${requestItem.unit} of ${requestItem.name}`
    );
    setShowRequestForm(false);
    setRequestItem({
      itemId: "",
      name: "",
      quantity: "",
      unit: "",
      urgency: "normal",
      notes: "",
    });
  };

  // Get inventory status badge
  const getStatusBadge = (item:any) => {
    if (item.stock <= item.reorderLevel * 0.5) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (item.stock <= item.reorderLevel) {
      return <Badge variant="secondary">Low</Badge>;
    } else {
      return <Badge variant="secondary">Good</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory View</h1>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="Base Oil">Base Oils</SelectItem>
              <SelectItem value="Butter">Butters</SelectItem>
              <SelectItem value="Essential Oil">Essential Oils</SelectItem>
              <SelectItem value="Chemical">Chemicals</SelectItem>
              <SelectItem value="Packaging">Packaging</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.stock} {item.unit}
                  </TableCell>
                  <TableCell>{getStatusBadge(item)}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRequestItem(item)}
                    >
                      Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Request Form Dialog */}
      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Inventory Item</DialogTitle>
            <DialogDescription>
              Submit a request for the inventory item.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitRequest}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="item-name">Item</Label>
                <Input
                  id="item-name"
                  value={requestItem.name}
                  disabled
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    required
                    min="1"
                    value={requestItem.quantity}
                    onChange={(e) =>
                      setRequestItem({
                        ...requestItem,
                        quantity: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={requestItem.unit}
                    disabled
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="urgency">Urgency</Label>
                <Select
                  required
                  value={requestItem.urgency}
                  onValueChange={(value) =>
                    setRequestItem({ ...requestItem, urgency: value })
                  }
                >
                  <SelectTrigger id="urgency" className="mt-1">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={requestItem.notes}
                  onChange={(e) =>
                    setRequestItem({ ...requestItem, notes: e.target.value })
                  }
                  placeholder="Add any additional notes..."
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
