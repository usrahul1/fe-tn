import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"; // Keep your utility function import as is
import {
  LayoutDashboard,
  Car,
  BarChart3,
  Settings,
  User,
  Home,
} from "lucide-react";

const mainNavItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vehicles",
    href: "/dashboard/vehicles",
    icon: Car,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function MainNav({ className, ...props }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span className="hidden md:inline-block">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
