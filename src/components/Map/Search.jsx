import Popup from "reactjs-popup";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { IoSearch } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import "../../styles/tailwind.css";
import { Checkbox } from "pretty-checkbox-react";
import { GoTrash } from "react-icons/go";
import "@djthoms/pretty-checkbox";
import "@djthoms/pretty-checkbox/dist/pretty-checkbox.min.css";

export default function Search({ typeFilter }) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [value] = useState(typeFilter);

  function closeModal() {
    setOpen(false);
    if (typeFilter != value) {
      window.location.reload();
    }
  }

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      const existingValues = newParams.getAll(key);

      if (existingValues.includes(value)) {
        const newValues = existingValues.filter((v) => v !== value);
        newParams.delete(key);
        newValues.forEach((v) => newParams.append(key, v));
      } else {
        newParams.append(key, value);
      }

      return newParams;
    });
  }

  function handleClearFilters() {
    setSearchParams({});
    window.location.reload();
  }

  return (
    <>
      <div className="absolute flex rounded-full top-3 left-4 bg-navColor text-white shadow-lg duration-200 hover:text-main hover:shadow-main hover:scale-110">
        <button
          type="button"
          className="p-3"
          onClick={() => setOpen((o) => !o)}
        >
          <span>
            <IoSearch size={30} />
          </span>
        </button>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal relative flex flex-col items-center justify-center bg-navColor mx-auto p-4 text-white dark:bg-lightGray dark:text-appColor rounded-lg shadow-xl">
            <div className="absolute flex rounded-full dark:border-[2px] dark:border-[#dbdbdb] top-2 right-3 shadow-sm duration-200 hover:text-main hover:shadow-main hover:scale-110">
              <button
                type="button"
                className="p-3  dark:text-appColor "
                onClick={handleClearFilters}
              >
                <span>
                  <GoTrash size={30} />
                </span>
              </button>
            </div>
            <div className="absolute flex rounded-full top-2 left-3 bg-navColor dark:bg-lightGray dark:text-appColor dark:border-[2px] dark:border-[#dbdbdb] cursor-pointer text-white shadow-sm duration-200 hover:text-main hover:shadow-main hover:scale-110">
              <button className="close p-3" onClick={closeModal}>
                <span>
                  <MdOutlineClose size={30} />
                </span>
              </button>
            </div>
            <div className="w-full flex flex-col text-lg p-4 mt-7">
              <h1 className="text-center text-2xl mb-4">
                Filtr <span className="text-main font-bold">Muala</span> miejsc
              </h1>
              {[
                "polska",
                "ukrainska",
                "amerykanska",
                "turecka",
                "meksykanska",
              ].map((cuisine) => (
                <div
                  className="flex items-center justify-between border-b border-gray-500"
                  key={cuisine}
                >
                  <label className="font-light p-3">
                    Kuchnia{" "}
                    <span className="text-main font-bold">{cuisine}</span>
                  </label>
                  <Checkbox
                    animation="jelly"
                    color="warning"
                    className="my-4"
                    checked={typeFilter.includes(cuisine)}
                    onChange={() => handleFilterChange("category", cuisine)}
                  />
                </div>
              ))}
            </div>
            <button
              className="mx-auto w-1/2 p-3 rounded-xl border-[2px] border-main duration-300 text-white dark:text-appColor hover:text-main hover:shadow-main hover:scale-105"
              onClick={() => window.location.reload()}
            >
              Zapisz zmiany
            </button>
          </div>
        </Popup>
      </div>
    </>
  );
}
Search.propTypes = {
  typeFilter: PropTypes.array.isRequired,
};
