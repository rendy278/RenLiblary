import { BiBook } from "react-icons/bi";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="logo flex items-center dark:text-gray-800 gap-1.5">
      <BiBook size={25} />
      <h1 className="text-2xl font-bold">RenLiblary</h1>
    </Link>
  );
};

export default Logo;
