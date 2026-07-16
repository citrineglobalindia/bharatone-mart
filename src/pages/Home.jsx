import { Link } from "react-router-dom";
import { ArrowRight, Package, TrendingUp, Users } from "lucide-react";
import { categories } from "../data/categories.js";
import { featured, deals } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";

export default function Home() {
  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="bg-gradient-to-br from-saffron-50 via-white to-india-greenLight">
        <div className="container-x grid items-center gap-6 py-10 md:grid-cols-2 md:py-14">
          <div>
            <span className="chip bg-white text-saffron-700 shadow-card">🇮🇳 Serving Indian Citizens</span>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              One Mart for <span className="text-saffron-600">every</span> Indian —
              <span className="text-india-green"> retail</span> & <span className="text-india-navy">wholesale</span>.
            </h1>
            <p className="mt-4 max-w-lg text-gray-600">
              Shop everyday essentials at retail prices, or buy in bulk with tiered pricing and instant supplier quotes. Electronics to grocery, all in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/category/electronics" className="btn-primary">Start shopping <ArrowRight size={16} /></Link>
              <Link to="/b2b" className="btn-outline">Buy in bulk (B2B)</Link>
            </div>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {[[Package, "1.9L+", "Products"], [Users, "2,400+", "Verified sellers"], [TrendingUp, "27k+", "Pincodes"]].map(([Icon, n, l], i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="text-saffron-600" size={20} />
                  <div><div className="text-lg font-bold leading-none">{n}</div><div className="text-xs text-gray-500">{l}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 4).map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="card flex flex-col items-center justify-center gap-2 p-6 transition-transform hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${c.tone}10, ${c.tone}22)` }}>
                <span className="text-4xl">{c.emoji}</span>
                <span className="text-sm font-semibold text-gray-800">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container-x">
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
        <section className="py-4">
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
        <section className="py-8">
          <SectionHeader title="Featured for you" sub="Popular picks this week" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </section>
      </div>
    </div>
  );
}
