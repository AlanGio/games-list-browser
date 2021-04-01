import FormControl from "react-bootstrap/FormControl";
import { GameFilterTypes } from "../../types/GamesType";

import "./index.scss";

type FilterBoxProps = {
  filters: string[];
  filterCallback: (search: string, type: GameFilterTypes) => void;
  type: GameFilterTypes;
};

const FilterBox = ({ filters, filterCallback, type }: FilterBoxProps) => (
  <FormControl
    as="select"
    onChange={(event) => filterCallback(event.target.value, type)}
    className="filters-box"
  >
    <option disabled selected>
      Select Console
    </option>
    <option value="">All</option>
    {filters.map((filter, index) => (
      <option key={index} value={filter}>
        {filter.replace(/_/g, " ")}
      </option>
    ))}
  </FormControl>
);

export default FilterBox;
