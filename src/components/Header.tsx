import { Link } from "@tanstack/react-router";
import { ShoppingCart, Search, User, Zap } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-heading text-xl font-bold text-foreground">
            Digi<span className="text-primary">Store</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-sm font-medium text-primary" }}
            activeOptions={{ exact: true }}
          >
            Accueil
          </Link>
          <Link
            to="/catalog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-sm font-medium text-primary" }}
          >
            Catalogue
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-sm font-medium text-primary" }}
          >
            Mon Compte
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/catalog"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            to="/dashboard"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
