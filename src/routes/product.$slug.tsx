import { createFileRoute, Link } from "@tanstack/react-router";
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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <Link
        to="/catalog"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="grid gap-6 sm:gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="animate-fade-in overflow-hidden rounded-xl border border-border sm:rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="animate-fade-in-delay">
          <span className="inline-block rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground sm:px-3 sm:py-1 sm:text-xs">
            {product.categoryLabel}
          </span>
          <h1 className="mt-2 font-heading text-2xl font-bold text-foreground sm:mt-3 sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary sm:h-4 sm:w-4" />
              <span className="text-xs font-medium text-foreground sm:text-sm">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground sm:text-sm">
              ({product.reviewCount.toLocaleString()} avis)
            </span>
            <span className="flex items-center gap-1 text-xs text-primary sm:text-sm">
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Livraison instantanée
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2 sm:mt-6 sm:gap-3">
            <span className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through sm:text-lg">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary sm:px-3 sm:py-1 sm:text-sm">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:text-sm">
            {product.description}
          </p>

          {/* Features */}
          <ul className="mt-4 space-y-1.5 sm:mt-6 sm:space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-foreground sm:text-sm">
                <Check className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" /> {f}
              </li>
            ))}
          </ul>

          {/* Add to cart */}
          <button
            onClick={() => addItem(product)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] sm:mt-8 sm:py-4"
          >
            <ShoppingCart className="h-5 w-5" /> Ajouter au panier
          </button>

          <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground sm:mt-4 sm:text-xs">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" /> Paiement sécurisé
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" /> Activation immédiate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
