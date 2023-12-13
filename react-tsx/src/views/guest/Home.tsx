import { useEffect } from "react";
import Search from "../../component/Search";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Andre Causing";
  }, []);

  return (
    <>
      <Search />
    </>
  );
};

export default Home;
