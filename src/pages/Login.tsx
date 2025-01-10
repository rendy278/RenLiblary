import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getAccount } from "../controllers/AccountController";
import Logo from "../components/Logo";

type LoginState = {
  email: string;
  password: string;
  message: string;
  showPassword: boolean;
};

const Login = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
    message: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setLoginState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedAccount = getAccount();

    if (
      loginState.email === storedAccount.email &&
      loginState.password === storedAccount.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setLoginState((prevState) => ({ ...prevState, message: "" }));
      navigate("/");
    } else {
      setLoginState((prevState) => ({
        ...prevState,
        message: "Email atau password salah",
      }));
    }
  };

  return (
    <section className="h-screen flex bg-slate-200 items-center justify-center w-full">
      <div className="container h-full flex-col p-6 flex items-center justify-center">
        <div className="rounded-xl w-full md:w-96 flex flex-col justify-center items-center gap-4 bg-sky-500 shadow-md">
          <div className="bg-red-500 p-4 rounded-t-xl w-full flex justify-between items-center gap-2">
            <Logo />
            <h1 className="font-bold text-white text-2xl">Login</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full p-4 flex flex-col gap-5"
          >
            <div className="flex gap-3 flex-col">
              <label htmlFor="email" className="font-bold text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginState.email}
                onChange={handleChange}
                placeholder="email"
                className="bg-slate-200 p-2 rounded-md outline-none"
              />
            </div>
            <div className="flex gap-3 flex-col">
              <label htmlFor="password" className="font-bold text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={loginState.showPassword ? "text" : "password"}
                  name="password"
                  value={loginState.password}
                  onChange={handleChange}
                  placeholder="*****"
                  className="bg-slate-200 p-2 rounded-md outline-none w-full pr-10"
                />
                <span
                  className="absolute inset-y-0 right-3 text-red-500 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {loginState.showPassword ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-red-500 p-3 w-full text-white rounded-md font-bold"
              >
                Login
              </button>
            </div>
            {loginState.message && (
              <div className="bg-red-500 p-2 w-full rounded-md text-white">
                {loginState.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
