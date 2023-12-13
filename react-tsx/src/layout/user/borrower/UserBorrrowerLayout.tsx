import { Outlet } from "react-router-dom";

import Header from "../../../components/user/borrower/Header";
import Footer from "../../../components/user/borrower/Footer";

const UserBorrrowerLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserBorrrowerLayout;
