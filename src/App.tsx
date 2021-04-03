import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import FilterBox from "./components/FilterBox";
import GameBox from "./components/GameBox";
import SearchBox from "./components/SearchBox";
import SortBox from "./components/SortBox";

import api from "./api";

import { GameSortTypes, GameType } from "./types/GamesType";

import "./App.scss";

const App = () => {
  const [defaultGames, setDefaultGames] = useState<GameType[]>([]);
  const [sortValues, setSortValues] = useState<string[]>([]);

  const [searchText, setSearchText] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [sortType, setSortType] = useState<GameSortTypes>("sort_a_z");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getGames()
      .then((response) => {
        const results = response.data.filter((game) => game.title);
        setDefaultGames(results);
        setSortValues(
          Object.keys(
            results.reduce((game, obj) => Object.assign(game, obj), {})
          )
        );
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const filterGames = () => {
    let foundGames = defaultGames;

    if (filterType) {
      foundGames = foundGames.filter((game) => game.platform === filterType);
    }

    if (searchText) {
      foundGames = foundGames.filter((game) =>
        game.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortType) {
      switch (sortType) {
        case "sort_a_z":
          foundGames = foundGames.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        case "sort_z_a":
          foundGames = foundGames.sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        default:
          foundGames = foundGames.sort((a, b) =>
            b[sortType].toString().localeCompare(a[sortType].toString())
          );
          break;
      }
    }
    return foundGames;
  };

  const games = filterGames();
  const filterValues = [...new Set(games.map((game) => game.platform))];

  return !isLoading ? (
    <div className="App">
      <Container fluid>
        <Row noGutters className="header">
          <Col xs={12}>
            <Card>
              <Card.Header>
                <a href="/">
                  <h1>Games List</h1>
                </a>
              </Card.Header>
              <Card.Body>
                <Row className="inputs">
                  <Col xs={12} sm={4} className="search-box">
                    <SearchBox searchCallback={setSearchText} />
                  </Col>
                  <Col xs={12} sm={4}>
                    <SortBox
                      sorts={[
                        "sort_a_z",
                        "sort_z_a",
                        ...sortValues.filter(
                          (sortValue) => sortValue !== "title"
                        ),
                      ]}
                      sortCallback={setSortType}
                    />
                  </Col>
                  <Col xs={12} sm={4}>
                    <FilterBox
                      filters={filterValues}
                      filterCallback={setFilterType}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row noGutters className="games-container">
          {games &&
            games.map((game, index) => <GameBox {...game} key={index} />)}
        </Row>
      </Container>
    </div>
  ) : (
    <div className="spinner-container">
      <Spinner animation="grow" />
      <small>Loading Games</small>
    </div>
  );
};

export default App;
