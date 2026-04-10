import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, Copy, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { mockOrders } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Mes Commandes — DigiStore" },
      { name: "description", content: "Historique de toutes vos commandes" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au tableau de bord
      </Link>

      <h1 className="font-heading text-3xl font-bold text-foreground">Mes Commandes</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {mockOrders.length} commande{mockOrders.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-8 space-y-4">
        {mockOrders.map((order, i) => (
          <OrderCard key={order.id} order={order} index={i} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order, index }: { order: typeof mockOrders[0]; index: number }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (order.deliveryCode) {
      navigator.clipboard.writeText(order.deliveryCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">{order.id}</p>
            <p className="text-xs text-muted-foreground">{order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              order.status === "completed"
                ? "bg-chart-3/10 text-chart-3"
                : order.status === "pending"
                  ? "bg-chart-4/10 text-chart-4"
                  : "bg-destructive/10 text-destructive"
            }`}
          >
            {order.status === "completed" ? "Complétée" : order.status === "pending" ? "En cours" : "Remboursée"}
          </span>
          <span className="font-heading text-lg font-bold text-foreground">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="mt-4 space-y-2">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-10 w-10 rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">Qté: {item.quantity}</p>
            </div>
            <span className="text-sm font-medium text-foreground">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Delivery Code */}
      {order.deliveryCode && order.status === "completed" && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <span className="text-xs text-muted-foreground">Code :</span>
          <code className="flex-1 font-mono text-sm text-primary">{order.deliveryCode}</code>
          <button onClick={copyCode} className="text-primary hover:text-primary/80">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
    </motion.div>
  );
}
