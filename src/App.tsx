import { useAtom } from "jotai";
import LoginContainer from "./containers/LoginContainer";
import PagesContainer from "./containers/PagesContainer";
import { accessTokenAtom } from "./store";
import "antd/dist/reset.css";
import "./App.css";

function App() {
  const [accessToken] = useAtom(accessTokenAtom);

  return (
    <div className="App">
      {accessToken ? <PagesContainer /> : <LoginContainer />}
    </div>
  );
}

export default App;
