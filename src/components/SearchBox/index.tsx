import { FormControl } from "react-bootstrap";

import "./index.scss";

type SearchBoxProps = {
  searchCallback: (search: string) => void;
};

const SearchBox = ({ searchCallback }: SearchBoxProps) => (
  <FormControl
    placeholder="Search Game..."
    onChange={(event) => searchCallback(event.target.value)}
  />
);

export default SearchBox;
