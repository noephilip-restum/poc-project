import { useEffect } from "react";

import GridPage from "components/GridPage";
import { Actor } from "types/Actor";
import { getActors } from "store/slices/actor";
import { useAppDispatch, useAppSelector } from "hooks/redux";

const ActorExplore = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.data as Actor[]);

  useEffect(() => {
    dispatch(getActors());
  }, [dispatch]);

  if (actors) {
    return <GridPage data={actors} />;
  }
  return null;
};

export default ActorExplore;
