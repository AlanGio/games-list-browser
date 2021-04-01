import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";

import { GameType } from "../../types/GamesType";

import "./GameBox.scss";

const GameBox = ({
  title,
  platform,
  score,
  genre,
  editors_choice,
}: GameType) => (
  <Col sm="4" xl="3" className="game-box">
    <Card>
      <Card.Body>
        {editors_choice === "Y" && (
          <Badge variant="primary">Editor Choice</Badge>
        )}
        <Card.Title>{title}</Card.Title>
        <Card.Text>{platform}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col xs="4">Score: {score}</Col>
            <Col xs="8">
              <ProgressBar
                variant={score > 8 ? "success" : score > 5 ? "info" : "warning"}
                now={score * 10}
              />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-muted">
        <strong>Genre:</strong> {genre}
      </Card.Footer>
    </Card>
  </Col>
);

export default GameBox;
