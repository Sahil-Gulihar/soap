//@ts-nocheck
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PieChart,
  Package,
  Users,
  ShoppingCart,
  BarChart,
  ClipboardList,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function Sidebar({
  menuItems,
  activeSection,
  setActiveSection,
}) {
  // Map icon strings to Lucide React components
  const getIcon = (iconName) => {
    switch (iconName) {
      case "chart-pie":
        return <PieChart className="h-5 w-5" />;
      case "cube":
        return <Package className="h-5 w-5" />;
      case "users":
        return <Users className="h-5 w-5" />;
      case "shopping-cart":
        return <ShoppingCart className="h-5 w-5" />;
      case "chart-bar":
        return <BarChart className="h-5 w-5" />;
      case "clipboard-list":
        return <ClipboardList className="h-5 w-5" />;
      case "calendar":
        return <Calendar className="h-5 w-5" />;
      case "check-circle":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div className="w-64 border-r bg-card flex flex-col h-screen">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Soap Factory</h1>
        <p className="text-sm text-muted-foreground">Management System</p>
      </div>

      <ScrollArea className="flex-1 px-3">
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    activeSection === item.id
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-secondary/50 hover:text-secondary-foreground"
                  )}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="mr-2">{getIcon(item.icon)}</span>
                  <span>{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">
          © 2025 Soap Factory, Inc.
        </p>
      </div>
    </div>
  );
}
