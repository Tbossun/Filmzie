/** @format */

import MediaSearch from "../pages/MediaSearch";
import MediaDetail from "../pages/MediaDetail";
import FavoriteList from "../pages/FavoriteList";
import ProtectedPage from "../components/common/ProtectedPage";
import PasswordUpdate from "../pages/PasswordUpdate";

export const routesGen = {
  home: "/",
  mediaSearch: "/search",
  favoriteList: "/favorites",
  passwordUpdate: "password-update",
  mediaList: (type) => `/${type}`,
  mediaDetail: (id) => `/${id}`,
};

const routes = [
  {
    index: true,
    element: <MediaSearch />,
    state: "home",
  },
  {
    path: "/:mediaId",
    element: <MediaDetail />,
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
];

export default routes;
