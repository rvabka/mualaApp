import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getData } from "../../useFirebaseData";
import { FaYoutube } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { InfinitySpin } from "react-loader-spinner"; // Domniemany import, upewnij się, że masz odpowiedni pakiet

export default function List() {
  const location = useLocation();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const data = await getData();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const previousPage = location.state?.link || "/";

  return (
    <>
      {loading ? (
        <div className="absolute transition duration-300  text-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold bg-gradient-to-tr from-yellow-500 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          <InfinitySpin
            visible={true}
            width="200"
            color="#F18C18"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <>
          <div className="w-4/6 mx-auto mt-4 2xl:w-[1440px] relative">
            <div className="fixed z-10 flex rounded-full top-2 left-4 bg-navColor text-white shadow-lg duration-200 hover:text-main hover:shadow-main hover:scale-110">
              <button type="button" className="p-3">
                <Link to={previousPage}>
                  <FaArrowLeftLong size={30} />
                </Link>
              </button>
            </div>
            {locations.map((location, index) => (
              <Link
                to={`/${location.id}`}
                state={{ from: "/list" }}
                key={location.id}
              >
                <div className="flex items-center 2xl:w-[1000px] justify-center relative text-white dark:text-appColor mb-6 w-full xl:w-4/6 border-[2px] border-[#424349] dark:border-[#e6e5e5] mx-auto p-2 rounded-2xl shadow-xl hover:shadow-main hover:shadow-md transition duration-300">
                  <span className="absolute flex items-center justify-center left-2 top-2 rounded-full bg-main size-6 text-white">
                    {index + 1} {/* Index + 1 for better readability */}
                  </span>
                  <div className="w-4/6 mt-7 flex justify-center flex-col font-medium text-left">
                    <h1 className="lg:text-xl xl:text-2xl mb-2">
                      {location.title}
                    </h1>
                    <a
                      href={location.youtube}
                      className="group flex w-1/2 p-7 items-center lg:text-lg xl:text-xl justify-center lg:mt-2 bg-gradient-to-tr from-orange-400 dark:text-white via-amber-400 to-orange-400 rounded-2xl shadow-lg transition-colors hover:bg-whiteHover"
                    >
                      <FaYoutube className="mr-1 duration-300 group-hover:text-red-600" />
                      Youtube
                    </a>
                  </div>
                  <div className="w-3/6 max-h-1/2">
                    <div className="rounded-2xl overflow-hidden aspect-w-16 aspect-h-9">
                      <img
                        src={location.mainImage}
                        className="object-cover w-full h-full"
                        alt="main image"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
