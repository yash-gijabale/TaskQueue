import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./layout/Layout";
import AuthRouter from "./routes/AuthRouter";
import type { Auth } from "./redux/authReducer/authReducer";

function App() {
  const auth: Auth = useSelector((state: any) => state.authReducer);
  return <>{auth.isLogged ? <Layout /> : <AuthRouter />}</>;
}

export default App;
