import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/Home"
import Game from "./pages/Game"
import SupabaseLogin from "./component/SupabaseLogin"

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-300 flex flex-col'>
        <div className=" container w-full text-center my-[20px]">

          <QueryClientProvider client={queryClient}>
            <BrowserRouter>

              <nav>
                <ul>
                  <Link to={`/`}>Home</Link>
                </ul>
              </nav>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tictactoe/:GameID" element={<Game />} />
                <Route path="/login" element={<SupabaseLogin />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>

        </div>
      </div>
    </>
  )
}

export default App
