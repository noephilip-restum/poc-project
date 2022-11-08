import GridWithInfiniteScroll from "./GridWithInfiniteScroll";
import { Movie } from "types/Movies";
import { Actor } from "types/Actor";
interface GridPageProps {
  data: Movie[] | Actor[];
}
const GridPage = ({ data }: GridPageProps) => {
  return <GridWithInfiniteScroll data={data} />;
};

export default GridPage;
