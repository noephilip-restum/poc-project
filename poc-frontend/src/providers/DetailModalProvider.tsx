import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import createSafeContext from "lib/createSafeContext";
import { clearCurrentMovie, getMovieById } from "store/slices/movie";
import { useAppDispatch, useAppSelector } from "hooks/redux";
export interface DetailModalConsumerProps {
  detail: any | null;
  onClose: VoidFunction;
  setMovieId: (id: string | null) => void;
}

export const [useDetailModal, Provider] =
  createSafeContext<DetailModalConsumerProps>();

export default function DetailModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const currentMovie = useAppSelector(
    (state) => state.movies.currentMovie as any
  );
  const [detailId, setDetailId] = useState<string | null>(null);
  const [detail, setDetail] = useState(null);

  const location = useLocation();

  const handleClose = () => {
    dispatch(clearCurrentMovie());
    setDetail(null);
    setDetailId(null);
    console.log("here");
  };

  const handleChangeVideoId = (id: string | null) => {
    setDetailId(id);
  };

  useEffect(() => {
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (currentMovie !== null) {
      setDetail(currentMovie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovie]);

  useEffect(() => {
    if (detailId !== null) {
      dispatch(getMovieById({ id: detailId }));
      setDetail(currentMovie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId]);

  const providerValues: DetailModalConsumerProps = {
    detail,
    onClose: handleClose,
    setMovieId: handleChangeVideoId,
  };

  return <Provider value={providerValues}>{children}</Provider>;
}
