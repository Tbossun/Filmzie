import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../components/common/CircularRate";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";


const MediaDetail = () => {
  const { mediaId } = useParams();

  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getById({ mediaId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (err) toast.error(err.message);
    };

    getMedia();
    console.log(getMedia());
  }, [ mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.imdbID,
      mediaType: media.Type,
      mediaTitle: media.Title || media.name,
      mediaPoster: media.Poster,
      mediaRate: media.imdbRating,
    };

    const { response, err } = await favoriteApi.add(body);
    console.log(media.imdbID);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.imdbID
    );

    const { response, err } = await favoriteApi.remove({
      favoriteId: media.imdbID,
    });

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Remove favorite success");
    }
  };

  return media ? (
    <>
      <ImageHeader imgPath={media.Poster} />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}>
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}>
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}>
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    media.Poster || media.backdrop_path
                  ),
                }}
              />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}>
              <Stack spacing={2}>
                {/* title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}>
                  {`${media.Title || media.name} `}
                </Typography>
                {/* title */}
                {/* overview */}
                <Typography
                  variant=""
                  sx={{ ...uiConfigs.style.typoLines(5) }}>
                  {media.Genre}
                </Typography>
                {/* overview */}

                {/* rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* rate */}
                  <CircularRate value={media.imdbRating} />
                  {/* rate */}
                  <Divider orientation="vertical" />
                  {/* genres */}
                  {genres.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}

                {/* overview */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}>
                  {media.Plot}
                </Typography>
                {/* overview */}

                {/* buttons */}
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButon-starIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}>
                    watch now
                  </Button>
                </Stack>
                {/* buttons */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;