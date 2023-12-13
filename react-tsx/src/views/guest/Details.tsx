import { useEffect } from "react";

import Detailss from "../../component/Details";

const Details: React.FC = () => {
  useEffect(() => {
    document.title = "Details - Andre Causing";
}, []);

  return (
    <>
      <Detailss />
    </>
  );
};

export default Details;
