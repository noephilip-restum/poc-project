import { Actor } from "./Actor";
import { Review } from "./Review";
export type Movie = {
  id: string;
  title: string;
  description: string;
  cost: number;
  year_of_release: string;
  image_link: string;
  actorIds?: Actor[] | null;
  reviews?: Review[] | null;
  actors?: Actor[] | null;
};

export type returnError = {
  message: string;
};
