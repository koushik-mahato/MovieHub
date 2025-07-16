import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    loading && (
      <div className=" inset-0 z-50 flex justify-center items-center">
        <img src="/Loader.gif" alt="Loading..." className="w-40 h-40" />
      </div>
    )
  );
};

export default RouteChangeLoader;
