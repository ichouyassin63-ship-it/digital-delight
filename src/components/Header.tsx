import { Link } from "@tanstack/react-router";
import { ShoppingCart, Search, User, Zap } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            <span className="font-heading text-lg font-bold text-foreground sm:text-xl">
              Digi<span className="text-primary">Store</span>
            </span>
          </Link>
        </div>

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

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/catalog"
            className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            to="/dashboard"
            className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground sm:-right-1 sm:-top-1 sm:h-5 sm:w-5 sm:text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
