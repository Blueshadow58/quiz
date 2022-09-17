import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Stack,
  Spinner,
} from "react-bootstrap";
import "./assets/App.css";
import "./assets/Buttons.css";

import { ReactComponent as CarIcon } from "./assets/carIcon.svg";
import { getQuestions } from "./Api";

const App = () => {
  const [questions, setQuestions] = useState(false);
  const [qNumber, setQNumber] = useState(0);
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    getQuestions()
      .then((data) => {
        setQuestions(data.results);
        const allQuestions = data.results.map((data) => {
          return [...data.incorrect_answers, data.correct_answer];
        });
        setAlternatives(allQuestions);
      })
      .catch((err) => console.log(err));
  }, []);

  const onClickButton = (answer) => {
    if (answer === questions[qNumber].correct_answer) {
      console.log("Bien");
    } else {
      console.log("Mal");
    }
  };

  console.log(alternatives);
  // console.log(questions.results[0].category);
  return (
    <Container className="vsCenterring ">
      <Row className="justify-content-md-center align-items-center vsCenterring">
        <Col xs lg="5">
          {questions ? (
            <>
              <Card className="titleImgCard">
                <Stack direction="horizontal">
                  <div>
                    <span className="customQuizTitle">
                      {questions[0].category} QUIZ
                    </span>
                  </div>
                  <div className="ms-auto">
                    <CarIcon className="customImg" />
                  </div>
                </Stack>
              </Card>
              <Card className="customCard">
                <Card.Header className="customCardHeader">
                  <span className="customTextCardHeader">
                    {qNumber + 1}/{questions.length}
                  </span>
                </Card.Header>

                <Card.Body>
                  <Card.Title className="pb-2 cardTitle">
                    {questions[qNumber].question
                      .replace(/&quot;/g, '"')
                      .replace(/&#039;/g, "")
                      .replace(/&#039;/g, "")}
                  </Card.Title>
                  <div className="d-grid gap-4">
                    {alternatives[qNumber].map((alternatives, index) => {
                      return (
                        <Button
                          key={index}
                          className="customButton"
                          variant="outline-primary"
                          size="lg"
                          onClick={() => onClickButton(alternatives)}
                        >
                          <Stack direction="horizontal" gap={4}>
                            <div className="">
                              <span className="text-left ">{index + 1}</span>
                            </div>
                            <div className=" ">
                              <span className="alternativeText">
                                {alternatives}
                              </span>
                            </div>
                          </Stack>
                        </Button>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Spinner className="" animation="border" variant="light" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
