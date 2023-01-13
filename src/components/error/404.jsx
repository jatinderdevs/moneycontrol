import { Link } from "react-router-dom";
import img from "../../public/assets/images/404.png";

const notFound = () => {
  return (
    <div className=" text-center py-4">
      <h2>Page not Found</h2>
      <img src={img} className="img-fluid" width="60%" alt="404" />
      <br />
      <Link to="/dashboard" className="customBtn">
        Home
      </Link>
    </div>
  );
};

export default notFound;
