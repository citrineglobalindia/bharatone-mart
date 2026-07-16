import { Link } from "react-router-dom";
import { CheckCircle2, Package, Truck } from "lucide-react";

export default function OrderConfirmation() {
  const id = "BOM-" + Math.floor(10000 + Math.random() * 89999);
  return (
    <div className="container-x py-16 text-center">
      <CheckCircle2 className="mx-auto text-india-green" size={64} />
      <h1 className="mt-4 text-2xl font-bold">Order placed successfully!</h1>
      <p className="mt-1 text-gray-500">Thank you for shopping with BharatOne Mart.</p>
      <div className="mx-auto mt-6 max-w-md card p-5 text-left">
        <div className="flex justify-between text-sm"><span className="text-gray-500">Order ID</span><span className="font-bold">{id}</span></div>
        <div className="mt-2 flex justify-between text-sm"><span className="text-gray-500">Estimated delivery</span><span className="font-semibold">3–5 business days</span></div>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-3 text-xs">
          <span className="flex items-center gap-1 text-india-green"><CheckCircle2 size={14} /> Confirmed</span>
          <span className="flex items-center gap-1 text-gray-400"><Package size={14} /> Packed</span>
          <span className="flex items-center gap-1 text-gray-400"><Truck size={14} /> Shipped</span>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/account" className="btn-outline">Track order</Link>
        <Link to="/" className="btn-primary">Continue shopping</Link>
      </div>
    </div>
  );
}
