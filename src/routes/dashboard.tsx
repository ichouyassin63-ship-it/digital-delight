import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { User, Package, Clock, CreditCard, LogOut, Settings, ChevronRight } from "lucide-react";
import { mockOrders } from "@/lib/mock-data";

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 rounded-xl border border-border bg-card p-6"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <User className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">Jean Dupont</h1>
          <p className="text-sm text-muted-foreground">jean.dupont@email.com</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Commandes", value: mockOrders.length.toString(), icon: Package },
          { label: "Complétées", value: completedOrders.toString(), icon: Clock },
          { label: "Total dépensé", value: `${totalSpent.toFixed(0)}€`, icon: CreditCard },
          { label: "Membre depuis", value: "2024", icon: User },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <stat.icon className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 font-heading text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">Commandes récentes</h2>
          <Link
            to="/orders"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Voir tout <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {mockOrders.slice(0, 3).map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.map((i) => i.product.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{order.total.toFixed(2)}€</p>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { icon: Settings, label: "Paramètres du compte", desc: "Modifiez vos informations" },
          { icon: LogOut, label: "Déconnexion", desc: "Se déconnecter du compte" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
