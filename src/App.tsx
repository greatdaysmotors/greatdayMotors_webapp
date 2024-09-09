import { Toaster } from "react-hot-toast";
import AppTheme from "./AppTheme";
import AppRouter from "./routes";

const App: React.FC = () => {
  return (
    <AppTheme>
      <Toaster
        toastOptions={{
          style: {
            maxWidth: "700px",
            padding: "12px 16px",
            fontSize: "17px",
            fontWeight: "400",
          },
          error: {
            style: {
              color: "red",
            },
          },
          success: {
            style: {
              color: "green",
            },
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
      <AppRouter />
    </AppTheme>
  );
};

export default App;
