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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const isActive = item.to === "/" ? path === "/" : path.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
