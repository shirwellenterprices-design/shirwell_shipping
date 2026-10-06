import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Map,
  MapPin,
  Package,
  RotateCcw,
  Settings,
  Truck,
  User,
  Users,
  Wallet,
  ClipboardCheck,
  ScanLine,
  Navigation,
  Camera,
} from "lucide-react";
import type { OpsNavItem } from "@/app/components/ops/OpsShell";

export const ADMIN_NAV: OpsNavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/live-map", label: "Live Map", icon: Map },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/deliveries", label: "Deliveries", icon: Package },
  { href: "/admin/drivers", label: "Drivers", icon: Truck },
  { href: "/admin/assignments", label: "Assignments", icon: ClipboardCheck },
  { href: "/admin/failed-deliveries", label: "Failed Deliveries", icon: AlertTriangle },
  { href: "/admin/returns", label: "Returns", icon: RotateCcw },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export const DRIVER_NAV: OpsNavItem[] = [
  { href: "/driver/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/driver/available-deliveries", label: "Available", icon: Package },
  { href: "/driver/my-deliveries", label: "My Deliveries", icon: ClipboardList },
  { href: "/driver/active-delivery", label: "Active Delivery", icon: Navigation },
  { href: "/driver/map", label: "Map", icon: MapPin },
  { href: "/driver/pickup", label: "Pickup", icon: ScanLine },
  { href: "/driver/delivery", label: "Delivery", icon: Truck },
  { href: "/driver/proof-of-delivery", label: "Proof of Delivery", icon: Camera },
  { href: "/driver/earnings", label: "Earnings", icon: Wallet },
  { href: "/driver/profile", label: "Profile", icon: User },
];
