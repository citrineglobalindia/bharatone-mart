import { Link, useNavigate } from "react-router-dom";
import { Store, Smartphone } from "lucide-react";

export default function Login() {
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-india-navy p-10 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-500"><Store size={18} /></div><span className="text-lg font-extrabold">BharatOne Mart</span></Link>
        <div><h2 className="text-3xl font-bold leading-tight">Welcome back to Bharat's own marketplace.</h2><p className="mt-3 max-w-sm text-white/70">Shop retail, buy wholesale, and manage your business — all with one account.</p></div>
        <p className="text-xs text-white/50">🇮🇳 For Serving Indian Citizens</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={(e) => { e.preventDefault(); nav("/account"); }} className="w-full max-w-sm">
          <Link to="/" className="mb-6 flex items-center gap-2 lg:hidden"><div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-500 text-white"><Store size={18} /></div><span className="text-lg font-extrabold">BharatOne Mart</span></Link>
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your mobile to continue</p>
          <div className="mt-6 space-y-3">
            <div><label className="label">Mobile number</label><div className="flex items-center rounded-lg border border-gray-300 focus-within:border-saffron-500"><span className="pl-3 text-sm text-gray-500">+91</span><input className="w-full px-2 py-2.5 text-sm outline-none" placeholder="98765 43210" /></div></div>
            <button className="btn-primary w-full"><Smartphone size={16} /> Send OTP</button>
          </div>
          <div className="my-5 flex items-center gap-3 text-xs text-gray-400"><div className="h-px flex-1 bg-gray-200" /> or <div className="h-px flex-1 bg-gray-200" /></div>
          <button className="btn-outline w-full">Continue with email</button>
          <p className="mt-6 text-center text-sm text-gray-500">New to BharatOne? <Link to="/register" className="font-semibold text-saffron-600">Create account</Link></p>
        </form>
      </div>
    </div>
  );
}
