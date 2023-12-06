/** @format */

import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";

let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, err } = await mediaApi.search({
      query,
      page,
    });

    setOnSearch(false);

    if (err) toast.error(err.message);
    if (response) {
      if (page > 1) setMedias((m) => [...m, ...response.Search]);
      else setMedias([...response.Search]);
    }
  }, [query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, []);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}>
            {/* Removed the buttons from here */}
          </Stack>
          <TextField
            color="success"
            placeholder="Search Filmzies"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          {/* Move the MediaGrid component here */}
          <MediaGrid medias={medias} />

          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>

        {/* Display the movie titles under each image */}
        {/* <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ width: "100%" }}>
          {medias.map((item, index) => (
            <Box key={index}>
              <img
                src={item.Poster}
                alt={item.Title}
                style={{ width: "150px", height: "200px", marginBottom: "8px" }}
              />
              <div>{item.Title}</div>
            </Box>
          ))}
        </Stack> */}
      </Box>
    </>
  );
};

export default MediaSearch;
