import { useParams } from "react-router-dom";
import {
  FaRegAddressBook,
  FaYoutube,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import Carousel from "./Carousel";
import { Link, useLocation } from "react-router-dom";
import mualaLogo from "../../assets/mualalogo.png";
import { locations } from "../../data";
import { FaArrowLeftLong } from "react-icons/fa6";

function MarkerDetail() {
  const { id } = useParams();
  const marker = locations.find((loc) => loc.id === id);
  const location = useLocation();

  const previusPage = location.state?.link || "/";
  return (
    <div className="markerdetail h-[90vh] 2xl:w-[1440px] mx-auto bg-appColor dark:bg-lightGray dark:text-appColor overflow-y-auto overflow-x-hidden">
      <div className="fixed z-10 flex rounded-full top-2 left-4 bg-navColor text-white shadow-lg duration-200 hover:text-main hover:shadow-main hover:scale-110">
        <button type="button" className="p-3">
          <Link to={`../${previusPage}`}>
            <FaArrowLeftLong size={30} />
          </Link>
        </button>
      </div>
      <img
        src={mualaLogo}
        className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-16"
        alt="logo"
      />
      <img
        src={marker.mainImage}
        alt="Delicious Noodle Bar"
        className="w-full h-2/5 object-cover bg-center"
      />
      <div className="absolute bottom-4 left-0 right-0 bg-appColor dark:bg-lightGray dark:text-appColor rounded-t-[2rem] 2xl:rounded-none px-8 pt-4 text-fontColor text-xl h-3/5">
        <div className="mx-auto lg:w-3/5 2xl:w-2/5">
          <h1 className="text-5xl text-center tracking-wider font-bold bg-gradient-to-tr from-yellow-500 via-yellow-400 to-amber-500 bg-clip-text text-transparent pb-2">
            {marker.title}
          </h1>
          <p className="text-main text-center dark:font-normal font-extralight italic -mt-2">
            {marker.subtitle}
          </p>
          <p className="flex items-center justify-center dark:font-normal font-extralight mt-3">
            <FaRegAddressBook className="mr-2" />
            {marker.address}
          </p>
          {marker.phone && (
            <a
              href={`tel:${marker.phone}`}
              className="flex items-center justify-center dark:font-normal font-extralight mt-3"
            >
              <FaPhone className="mr-2" />
              {marker.phone}
            </a>
          )}
          <div
            className={`mx-auto grid gap-5 dark:text-white ${
              marker.website === "" ||
              marker.youtube === "" ||
              marker.googleMaps === ""
                ? "grid-cols-2"
                : "grid-cols-3"
            } h-40 text-2xl`}
          >
            {marker.website && (
              <a
                href={marker.website}
                className="group col-span-1 row-span-1 flex items-center justify-center mt-4 px-5 bg-gradient-to-tr from-orange-400 via-amber-400 to-orange-400 rounded-2xl shadow-lg transition-colors hover:bg-whiteHover"
              >
                <TbWorldWww className="mr-1 duration-300 group-hover:text-blue-600" />
                WWW
              </a>
            )}
            <a
              href={marker.youtube}
              className="group col-span-1 row-span-1 flex items-center justify-center mt-4 px-5 bg-gradient-to-tr from-orange-400 via-amber-400 to-orange-400 rounded-2xl shadow-lg transition-colors hover:bg-whiteHover"
              target="_blank"
            >
              <FaYoutube className="mr-1 duration-300 group-hover:text-red-600" />
              Youtube
            </a>
            <a
              href={marker.googleMaps}
              className="group col-span-1 row-span-1 flex items-center justify-center mt-4 px-5 bg-gradient-to-tr from-orange-400 via-amber-400 to-orange-400 rounded-2xl shadow-lg transition-colors hover:bg-whiteHover"
            >
              <FaMapMarkerAlt className="mr-1 duration-300 group-hover:text-green-600" />
              Maps
            </a>
          </div>
          <Carousel images={marker.images} />
        </div>
      </div>
    </div>
  );
}

export default MarkerDetail;
