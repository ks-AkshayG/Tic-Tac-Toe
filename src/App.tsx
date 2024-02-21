import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/Home"
import Game from "./pages/Game"

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-300 flex flex-col'>
        <div className=" container w-full text-center my-[20px]">

          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tictactoe/:GameID" element={<Game />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>

        </div>
      </div>
    </>
  )
}

export default App
