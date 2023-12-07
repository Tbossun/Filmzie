import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import MenuItem from "@mui/material/MenuItem";

let timer;
const timeout = 1000;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [searchMode, setSearchMode] = useState("search");
  const [lastSearches, setLastSearches] = useState([]);

  const search = useCallback(async () => {
    setOnSearch(true);

    try {
      let response;

      switch (searchMode) {
        case "search":
          response = await mediaApi.search({ query, page });
          break;
        case "getById":
          response = await mediaApi.getById({ mediaId: query });
          break;
        case "getByTitle":
          response = await mediaApi.getByTitle({ Title: query });
          break;
        default:
          throw new Error("Invalid search mode");
      }

      setOnSearch(false);

      if (response.err) {
        toast.error(response.err.message);
      } else if (response.response) {
        if (searchMode === "search") {
          if (page > 1) setMedias((m) => [...m, ...response.response.Search]);
          else setMedias([...response.response.Search]);
        } else {
          setMedias([response.response]); 
        }
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [query, page, searchMode]);


  const fetchLastSearches = useCallback(async () => {
    try {
      const { response } = await mediaApi.queries();
      if (response) {
        const queries = response.map((item) => item.query);
        setLastSearches(queries);
      }
    } catch (error) {
      console.error("Error fetching last searches:", error.message);
    }
  }, []);



  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else {
      search();
      fetchLastSearches();
    }
  }, [search, query, page, fetchLastSearches]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
    fetchLastSearches();
  }, [fetchLastSearches]);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  const handleSearchModeChange = (event) => {
    setSearchMode(event.target.value);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <TextField
            color="success"
            placeholder={`Search ${
              searchMode === "getById" ? "ID" : "Filmzie"
            }`}
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />
          <TextField
            select
            label="Search Mode"
            value={searchMode}
            onChange={handleSearchModeChange}
            sx={{ width: "40%" }}>
            <MenuItem value="search">General Search</MenuItem>
            <MenuItem value="getById">Search by ID</MenuItem>
            <MenuItem value="getByTitle">Search by Title</MenuItem>
          </TextField>

          {/* Display last searches */}
          {lastSearches.length > 0 && (
            <Typography variant="subtitle1" gutterBottom>
              Last Searches: {lastSearches.join(", ")}
            </Typography>
          )}

          {/* Move the MediaGrid component here */}
          <MediaGrid medias={medias} />

          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
