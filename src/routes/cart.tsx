import { createFileRoute, Link } from "@tanstack/react-router";
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
        <ShoppingBag className="h-12 w-12 text-muted-foreground sm:h-16 sm:w-16" />
        <h1 className="mt-3 font-heading text-xl font-bold text-foreground sm:mt-4 sm:text-2xl">Panier vide</h1>
        <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
          Ajoutez des produits pour commencer
        </p>
        <Link
          to="/catalog"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform sm:mt-6"
        >
          Explorer le catalogue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Panier</h1>
      <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
        {items.length} article{items.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-3 sm:space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 rounded-xl border border-border bg-card p-3 sm:gap-4 sm:p-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    to="/product/$slug"
                    params={{ slug: item.product.slug }}
                    className="font-heading text-xs font-semibold text-foreground hover:text-primary sm:text-sm"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">{item.product.categoryLabel}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary sm:h-7 sm:w-7"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-medium text-foreground sm:w-6 sm:text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary sm:h-7 sm:w-7"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-heading text-xs font-bold text-foreground sm:text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-border bg-card p-4 sm:p-6">
          <h2 className="font-heading text-base font-semibold text-foreground sm:text-lg">Récapitulatif</h2>
          <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-primary font-medium">Gratuite</span>
            </div>
            <div className="border-t border-border pt-2 sm:pt-3">
              <div className="flex justify-between">
                <span className="font-heading text-sm font-semibold text-foreground">Total</span>
                <span className="font-heading text-lg font-bold text-foreground sm:text-xl">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] sm:mt-6 sm:py-3.5">
            <ShieldCheck className="h-4 w-4" /> Payer maintenant
          </button>
          <p className="mt-2 text-center text-[10px] text-muted-foreground sm:mt-3 sm:text-xs">
            Paiement sécurisé — CCP, BaridiMob, Carte Edahabia
          </p>
        </div>
      </div>
    </div>
  );
}
