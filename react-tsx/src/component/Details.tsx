import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaTrash, FaEdit } from "react-icons/fa";
import AlertDelete from "../z-global/notifications/AlertDelete";

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
  const [isAlertDelete, setAlertDelete] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}edit/${id}`)
      .then((response) => {
        const data: CountryData = response.data.data;
        setCountryData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}destroy/${id}`)
      .then((response) => {
        if (response.data.message === "Data delete successfully") {
          setAlertDelete(true);
          setTimeout(() => {
            setAlertDelete(false);
            navigate('/');
        }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
                  {countryData.description !== "undefined" ? (
                    <p>Description: {countryData.description}</p>
                  ) : null}
                </div>
              </>
            )}

            <div className="flex items-center justify-center gap-2 mt-4">
              <FaEdit className="w-[24px] h-[24px] cursor-pointer  hover:text-blue-500" />
              <FaTrash
                onClick={handleDelete}
                className="w-[24px] h-[24px] cursor-pointer hover:text-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {isAlertDelete && (
        <AlertDelete />
      )}
    </>
  );
};

export default Details;
