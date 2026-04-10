import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Package, Clock, CreditCard, LogOut, Settings, ChevronRight } from "lucide-react";
import { mockOrders } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mon Compte — DigiStore" },
      { name: "description", content: "Gérez votre compte et vos commandes" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const completedOrders = mockOrders.filter((o) => o.status === "completed").length;
  const totalSpent = mockOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Profile Header */}
      <div className="animate-fade-in flex items-center gap-3 rounded-xl border border-border bg-card p-4 sm:gap-4 sm:p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 sm:h-14 sm:w-14">
          <User className="h-5 w-5 text-primary sm:h-7 sm:w-7" />
        </div>
        <div>
          <h1 className="font-heading text-lg font-bold text-foreground sm:text-xl">Ahmed Benali</h1>
          <p className="text-xs text-muted-foreground sm:text-sm">ahmed.benali@email.com</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4 sm:gap-4">
        {[
          { label: "Commandes", value: mockOrders.length.toString(), icon: Package },
          { label: "Complétées", value: completedOrders.toString(), icon: Clock },
          { label: "Total dépensé", value: formatPrice(totalSpent), icon: CreditCard },
          { label: "Membre depuis", value: "2025", icon: User },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-3 text-center sm:p-4"
          >
            <stat.icon className="mx-auto h-4 w-4 text-primary sm:h-5 sm:w-5" />
            <p className="mt-1.5 font-heading text-sm font-bold text-foreground sm:mt-2 sm:text-lg">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground sm:text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-6 sm:mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-foreground sm:text-lg">Commandes récentes</h2>
          <Link
            to="/orders"
            className="flex items-center gap-1 text-xs text-primary hover:underline sm:text-sm"
          >
            Voir tout <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>

        <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
          {mockOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3 sm:p-4"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Package className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
                <div>
                  <p className="text-xs font-medium text-foreground sm:text-sm">{order.id}</p>
                  <p className="line-clamp-1 text-[10px] text-muted-foreground sm:text-xs">
                    {order.items.map((i) => i.product.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-foreground sm:text-sm">{formatPrice(order.total)}</p>
                <span
                  className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:text-xs ${
                    order.status === "completed"
                      ? "bg-chart-3/10 text-chart-3"
                      : order.status === "pending"
                        ? "bg-chart-4/10 text-chart-4"
                        : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {order.status === "completed" ? "Complétée" : order.status === "pending" ? "En cours" : "Remboursée"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-1 gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-3">
        {[
          { icon: Settings, label: "Paramètres du compte", desc: "Modifiez vos informations" },
          { icon: LogOut, label: "Déconnexion", desc: "Se déconnecter du compte" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:bg-muted sm:p-4"
          >
            <item.icon className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
            <div>
              <p className="text-xs font-medium text-foreground sm:text-sm">{item.label}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
