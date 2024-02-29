import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { Supabase } from "./config/supabase";
import Home from "./pages/Home";
import Game from "./pages/Game";
import SupabaseLogin from "./component/SupabaseLogin";
import SupabaseRegister from "./component/SupabaseRegister";
import {
  isLoginAtom,
  loginEmailAtom,
  loginPasswordAtom,
  registerEmailAtom,
  registerPasswordAtom,
  registerUsernameAtom,
  userDataAtom,
} from "./constants/JotaiAtoms";
import { useEffect, useState } from "react";

// -------------------------------------------------------------------------------------------------

const App = () => {
  const [registerUsername, setRegisterUsername] = useAtom(registerUsernameAtom);
  const [registerEmail, setRegisterEmail] = useAtom(registerEmailAtom);
  const [registerPassword, setRegisterPassword] = useAtom(registerPasswordAtom);

  const [loginEmail, setLoginEmail] = useAtom(loginEmailAtom);
  const [loginPassword, setLoginPassword] = useAtom(loginPasswordAtom);

  const [isLogin, setIsLogin] = useAtom(isLoginAtom);

  const [tokenData, setTokenData] = useState<null | string>(null);
  const setUserData = useSetAtom(userDataAtom);

  const navigate = useNavigate();

  /**
   * Store the token locally
   */
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTokenData(localStorage.getItem("sb-nemmkyvqcyblzgeinkpf-auth-token"));
    }, 500); // critical value: 226

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  /**
   * Set the user has logged in
   */
  useEffect(() => {
    if (tokenData !== null) {
      // console.log(tokenData)
      setIsLogin(true);
      setUserData(JSON.parse(tokenData));
    }
  }, [tokenData]);

  /**
   * Function for email registration
   */
  const handleEmailRegister = async () => {
    const { data } = await Supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: {
          email: registerEmail,
          full_name: registerUsername,
        },
        emailRedirectTo: "http://localhost:5173",
      },
    });
    if (data.user !== null) {
      alert("We have send an email to you, please confirm your registration");
      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
    // console.log("registration data", data);
  };

  /**
   * Function for google registration/login
   */
  const handleGoogleLogin = async () => {
    const { data } = await Supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (data) {
      navigate("/");
    }
    // console.log(error);
  };

  /**
   * Function for login with google
   */
  const handleEmailLogin = async () => {
    const { data, error } = await Supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (data.user !== null) {
      setIsLogin(true);
      setLoginEmail("");
      setLoginPassword("");
      navigate("/");
    }
    if (error) {
      alert(error.message);
    }
    // console.log("login email error", error);
  };

  /**
   * Function for logout user
   */
  const handleLogout = async () => {
    const { error } = await Supabase.auth.signOut();
    if (!error) {
      setTokenData(null);
      setIsLogin(false);
      setUserData(undefined);
    }
    // console.log("logout error", error);
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-gray-300 flex flex-col">
        <div className="w-full text-center">
          {/* Navigation bar */}
          <nav>
            <ul className="flex flex-row justify-between items-center px-3 py-2 bg-gray-900">
              <li className="text-white">
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                {isLogin ? (
                  <button
                    className="border border-white text-white px-3 rounded-md text-[20px] hover:text-red-600 hover:border-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to={`/register`}>
                      <button className="border border-white text-white px-3 rounded-md text-[20px] hover:text-green-600 hover:border-green-600">
                        Register
                      </button>
                    </Link>
                    <Link to={`/login`}>
                      <button className="border border-white text-white px-3 rounded-md text-[20px] hover:text-green-600 hover:border-green-600 mx-2">
                        Login
                      </button>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </nav>

          {/* Routes for all pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tictactoe/:GameID" element={<Game />} />
            <Route
              path="/login"
              element={
                <SupabaseLogin
                  handleGoogleLogin={handleGoogleLogin}
                  handleEmailLogin={handleEmailLogin}
                />
              }
            />
            <Route
              path="/register"
              element={
                <SupabaseRegister
                  handleGoogleLogin={handleGoogleLogin}
                  handleEmailRegister={handleEmailRegister}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
