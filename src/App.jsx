import { Provider } from "./layouts/provider";
import Router from "./router";

function App() {
  return (
    <div>
      <Provider>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
