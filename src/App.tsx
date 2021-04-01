import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/esm/Spinner";
import Row from "react-bootstrap/Row";

import api from "./api";
import { GameBox } from "./components/GameBox/";

import { GameType } from "./types/GamesType";

const App = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getGames()
      .then((response) => {
        console.log(response);
        setGames(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return !isLoading ? (
    <div className="App">
      <Container fluid>
        <Row>
          {games && games.map((game) => game.title && <GameBox {...game} />)}
        </Row>
      </Container>
    </div>
  ) : (
    <Container fluid>
      <Row className="justify-content-center">
        <Spinner animation="grow" />
      </Row>
    </Container>
  );
};

export default App;
