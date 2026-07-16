import { Link } from "react-router-dom";
import { ArrowRight, Package, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { categories } from "../data/categories.js";
import { featured, deals } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";

export default function Home() {
  return (
    <div className="pb-8">
      <div className="container-x pt-5">
        <HeroCarousel />

        {/* trust strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[[Package, "1.9L+", "Products"], [Users, "2,400+", "Verified sellers"], [TrendingUp, "27k+", "Pincodes"], [ShieldCheck, "GST", "Invoicing & KYC"]].map(([Icon, n, l], idx) => (
            <div key={idx} className="card flex items-center gap-3 p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-saffron-50 text-saffron-600"><Icon size={18} /></span>
              <div><div className="text-base font-bold leading-none">{n}</div><div className="text-xs text-gray-500">{l}</div></div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <section className="py-8">
          <SectionHeader title="Shop by category" sub="Browse across retail and wholesale" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="card flex flex-col items-center gap-2 p-4 text-center transition-shadow hover:shadow-pop">
                <span className="grid h-12 w-12 place-items-center rounded-full text-2xl" style={{ background: `${c.tone}1a` }}>{c.emoji}</span>
                <span className="text-xs font-semibold text-gray-700">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* B2B banner */}
        <section className="py-2">
          <div className="overflow-hidden rounded-2xl bg-india-navy px-6 py-8 text-white sm:px-10">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <span className="chip bg-white/15 text-white">For businesses</span>
                <h3 className="mt-2 text-2xl font-bold">Buying in bulk? Get the best supplier price.</h3>
                <p className="mt-1 max-w-xl text-sm text-white/70">Post a requirement and receive competitive quotes from GST-verified suppliers across India — with MOQ, lead time and tiered pricing.</p>
              </div>
              <Link to="/b2b" className="btn bg-saffron-500 text-white hover:bg-saffron-600">Get best price <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        {/* Deals */}
        <section className="py-8">
          <SectionHeader title="Top deals today" sub="Biggest discounts across BharatOne" to="/category/electronics" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {deals.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </section>

        {/* Featured */}
        <section className="py-2">
          <SectionHeader title="Featured for you" sub="Popular picks this week" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </section>
      </div>
    </div>
  );
}
