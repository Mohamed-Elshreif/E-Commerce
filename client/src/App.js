import {useMemo} from 'react'
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

import getDesignTokens from "./themes/theme";
import { router } from "./Routers/index.js";
import { useSelector } from "react-redux";

function App() {
    const {mode} =   useSelector((state) => state.theme);
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
