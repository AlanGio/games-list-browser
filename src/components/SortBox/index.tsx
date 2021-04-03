import FormControl from "react-bootstrap/FormControl";
import { GameSortTypes } from "../../types/GamesType";

import "./index.scss";

type SortBoxProps = {
  sorts: string[];
  sortCallback: (search: GameSortTypes) => void;
};

const SortBox = ({ sorts, sortCallback }: SortBoxProps) => (
  <FormControl
    as="select"
    onChange={(event) => sortCallback(event.target.value as GameSortTypes)}
    className="sort-box"
  >
    <option disabled defaultValue="">
      Select Sort
    </option>
    {sorts.map((sort, index) => (
      <option key={index} value={sort}>
        {sort.replace(/_/g, " ")}
      </option>
    ))}
  </FormControl>
);

export default SortBox;
