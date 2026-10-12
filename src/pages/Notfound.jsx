import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        
        <div className="text-8xl font-extrabold text-blue-600 mb-4">
          404
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>

        <p className="text-gray-500 text-lg mb-8">
          Oops! The page you're looking for doesn't exist or may have been
          moved.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-600">
            Check the URL or return to your dashboard to continue managing
            your tasks.
          </p>
        </div>

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          ← Back to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default Notfound;



