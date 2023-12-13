import { Outlet } from "react-router-dom";

import Header from "../../../components/user/lender/Header";
import Footer from "../../../components/user/lender/Footer";

const UserLenderLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLenderLayout;
