import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <div className="text-6xl">🛒</div>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-1 text-gray-500">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mx-auto mt-5">Back to home</Link>
    </div>
  );
}
