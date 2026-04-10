import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function MobileBottomNav() {
  const location = useLocation();
  const { totalItems } = useCart();
  const path = location.pathname;

  const items = [
    { to: "/" as const, icon: Home, label: "Accueil" },
    { to: "/catalog" as const, icon: Search, label: "Catalogue" },
    { to: "/cart" as const, icon: ShoppingCart, label: "Panier", badge: totalItems },
    { to: "/dashboard" as const, icon: User, label: "Compte" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const isActive = item.to === "/" ? path === "/" : path.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex min-w-0 flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge != null && item.badge > 0 && (
                  <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-bold leading-none text-primary-foreground">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
