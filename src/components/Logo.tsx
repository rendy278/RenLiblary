import { BiBook } from "react-icons/bi";

const Logo = () => {
  return (
    <div className="logo flex items-center dark:text-gray-800 gap-1.5">
      <BiBook size={25} />
      <h1 className="text-2xl font-bold">RenLiblary</h1>
    </div>
  );
};

export default Logo;
