import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import api from "./api";

import { GameType } from "./types/GamesType";

const App = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getGames()
      .then((response) => {
        setGames(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return !isLoading ? (
    <div className="App">
      <Container fluid="md">
        <Row>{games && games.map((game) => <Col>{game.title}</Col>)}</Row>
      </Container>
    </div>
  ) : (
    <>Loading...</>
  );
};

export default App;
