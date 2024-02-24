import { Supabase } from "../config/supabase"

const SupabaseLogin = () => {

  const handleGoogleLogin = async() => {
    const { data } = await Supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173'
      }
    })
  }

  return (
    <div>
      <h2 className=" text-green-700 text-[30px] my-2" >Login with Google</h2>
      <button className="border border-black px-3 rounded-md text-[20px] hover:text-green-600 hover:border-green-600" onClick={handleGoogleLogin} >Google</button>
    </div>
  )
}

export default SupabaseLogin