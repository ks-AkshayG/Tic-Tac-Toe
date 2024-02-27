import { useAtom } from "jotai";
import {
  registerEmailAtom,
  registerPasswordAtom,
  registerUsernameAtom,
} from "../constants/JotaiAtoms";

type SupabaseRegisterProps = {
  handleGoogleLogin: () => void;
  handleEmailRegister: () => void;
};

const SupabaseRegister = ({
  handleGoogleLogin,
  handleEmailRegister,
}: SupabaseRegisterProps) => {
  const [registerUsername, setRegisterUsername] = useAtom(registerUsernameAtom);
  const [registerEmail, setRegisterEmail] = useAtom(registerEmailAtom);
  const [registerPassword, setRegisterPassword] = useAtom(registerPasswordAtom);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div>
        <button
          className="border border-black px-3 my-2 rounded-md text-[20px] hover:text-green-600 hover:border-green-600"
          onClick={handleGoogleLogin}
        >
          Register with Google
        </button>
      </div>
      <div className=" w-[30vw] flex flex-col justify-center items-center my-3">
        <p>or Register with Email:</p>
        <input
          type="text"
          name="username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          placeholder="Username"
          className="border border-black px-1 rounded-sm"
        />
        <input
          type="email"
          name="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          placeholder="Email"
          className="border border-black my-2 px-1 rounded-sm"
        />
        <input
          type="password"
          name="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          placeholder="Password"
          className="border border-black mb-2 px-1 rounded-sm"
        />
        <button
          className=" w-[10vw] border border-black px-3 rounded-md text-[20px] hover:text-green-600 hover:border-green-600"
          onClick={handleEmailRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SupabaseRegister;
