import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import GameBox from "./components/GameBox";
import SearchBox from "./components/SearchBox";
import OrderBox from "./components/OrderBox";

import api from "./api";

import { GameFilterTypes, GameOrderTypes, GameType } from "./types/GamesType";

import "./App.scss";
import FilterBox from "./components/FilterBox";

const App = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [defaultGames, setDefaultGames] = useState<GameType[]>([]);
  const [orderValues, setOrderValues] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getGames()
      .then((response) => {
        const results = response.data.filter((game) => game.title);
        setGames(results);
        setDefaultGames(results);
        setOrderValues(
          Object.keys(
            results.reduce((game, obj) => Object.assign(game, obj), {})
          )
        );

        setFilterValues([...new Set(results.map((result) => result.platform))]);

        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (search: string, type: GameFilterTypes) => {
    search.length === 0 && setGames(defaultGames);

    const foundedGames = defaultGames.filter((games) =>
      games[type].toLowerCase().includes(search.toLowerCase())
    );
    setGames(foundedGames);
  };

  const handleOrder = (search: GameOrderTypes) => {
    let sorter = [];
    switch (search) {
      case "sort_a_z":
        sorter = [...games].sort((a, b) => a.title.localeCompare(b.title));
        setGames(sorter);
        break;
      case "sort_z_a":
        sorter = [...games].sort((a, b) => b.title.localeCompare(a.title));
        setGames(sorter);
        break;
      default:
        sorter = [...games].sort((a, b) =>
          b[search].toString().localeCompare(a[search].toString())
        );
        if (search.length > 0) {
            setGames(sorter);
        } else {
          setGames(defaultGames);
        }
        break;
    }
  };

  return !isLoading ? (
    <div className="App">
      <Container fluid>
        <Row noGutters className="header">
          <Col xs={12}>
            <Card>
              <Card.Header as="h2">Games List</Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} sm={4} className="search-box">
                    <SearchBox searchCallback={handleSearch} type="title" />
                  </Col>
                  <Col xs={12} sm={4}>
                    <OrderBox
                      orders={[
                        "sort_a_z",
                        "sort_z_a",
                        ...orderValues.filter(
                          (orderValue) => orderValue !== "title"
                        ),
                      ]}
                      orderCallback={handleOrder}
                    />
                  </Col>
                  <Col xs={12} sm={4}>
                    <FilterBox
                      filters={filterValues}
                      filterCallback={handleSearch}
                      type="platform"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row noGutters className="games-container">
          {games && games.map((game) => <GameBox {...game} />)}
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
