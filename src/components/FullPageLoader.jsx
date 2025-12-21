const FullPageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        
        <div className="relative">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
          <span className="absolute inset-0 rounded-full animate-ping bg-orange-400 opacity-20"></span>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
          Loading LocalChefBazaar
        </h2>

        <p className="text-sm text-gray-500">
          Please wait while we prepare your experience 🍽️
        </p>

      </div>
    </div>
  );
};

export default FullPageLoader;
