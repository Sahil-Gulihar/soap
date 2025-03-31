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
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useEffect } from "react";

export default function Sidebar({
  menuItems,
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
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

  // Close sidebar on mobile when a menu item is clicked
  const handleMenuItemClick = (id) => {
    setActiveSection(id);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // Add effect to close sidebar on resize if screen becomes mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64 border-r bg-card flex flex-col h-screen transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Soap Factory</h1>
            <p className="text-sm text-muted-foreground">Management System</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
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
                    onClick={() => handleMenuItemClick(item.id)}
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
    </>
  );
}
