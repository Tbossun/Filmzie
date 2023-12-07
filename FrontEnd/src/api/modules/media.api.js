import publicClient from "../client/public.client";

const mediaEndpoints = {
  Id: ({ mediaId }) => `/Id/${mediaId}`,
  Title: ({ Title }) => `/Title/${Title}`,
  search: ({ query, page }) => `/search/${query}/${page}`,
  queries: () => `/latest-queries`,
};

const mediaApi = {
  getByTitle: async ({ Title }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.Title({ Title }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getById: async ({ mediaId }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.Id({ mediaId }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ query, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  queries: async () => {
    try {
      const response = await publicClient.get(mediaEndpoints.queries());
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;