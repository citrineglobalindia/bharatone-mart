import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { inr } from "../lib/format.js";

export default function RfqModal({ product, onClose }) {
  const [qty, setQty] = useState(product?.moq * 10 || 100);
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-2xl bg-white p-5 shadow-pop sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">Get Best Price</h3>
                <p className="text-sm text-gray-500">Suppliers will send you their best B2B quotes.</p>
              </div>
              <button onClick={onClose} className="btn-ghost p-1"><X size={20} /></button>
            </div>
            <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <span className="text-2xl">{product?.emoji}</span>
              <div className="text-sm">
                <div className="font-semibold text-gray-800">{product?.name}</div>
                <div className="text-xs text-india-navy">B2B from {inr(product?.b2bFrom)} · MOQ {product?.moq}</div>
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Required quantity</label>
                  <input type="number" min={product?.moq || 1} value={qty} onChange={(e) => setQty(+e.target.value)} className="input" />
                </div>
                <div>
                  <label className="label">Target price / unit</label>
                  <input className="input" placeholder="₹ optional" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Delivery pincode</label><input className="input" placeholder="500001" /></div>
                <div><label className="label">Business name</label><input className="input" placeholder="Your firm" /></div>
              </div>
              <div><label className="label">GSTIN (optional)</label><input className="input" placeholder="36ABCDE1234F1Z5" /></div>
              <button className="btn-green w-full">Request quotes from suppliers</button>
              <p className="text-center text-[11px] text-gray-400">Typically 3–6 quotes within 24 hours.</p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto text-india-green" size={48} />
            <h3 className="mt-3 text-lg font-bold">RFQ submitted!</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
              Your request for <b>{new Intl.NumberFormat("en-IN").format(qty)} units</b> of {product?.name} has been sent to verified suppliers. Track responses under My RFQs.
            </p>
            <button onClick={onClose} className="btn-primary mx-auto mt-5">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
