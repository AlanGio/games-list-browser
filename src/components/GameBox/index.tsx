import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";

import { GameType } from "../../types/GamesType";

import "./GameBox.scss";

export const GameBox = ({
  title,
  platform,
  score,
  genre,
  editors_choice,
}: GameType) => (
  <Col sm="4" xl="3" className="game-box">
    <Card>
      <Card.Body>
        {editors_choice === "Y" && <Badge variant="info">Editor Choice</Badge>}
        <Card.Title>{title}</Card.Title>
        <Card.Text>{platform}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Score: {score}
          <ProgressBar
            variant={score > 8 ? "success" : score > 5 ? "info" : "warning"}
            now={score * 10}
          />
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-muted">
        <strong>Genre:</strong> {genre}
      </Card.Footer>
    </Card>
  </Col>
);

export default GameBox;
