import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CryptoMain from "./component/CryptoMain";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loading from "./component/Loading";

function App() {
  const persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <CryptoMain />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
