import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Layout = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Layout;
