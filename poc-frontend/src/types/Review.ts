export type Review = {
  id: string;
  message: string;
  rating: number;
  review_status: boolean;
  movieId: string;
  usersId: string;
};

export type returnError = {
  message: string;
};
