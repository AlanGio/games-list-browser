import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import GameBox from "./components/GameBox";
import SearchBox from "./components/SearchBox";

import api from "./api";

import { GameType } from "./types/GamesType";

import "./App.scss";

const App = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [defaultGames, setDefaultGames] = useState<GameType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getGames()
      .then((response) => {
        const results = response.data.filter((game) => game.title);
        setGames(results);
        setDefaultGames(results);

        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (search: string) => {
    const foundedGames = defaultGames.filter((games) =>
      games.title.toLowerCase().includes(search.toLowerCase())
    );
    setGames(foundedGames);
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
                  <Col xs={12} sm={6} className="search-box">
                    <SearchBox handleSearch={handleSearch} />
                  </Col>
                  <Col xs={12} sm={6}></Col>
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
