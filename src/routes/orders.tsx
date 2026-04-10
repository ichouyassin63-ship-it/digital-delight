import { createFileRoute, Link } from "@tanstack/react-router";
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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <Link
        to="/dashboard"
        className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground sm:mb-6 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au tableau de bord
      </Link>

      <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Mes Commandes</h1>
      <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
        {mockOrders.length} commande{mockOrders.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: typeof mockOrders[0] }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (order.deliveryCode) {
      navigator.clipboard.writeText(order.deliveryCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Package className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
          <div>
            <p className="font-heading text-xs font-semibold text-foreground sm:text-sm">{order.id}</p>
            <p className="text-[10px] text-muted-foreground sm:text-xs">{order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-3 sm:py-1 sm:text-xs ${
              order.status === "completed"
                ? "bg-chart-3/10 text-chart-3"
                : order.status === "pending"
                  ? "bg-chart-4/10 text-chart-4"
                  : "bg-destructive/10 text-destructive"
            }`}
          >
            {order.status === "completed" ? "Complétée" : order.status === "pending" ? "En cours" : "Remboursée"}
          </span>
          <span className="font-heading text-sm font-bold text-foreground sm:text-lg">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 sm:gap-3 sm:p-3">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-8 w-8 rounded-md object-cover sm:h-10 sm:w-10"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-medium text-foreground sm:text-sm">{item.product.name}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">Qté: {item.quantity}</p>
            </div>
            <span className="text-xs font-medium text-foreground sm:text-sm">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Delivery Code */}
      {order.deliveryCode && order.status === "completed" && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2 sm:mt-4 sm:p-3">
          <span className="text-[10px] text-muted-foreground sm:text-xs">Code :</span>
          <code className="flex-1 truncate font-mono text-xs text-primary sm:text-sm">{order.deliveryCode}</code>
          <button onClick={copyCode} className="shrink-0 text-primary hover:text-primary/80">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
