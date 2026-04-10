import { Link } from "@tanstack/react-router";
import { Zap, Shield, Truck, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { icon: Truck, title: "Livraison Instantanée", desc: "Réception immédiate" },
            { icon: Shield, title: "100% Sécurisé", desc: "Paiement chiffré" },
            { icon: CreditCard, title: "Multi-paiement", desc: "Carte, PayPal, Crypto" },
            { icon: Zap, title: "Support 24/7", desc: "Assistance rapide" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2 text-center">
              <item.icon className="h-6 w-6 text-primary" />
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-bold">DigiStore</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Votre marketplace de produits numériques de confiance.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Produits</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-primary">Abonnements</Link></li>
              <li><Link to="/catalog" className="hover:text-primary">Cartes Cadeau</Link></li>
              <li><Link to="/catalog" className="hover:text-primary">Licences</Link></li>
              <li><Link to="/catalog" className="hover:text-primary">Clés d'activation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-primary cursor-pointer">FAQ</span></li>
              <li><span className="hover:text-primary cursor-pointer">Contact</span></li>
              <li><span className="hover:text-primary cursor-pointer">Remboursement</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-primary cursor-pointer">CGV</span></li>
              <li><span className="hover:text-primary cursor-pointer">Confidentialité</span></li>
              <li><span className="hover:text-primary cursor-pointer">Mentions légales</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground sm:mt-10 sm:pt-6">
          © 2025 DigiStore. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
