import { FormControl } from "react-bootstrap";

import "./index.scss";

type SearchBoxProps = {
  handleSearch: (search: string) => void;
};

const SearchBox = ({ handleSearch }: SearchBoxProps) => (
  <FormControl
    placeholder="Search Game..."
    onChange={(event) => handleSearch(event.target.value)}
  />
);

export default SearchBox;
