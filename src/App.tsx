import GameBoard from "./component/GameBoard"
// import { StateContextProvider } from "./component/StatesContext/StateContext"
// import { Turn0ContextProvider } from "./component/StatesContext/Turn0Context"
// import { MenuContextProvider } from "./component/StatesContext/MenuContext"
// import { WinReloadContextProvider } from "./component/StatesContext/WinReloadContext"
// import { WinnerContextProvider } from "./component/StatesContext/WinnerContext"
// import { CountOContextProvider } from "./component/StatesContext/CountOContext"
// import { CountXContextProvider } from "./component/StatesContext/CountXContext"
// import { CountScoreOContextProvider } from "./component/StatesContext/CountScoreOContext"
// import { CountScoreXContextProvider } from "./component/StatesContext/CountScoreXContext"
// import { CountScoreDrawContextProvider } from "./component/StatesContext/CountScoreDrawContext"
// import { DrawCountStateContextProvider } from "./component/StatesContext/DrawCountStateContext"
import { AllStateContextProvider } from "./component/StatesContext/AllStatesContext"

function App() {


  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-300 flex justify-center items-center flex-col'>
        <div className=" container w-full text-center my-[20px] flex flex-row justify-evenly">
          
          {/* <StateContextProvider>
            <Turn0ContextProvider>
              <MenuContextProvider>
                <WinReloadContextProvider>
                  <WinnerContextProvider>
                    <CountOContextProvider>
                      <CountXContextProvider>
                        <CountScoreOContextProvider>
                          <CountScoreXContextProvider>
                            <CountScoreDrawContextProvider>
                              <DrawCountStateContextProvider>
                                <GameBoard />
                              </DrawCountStateContextProvider>
                            </CountScoreDrawContextProvider>
                          </CountScoreXContextProvider>
                        </CountScoreOContextProvider>
                      </CountXContextProvider>
                    </CountOContextProvider>
                  </WinnerContextProvider>
                </WinReloadContextProvider>
              </MenuContextProvider>
            </Turn0ContextProvider>
          </StateContextProvider> */}

          <AllStateContextProvider>
            <GameBoard />
          </AllStateContextProvider>

        </div>
      </div>
    </>
  )
}

export default App
