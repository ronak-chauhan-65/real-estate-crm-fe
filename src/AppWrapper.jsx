import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "./components/APICalls/navigation";
import App from "./App";

export default function AppWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate); // Save global navigate
  }, []);

  return <App />;
}
