import privateClient from "../client/private.client";

const favoriteEndpoints = {
  list: "auth/favorites",
  add: "auth/addfavorites",
  remove: ({ favoriteId }) => `auth/favorites/${favoriteId}`,
};

const source = "";
const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list);

      return { response };
    } catch (err) { return { err }; }
  },
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate
  }) => {
    try {
      const response = await privateClient.post(
        favoriteEndpoints.add,
        {
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          mediaRate
        },
        { cancelToken: source.token }
      );
        console.log(response);
      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default favoriteApi;