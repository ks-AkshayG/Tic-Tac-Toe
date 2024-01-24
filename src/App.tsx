import GameBoard from "./component/GameBoard"

function App() {

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-300 flex justify-center items-center flex-col'>
        <div className="w-full text-center my-[20px] flex flex-row justify-evenly">
          <GameBoard />
        </div>
      </div>
    </>
  )
}

export default App
