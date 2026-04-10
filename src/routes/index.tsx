import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Shield, Clock, ArrowRight, Star, TrendingUp } from "lucide-react";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const popularProducts = products.filter((p) => p.popular);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px] sm:h-[500px] sm:w-[800px] sm:blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="animate-fade-in">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs">
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Livraison instantanée en Algérie
            </span>
            <h1 className="mx-auto mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight text-foreground sm:mt-6 sm:text-5xl lg:text-7xl">
              Vos produits numériques{" "}
              <span className="gradient-glow-text">au meilleur prix</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:mt-6 sm:max-w-2xl sm:text-lg">
              Abonnements, licences, cartes cadeaux et clés d'activation.
              Paiement sécurisé par CCP, BaridiMob & Edahabia.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                to="/catalog"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 sm:w-auto sm:px-8 sm:py-3.5"
              >
                Explorer le catalogue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 font-heading text-sm font-semibold text-secondary-foreground transition-colors hover:bg-muted sm:w-auto sm:px-8 sm:py-3.5"
              >
                Mon espace client
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-delay mx-auto mt-10 grid max-w-sm grid-cols-2 gap-4 sm:mt-16 sm:max-w-3xl sm:grid-cols-4 sm:gap-6">
            {[
              { value: "15K+", label: "Clients" },
              { value: "500+", label: "Produits" },
              { value: "4.8/5", label: "Note" },
              { value: "<30s", label: "Livraison" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-xl font-bold text-primary sm:text-2xl">{stat.value}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-surface px-4 py-10 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8 sm:px-6">
          {[
            { icon: Zap, title: "Livraison Instantanée", desc: "Recevez vos produits en quelques secondes" },
            { icon: Shield, title: "Paiement Sécurisé", desc: "CCP, BaridiMob, Carte Edahabia" },
            { icon: Clock, title: "Support 24/7", desc: "On vous accompagne à tout moment" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 sm:flex-col sm:gap-3 sm:p-6 sm:text-center"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-12 sm:w-12">
                <feature.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground sm:text-base">{feature.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-6">
          <div className="mb-6 flex items-center justify-between sm:mb-8">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Populaires</h2>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">Les plus vendus en Algérie</p>
            </div>
            <Link
              to="/catalog"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline sm:text-sm"
            >
              Voir tout <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {popularProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-t border-border bg-surface px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl text-center sm:px-6">
          <div className="flex items-center justify-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-primary text-primary sm:h-5 sm:w-5" />
            ))}
          </div>
          <p className="mt-2 font-heading text-sm font-semibold text-foreground sm:mt-3 sm:text-lg">
            Noté 4.8/5 par plus de 15 000 clients
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
            Plateforme de confiance en Algérie
          </p>
        </div>
      </section>
    </>
  );
}
