import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Icon
import { BiLoaderCircle } from "react-icons/bi";

// Image
import noData from "../assets/images/no-data/no-data.svg";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<any[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any[]>(
          `${import.meta.env.VITE_REACT_APP_API_COUNTRY_BASE_URL}`
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleLoadMore = () => {
    setDisplayedCountries((prevCount) => prevCount + 5);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSave = (name: string, flag:string, population: number, area: number, description: string, index: number) => {
    setSubmit(true);
    setSelectedIndex(index);
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("url_flag", flag);
    formData.append("population", population.toString());
    formData.append("area", area.toString());
    formData.append("description", description);
  
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}store`, formData)
      .then((response) => {
        console.log(response);
        if (response.data.message === "Data created successfully") {
          navigate(`/details/${response.data.id}`);
        }
      })
      .catch((error) => {
        setSubmit(false);
        console.log(error);
      });
  };
  

  const filteredCountries = countries.filter((country) =>
    country.name?.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white drop-shadow-2xl p-4 rounded-l w-[300px] md:w-[600px]">
          {/* Title */}
          <div className="grid md:grid-cols-2 items-center">
            <div>
              <h1 className="text-2xl font-bold">Search Countries</h1>
            </div>

            <div>
              <div className="mt-2">
                <input
                  onChange={handleSearch}
                  type="text"
                  required
                  placeholder="Search"
                  className="p-4 block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* Data */}
          <div className="max-h-[300px] md:max-h-[500px] overflow-y-auto w-full ">
            {filteredCountries.length > 0 ? (
              filteredCountries
                .slice(0, displayedCountries)
                .map((country, index) => (
                  <div
                    key={index}
                    className="bg-white drop-shadow-2xl m-2 p-4 mb-2 "
                  >
                    <div className="text-center mb-2">
                      <img
                        src={country.flags.svg}
                        alt={country.flag}
                        className="w-[256px] mx-auto mb-2"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <div>
                        <h1 className="font-bold text-l">
                          {country.name?.common} <br />
                          {country.name?.official}
                        </h1>
                      </div>

                      <div className="mt-2">
                        <button
                          onClick={() => {
                            handleSave(country.name?.common, country.flags.svg, country.population, country.area, country.flags.alt, index);
                          }}
                          disabled={isSubmit}
                          className={`cursor-pointer text-center font-medium py-2 px-2 rounded-md transition-all duration-300 transform opacity-100 border-2 border-blue-500 hover:text-white hover:bg-blue-500 ${
                            isSubmit && selectedIndex === index ? "bg-blue-500 text-white" : ""
                          }`}
                        >
                          {isSubmit && selectedIndex === index ? (
                            <div className="flex items-center">
                              <BiLoaderCircle className="animate-spin mr-2 loader-icon " />{" "}
                              Select
                            </div>
                          ) : (
                            <>Select</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <img src={noData} alt="" className="w-[300px] mx-auto" />
            )}

            {countries.length > displayedCountries &&
              filteredCountries.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    className="text-center font-medium py-2 px-2 rounded-md transition-all duration-300 transform opacity-100 border-2 border-blue-500 hover:text-white hover:bg-blue-500"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
