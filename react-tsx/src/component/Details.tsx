import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaTrash, FaEdit, FaTimesCircle } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

import AlertDelete from "../z-global/notifications/AlertDelete";
import BackGroundOpacity from "../z-global/bg/BackGroundOpacity";
import AlertUpdate from "../z-global/notifications/AlertUpdate";

interface CountryData {
  name: string;
  url_flag: string;
  population: number;
  area: number;
  description: string;
}

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [isAlertUpdate, setAlertUpdate] = useState<boolean>(false);
  const [isAlertDelete, setAlertDelete] = useState<boolean>(false);
  const [isUpdateContainer, setUpdateContainer] = useState<boolean>(false);
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [noChanges, setNoChanges] = useState<string>("");
  const [updatedName, setUpdatedName] = useState<string | null>(null);
  const [updatedUrlFlag, setUpdatedUrlFlag] = useState<string | null>(null);
  const [updatedPopulation, setUpdatedPopulation] = useState<number | null>(
    null
  );
  const [updatedArea, setUpdatedArea] = useState<number | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState<string | null>(
    null
  );

  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorUrlFlag, setErrorUrlFlag] = useState<string | null>(null);
  const [errorPopulation, setErrorPopulation] = useState<number | null>(null);
  const [errorArea, setErrorArea] = useState<number | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}show/${id}`)
      .then((response) => {
        const data: CountryData = response.data.data;
        setCountryData(data);
        setUpdatedName(data.name);
        setUpdatedUrlFlag(data.url_flag);
        setUpdatedPopulation(data.population);
        setUpdatedArea(data.area);
        setUpdatedDescription(data.description);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id, isUpdateContainer]);

  const handleEdit = () => {
    setUpdateContainer(true);
  };

  const handleCloseContainer = () => {
    setNoChanges("");
    setUpdateContainer(false);
    setErrorName(null);
    setErrorUrlFlag(null);
    setErrorPopulation(null);
    setErrorArea(null);
    setErrorDescription(null);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}update/${id}`, {
        name: updatedName,
        url_flag: updatedUrlFlag,
        population: updatedPopulation,
        area: updatedArea,
        description: updatedDescription,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === "Data update successfully") {
          setSubmit(false);
          setAlertUpdate(true);
          setUpdateContainer(false);
          setTimeout(() => {
            setAlertUpdate(false);
          }, 2000);

          setErrorName(null);
          setErrorUrlFlag(null);
          setErrorPopulation(null);
          setErrorArea(null);
          setErrorDescription(null);
          setNoChanges("");
        } else {
          setNoChanges(response.data.message);
          setSubmit(false);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setSubmit(false);
          const errorDetails = error.response.data.error.details;
          const nameErr =
            errorDetails && errorDetails.name ? errorDetails.name[0] : "";
          const urlFlag =
            errorDetails && errorDetails.url_flag
              ? errorDetails.url_flag[0]
              : "";
          const population =
            errorDetails && errorDetails.population
              ? errorDetails.population[0]
              : "";
          const area =
            errorDetails && errorDetails.area ? errorDetails.area[1] : "";
          const description =
            errorDetails && errorDetails.description
              ? errorDetails.description[0]
              : "";

          setErrorName(nameErr);
          setErrorUrlFlag(urlFlag);
          setErrorPopulation(population);
          setErrorArea(area);
          setErrorDescription(description);
          setNoChanges("");
        }
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}destroy/${id}`)
      .then((response) => {
        if (response.data.message === "Data delete successfully") {
          setAlertDelete(true);
          setTimeout(() => {
            setAlertDelete(false);
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white drop-shadow-2xl p-4 rounded-l w-[300px] md:w-[600px]">
          {/* Image */}
          {countryData && (
            <img
              src={countryData.url_flag}
              className="w-[256px] mx-auto mb-2"
            />
          )}

          {/* Data */}
          <div className="max-h-[300px] md:max-h-[500px] overflow-y-auto w-full  text-center">
            {countryData && (
              <>
                <h1 className="text-2xl font-bold">{countryData.name}</h1>
                <div>
                  <p>Population: {countryData.population}</p>
                  <p>Area: {countryData.area}</p>
                  {countryData.description !== "undefined" && (
                    <p>Description: {countryData.description}</p>
                  )}
                </div>
              </>
            )}

            <div className="flex items-center justify-center gap-2 mt-4">
              <FaEdit
                onClick={handleEdit}
                className="w-[24px] h-[24px] cursor-pointer  hover:text-blue-500"
              />
              <FaTrash
                onClick={handleDelete}
                className="w-[24px] h-[24px] cursor-pointer hover:text-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {isUpdateContainer && (
        <>
          <BackGroundOpacity />
          {/* Main Container */}
          <div className="fixed inset-0 h-screen z-50 flex items-center justify-center">
            {/* Child Container  */}
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm bg-white drop-shadow-2xl p-4 rounded mx-4 md:mx-0">
              {/* Title And Close Tag */}
              <div className="text-center">
                <FaTimesCircle
                  onClick={handleCloseContainer}
                  className="cursor-pointer w-6 h-6 mx-auto"
                />
                <h1 className="text-2xl my-4 font-bold">Update</h1>
              </div>

              <div className="text-center mt-4">
                <span className="block text-sm font-small text-red-600">
                  {noChanges}
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdate} className="space-y-2">
                {/* Name */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
                    >
                      Name
                    </label>
                    <span className="block text-sm font-small text-red-600">
                      {errorName}
                    </span>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setUpdatedName(String(e.target.value))}
                      value={updatedName !== null ? updatedName : ""}
                      type="text"
                      className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Url Flag */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="urlFlag"
                      className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
                    >
                      Url Flag
                    </label>
                    <span className="block text-sm font-small text-red-600 text-end">
                      {errorUrlFlag}
                    </span>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setUpdatedUrlFlag(String(e.target.value))
                      }
                      value={updatedUrlFlag !== null ? updatedUrlFlag : ""}
                      type="text"
                      className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Population and Area */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Population */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="population"
                        className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
                      >
                        Population
                      </label>
                      <span className="block text-sm font-small text-red-600 text-end">
                        {errorPopulation}
                      </span>
                    </div>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          setUpdatedPopulation(Number(e.target.value))
                        }
                        value={
                          updatedPopulation !== null ? updatedPopulation : ""
                        }
                        type="text"
                        className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Area */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="area"
                        className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
                      >
                        Area
                      </label>
                      <span className="block text-sm font-small text-red-600 text-end">
                        {errorArea}
                      </span>
                    </div>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setUpdatedArea(Number(e.target.value))}
                        value={updatedArea !== null ? updatedArea : ""}
                        type="text"
                        className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="Description"
                      className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
                    >
                      Description
                    </label>
                    <span className="block text-sm font-small text-red-600 text-end">
                      {errorDescription}
                    </span>
                  </div>
                  <div className="mt-2">
                    <textarea
                      onChange={(e) =>
                        setUpdatedDescription(String(e.target.value))
                      }
                      value={
                        updatedDescription !== null ? updatedDescription : ""
                      }
                      className="resize-none h-[150px] p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmit}
                    className={`mt-4 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isSubmit ? "bg-blue-500 cursor-wait" : "hover:bg-blue-600"
                    }`}
                  >
                    {isSubmit ? (
                      <div className="flex items-center">
                        <BiLoaderCircle className="animate-spin mr-2 loader-icon" />{" "}
                        Submitting...
                      </div>
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {isAlertDelete && <AlertDelete />}

      {isAlertUpdate && <AlertUpdate />}
    </>
  );
};

export default Details;
