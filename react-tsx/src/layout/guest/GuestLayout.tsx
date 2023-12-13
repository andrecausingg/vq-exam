import { Outlet } from "react-router-dom";


const GuestLayout: React.FC = () => {
  return (
    <>

      <main>
        <Outlet />
      </main>
      
    </>
  );
};

export default GuestLayout;
