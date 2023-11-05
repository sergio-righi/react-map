import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, DefaultLayout, EmptyLayout } from "layouts";
import { Error } from "components";
import { Auth, Common } from "pages";
import { Routes as Urls } from "utils";
import { Protected } from "middlewares";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // TODO : to be used in case the authentication module is implemented
  const isConfirmed = false;
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        {/* authentication routes */}
        <Route path={Urls.auth.home} element={<AuthLayout />}>
          <Route
            index
            element={
              <Protected condition={isAuthenticated} redirectTo={Urls.map.home}>
                <Auth.Login />
              </Protected>
            }
          />
          <Route
            path={Urls.auth.register}
            element={
              <Protected condition={isAuthenticated} redirectTo={Urls.map.home}>
                <Auth.Register />
              </Protected>
            }
          />
          <Route
            path={Urls.auth.forgotPassword}
            element={
              <Protected condition={isAuthenticated} redirectTo={Urls.map.home}>
                <Auth.ForgotPassword />
              </Protected>
            }
          />
          <Route
            path={Urls.auth.resetPassword}
            element={
              <Protected condition={isAuthenticated} redirectTo={Urls.map.home}>
                <Auth.ResetPassword />
              </Protected>
            }
          />
          <Route
            path={Urls.auth.accountConfirmation}
            element={
              <Protected
                condition={isAuthenticated && isConfirmed}
                redirectTo={Urls.map.home}
              >
                <Auth.AccountConfirmation />
              </Protected>
            }
          />
        </Route>

        {/* map routes */}
        <Route path={Urls.map.home} element={<DefaultLayout />}>
          <Route index element={<Common.Home />} />
        </Route>

        {/* default routes */}
        <Route path="*" element={<EmptyLayout />}>
          <Route index element={<Error.Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
