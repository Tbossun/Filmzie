import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  Id: ({ mediaId }) => `$/detail/${mediaId}`,
  Title: ({ Title }) => `$/detail/${Title}`,
  search: ({ query, page }) => `/search/${query}/${page}`,
  queries: "latest-queries"
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaId })
      );

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
      const response = await publicClient.get(
        mediaEndpoints.queries()
      );
      return {response}
    }
    catch (err) {
      return {err}
    }
  }
};

export default mediaApi;