import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#F68B84]">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-3 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#F68B84] text-white px-6 py-3 rounded-lg hover:bg-[#E27872] transition"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;