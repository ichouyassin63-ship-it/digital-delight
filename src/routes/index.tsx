import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Zap className="h-3.5 w-3.5" /> Livraison instantanée garantie
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
              Vos produits numériques{" "}
              <span className="gradient-glow-text">au meilleur prix</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Abonnements, licences, cartes cadeaux et clés d'activation.
              Livraison immédiate, paiement sécurisé, support 24/7.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
              >
                Explorer le catalogue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-8 py-3.5 font-heading text-sm font-semibold text-secondary-foreground transition-colors hover:bg-muted"
              >
                Mon espace client
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {[
              { value: "50K+", label: "Clients" },
              { value: "10K+", label: "Produits" },
              { value: "4.8/5", label: "Note moyenne" },
              { value: "<30s", label: "Livraison" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Zap, title: "Livraison Instantanée", desc: "Recevez vos produits en quelques secondes après le paiement" },
            { icon: Shield, title: "Paiement Sécurisé", desc: "Chiffrement SSL, Stripe & PayPal pour une sécurité maximale" },
            { icon: Clock, title: "Support 24/7", desc: "Notre équipe vous accompagne à tout moment" },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-2xl font-bold text-foreground">Populaires</h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Les produits les plus vendus du moment</p>
            </div>
            <Link
              to="/catalog"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Voir tout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-t border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-5 w-5 fill-primary text-primary" />
            ))}
          </div>
          <p className="mt-3 font-heading text-lg font-semibold text-foreground">
            Noté 4.8/5 par plus de 50 000 clients
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Plateforme de confiance pour vos achats numériques
          </p>
        </div>
      </section>
    </>
  );
}
