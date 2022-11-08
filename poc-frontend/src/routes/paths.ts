function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const MAIN_ROOT = "";

export const MAIN_PATH = {
  root: MAIN_ROOT,
  notFound: "*",
  browse: path(MAIN_ROOT, "/browse"),
  movieExplore: path(MAIN_ROOT, "/movies"),
  login: path(MAIN_ROOT, "/login"),
  signup: path(MAIN_ROOT, "/signup"),
  admin: path(MAIN_ROOT, "/admin"),
};
