import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { to: "/" as const, label: "Accueil" },
  { to: "/catalog" as const, label: "Catalogue" },
  { to: "/cart" as const, label: "Panier" },
  { to: "/dashboard" as const, label: "Mon Compte" },
  { to: "/orders" as const, label: "Mes Commandes" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          {/* Full-screen backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setOpen(false)}
          />
          {/* Menu panel */}
          <div className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-background">
            <nav className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  activeProps={{ className: "rounded-xl px-4 py-3.5 text-base font-medium text-primary bg-primary/10" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-border px-4 pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm">Livraison instantanée en Algérie</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
