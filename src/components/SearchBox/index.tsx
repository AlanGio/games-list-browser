import { FormControl } from "react-bootstrap";

import { GameFilterTypes } from "../../types/GamesType";

import "./index.scss";

type SearchBoxProps = {
  searchCallback: (search: string, type: GameFilterTypes) => void;
  type: GameFilterTypes;
};

const SearchBox = ({ searchCallback, type }: SearchBoxProps) => (
  <FormControl
    placeholder="Search Game..."
    onChange={(event) => searchCallback(event.target.value, type)}
  />
);

export default SearchBox;
