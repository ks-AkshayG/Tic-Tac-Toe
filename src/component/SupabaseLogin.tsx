import { useAtom } from "jotai";

import { loginEmailAtom, loginPasswordAtom } from "../constants/JotaiAtoms";

type SupabaseLoginProps = {
  handleGoogleLogin: () => void;
  handleEmailLogin: () => void;
};

const SupabaseLogin = ({
  handleEmailLogin,
  handleGoogleLogin,
}: SupabaseLoginProps) => {
  const [loginEmail, setLoginEmail] = useAtom(loginEmailAtom);
  const [loginPassword, setLoginPassword] = useAtom(loginPasswordAtom);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div>
        <button
          className="border border-black px-3 my-2 rounded-md text-[20px] hover:text-green-600 hover:border-green-600"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
      <div className=" w-[30vw] flex flex-col justify-center items-center my-3">
        <p>or Login with Email:</p>
        <input
          type="email"
          name="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Email"
          className="border border-black px-1 rounded-sm"
        />
        <input
          type="password"
          name="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
          className="border border-black my-2 px-1 rounded-sm"
        />
        <button
          className=" w-[10vw] border border-black px-3 rounded-md text-[20px] hover:text-green-600 hover:border-green-600"
          onClick={handleEmailLogin}
        >
          Login
        </button>
      </div>
      
    </div>
  );
};

export default SupabaseLogin;
