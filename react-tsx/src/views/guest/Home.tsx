import { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Andre Causing";
  }, []);

  return (
    <>
    </>
  );
};

export default Home;
