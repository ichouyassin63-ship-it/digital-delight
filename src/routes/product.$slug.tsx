import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Zap, Shield, ArrowLeft, Check } from "lucide-react";
import { products } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    return {
      meta: [
        { title: product ? `${product.name} — DigiStore` : "Produit — DigiStore" },
        { name: "description", content: product?.shortDescription ?? "" },
        { property: "og:title", content: product?.name ?? "" },
        { property: "og:description", content: product?.shortDescription ?? "" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center text-center">
      <div>
        <p className="font-heading text-xl font-bold text-foreground">Produit introuvable</p>
        <Link to="/catalog" className="mt-4 inline-block text-sm text-primary hover:underline">
          Retour au catalogue
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Produit introuvable</p>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        to="/catalog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-2xl border border-border"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {product.categoryLabel}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()} avis)
            </span>
            <span className="flex items-center gap-1 text-sm text-primary">
              <Zap className="h-3.5 w-3.5" /> Livraison instantanée
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-heading text-4xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Features */}
          <ul className="mt-6 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary" /> {f}
              </li>
            ))}
          </ul>

          {/* Add to cart */}
          <button
            onClick={() => addItem(product)}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-heading text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
          >
            <ShoppingCart className="h-5 w-5" /> Ajouter au panier
          </button>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" /> Paiement sécurisé
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" /> Activation immédiate
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
