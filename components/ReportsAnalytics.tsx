import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Download,
  LineChart,
  PieChart,
  FileText,
} from "lucide-react";

export default function ReportsAnalytics() {
  // Mock data for charts
  const [productionData] = useState([
    { month: "Jan", produced: 15200, target: 15000 },
    { month: "Feb", produced: 14800, target: 15000 },
    { month: "Mar", produced: 16300, target: 15000 },
    { month: "Apr", produced: 17200, target: 17000 },
    { month: "May", produced: 16900, target: 17000 },
    { month: "Jun", produced: 18100, target: 17000 },
  ]);

  const [salesData] = useState([
    { month: "Jan", revenue: 42500, cost: 28500, profit: 14000 },
    { month: "Feb", revenue: 38700, cost: 27200, profit: 11500 },
    { month: "Mar", revenue: 45300, cost: 29800, profit: 15500 },
    { month: "Apr", revenue: 47900, cost: 31500, profit: 16400 },
    { month: "May", revenue: 46200, cost: 30800, profit: 15400 },
    { month: "Jun", revenue: 52300, cost: 33600, profit: 18700 },
  ]);

  const [topProducts] = useState([
    { name: "Lavender Bliss", sales: 4850, percentage: 22 },
    { name: "Ocean Breeze", sales: 3920, percentage: 18 },
    { name: "Citrus Fresh", sales: 3650, percentage: 17 },
    { name: "Honey Almond", sales: 2980, percentage: 14 },
    { name: "Eucalyptus Mint", sales: 2540, percentage: 12 },
    { name: "Others", sales: 3760, percentage: 17 },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>

      {/* Date Range Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Data Range</h2>
            <div className="flex items-center space-x-4">
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button>Generate Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Production vs Target Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5" />
            Production vs Target
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            {/* This would be a chart in a real application */}
            <div className="h-full w-full flex items-center justify-center bg-muted rounded">
              <div className="space-y-2">
                <p className="text-center text-muted-foreground">
                  Production vs Target Chart
                </p>
                <div className="flex gap-4">
                  {productionData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-10 bg-muted-foreground/20 h-[100px]">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-primary"
                          style={{
                            height: `${(item.produced / 20000) * 100}px`,
                          }}
                        ></div>
                        <div
                          className="absolute bottom-0 left-0 right-0 border-t-2 border-destructive"
                          style={{ bottom: `${(item.target / 20000) * 100}px` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue, Cost, Profit Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2 h-5 w-5" />
            Financial Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            {/* This would be a chart in a real application */}
            <div className="h-full w-full flex items-center justify-center bg-muted rounded">
              <div className="space-y-2">
                <p className="text-center text-muted-foreground">
                  Revenue, Cost, and Profit Chart
                </p>
                <div className="flex gap-4">
                  {salesData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-16 bg-muted-foreground/20 h-[100px]">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-green-500"
                          style={{ height: `${(item.profit / 60000) * 100}px` }}
                        ></div>
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-destructive"
                          style={{ height: `${(item.cost / 60000) * 100}px` }}
                        ></div>
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-primary"
                          style={{
                            height: `${(item.revenue / 60000) * 100}px`,
                            opacity: 0.3,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Selling Products */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center">
            <PieChart className="mr-2 h-5 w-5" />
            <CardTitle>Top Selling Products</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32 text-sm">{product.name}</div>
                  <div className="flex-1">
                    <Progress value={product.percentage} className="h-2" />
                  </div>
                  <div className="w-32 text-right text-sm">
                    <span className="font-medium">
                      {product.sales.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      ({product.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="mr-2 h-5 w-5" />
            Export Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Production Report (PDF)
            </Button>
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Financial Report (PDF)
            </Button>
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Inventory Report (PDF)
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Data (Excel)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
