import MediaSearch from "../pages/MediaSearch";
import MediaDetail from "../pages/MediaDetail";
export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (id) => `/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update"
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
  }
];

export default routes;