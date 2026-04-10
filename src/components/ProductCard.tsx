import { Link } from "@tanstack/react-router";
import { Star, Zap, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group card-hover overflow-hidden rounded-lg border border-border bg-card sm:rounded-xl"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
              {product.badge}
            </span>
          )}
          <div className="absolute bottom-2 left-2 hidden items-center gap-1 sm:flex sm:bottom-3 sm:left-3">
            <Zap className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
            <span className="text-[10px] font-medium text-foreground sm:text-xs">Livraison instantanée</span>
          </div>
        </div>
      </Link>

      <div className="p-2.5 sm:p-4">
        <span className="mb-0.5 inline-block rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground sm:mb-1 sm:rounded-md sm:px-2 sm:text-xs">
          {product.categoryLabel}
        </span>
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="mt-0.5 line-clamp-1 font-heading text-xs font-semibold text-foreground transition-colors group-hover:text-primary sm:mt-1 sm:text-base">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground sm:mt-1 sm:line-clamp-2 sm:text-xs">
          {product.shortDescription}
        </p>

        <div className="mt-1 flex items-center gap-1 sm:mt-2">
          <Star className="h-3 w-3 fill-primary text-primary sm:h-3.5 sm:w-3.5" />
          <span className="text-[10px] font-medium text-foreground sm:text-xs">{product.rating}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="mt-2 flex items-center justify-between sm:mt-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="font-heading text-sm font-bold text-foreground sm:text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95 sm:h-9 sm:w-9 sm:rounded-lg"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
