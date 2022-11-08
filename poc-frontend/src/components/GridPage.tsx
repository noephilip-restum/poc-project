import GridWithInfiniteScroll from "./GridWithInfiniteScroll";
import { Movie } from "types/Movies";
interface GridPageProps {
  movies: Movie[];
}
const GridPage = ({ movies }: GridPageProps) => {
  return <GridWithInfiniteScroll movies={movies} />;
};

export default GridPage;
