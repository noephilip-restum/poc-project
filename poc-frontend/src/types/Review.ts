export type Review = {
  id: String;
  message: String;
  rating: number;
  review_status: Boolean;
  movieId: String;
  usersId: String;
};

export type returnError = {
  message: string;
};
