import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Panier — DigiStore" },
      { name: "description", content: "Votre panier d'achat" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Panier vide</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ajoutez des produits pour commencer
        </p>
        <Link
          to="/catalog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform"
        >
          Explorer le catalogue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-foreground">Panier</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} article{items.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item, i) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    to="/product/$slug"
                    params={{ slug: item.product.slug }}
                    className="font-heading text-sm font-semibold text-foreground hover:text-primary"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.product.categoryLabel}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-sm font-bold text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Récapitulatif</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-primary font-medium">Gratuite</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="font-heading font-semibold text-foreground">Total</span>
                <span className="font-heading text-xl font-bold text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]">
            <ShieldCheck className="h-4 w-4" /> Payer maintenant
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Paiement sécurisé — CCP, BaridiMob, Carte Edahabia
          </p>
        </div>
      </div>
    </div>
  );
}
