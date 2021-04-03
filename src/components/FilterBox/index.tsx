import FormControl from "react-bootstrap/FormControl";

import "./index.scss";

type FilterBoxProps = {
  filters: string[];
  filterCallback: (search: string) => void;
};

const FilterBox = ({ filters, filterCallback }: FilterBoxProps) => (
  <FormControl
    as="select"
    onChange={(event) => filterCallback(event.target.value)}
    className="filters-box"
  >
    <option disabled defaultValue="">
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
