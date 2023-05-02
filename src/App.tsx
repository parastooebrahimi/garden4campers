import React from "react";
import AppRoutes from "./routes/AppRoutes";

export type AppProps = {};

export type AppComponent = React.FunctionComponent<AppProps>;

export const App: AppComponent = (): JSX.Element => {
  return <AppRoutes />;
};
