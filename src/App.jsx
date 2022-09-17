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
import { ReactComponent as WinnersIcon } from "./assets/winnersIcon.svg";
import { getQuestions } from "./Api";
import { CorrectButton, DefaultBtn, IncorrectButton } from "./Buttons";
import { Shuffled } from "./Shuffled";

const App = () => {
  const [questions, setQuestions] = useState(false);
  let [qNumber, setQNumber] = useState(0);
  const [alternatives, setAlternatives] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [disableNextBtn, setDisableNextBtn] = useState(true);
  let [pointCounter, setPointCounter] = useState(0);

  useEffect(() => {
    getQuestions()
      .then((data) => {
        setQuestions(data.results);
        const allQuestions = data.results.map((data) => {
          const unShuffled = [...data.incorrect_answers, data.correct_answer];
          const shuffled = Shuffled(unShuffled);
          return shuffled;
        });
        setAlternatives(allQuestions);
      })
      .catch((err) => console.log(err));
  }, []);

  const onClickButton = (answer, index) => {
    if (answer === questions[qNumber].correct_answer) {
      //Correct
      setDisabledButton(true);
      const selectedButton = document.getElementById(`button${index}`);
      CorrectButton(selectedButton);
      setPointCounter(++pointCounter);
    } else {
      //Incorrect
      setDisabledButton(true);
      const selectedButton = document.getElementById(`button${index}`);
      alternatives[qNumber].forEach((data, index) => {
        if (data === questions[qNumber].correct_answer) {
          console.log(data);
          const correctButton = document.getElementById(`button${index}`);
          console.log(correctButton);
          return CorrectButton(correctButton);
        }
      });
      IncorrectButton(selectedButton);
    }
    setDisableNextBtn(false);
  };

  const onClickNextButton = () => {
    if (qNumber < questions.length - 1) {
      setDisabledButton(false);
      setQNumber(++qNumber);
      alternatives.forEach((data, index) => {
        const btn = document.getElementById(`button${index}`);
        DefaultBtn(btn);
      });

      setDisableNextBtn(true);
    } else {
      console.log("no existen mas preguntas");
    }
  };
  console.log(qNumber);
  return (
    <Container className="vsCenterring ">
      <Row className="justify-content-md-center align-items-center vsCenterring">
        <Col xs md lg={10}>
          {alternatives ? (
            <>
              <Card className="titleImgCard ">
                <Stack direction="horizontal">
                  <div>
                    <span className="customQuizTitle">
                      {questions[qNumber].category} QUIZ
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

                {qNumber === questions.length - 1 ? (
                  <>
                    <Card.Body>
                      <div className="d-flex justify-content-center">
                        <WinnersIcon className="customWinnersImg" />
                      </div>

                      <Card.Title className="pb-2 cardTitle text-center">
                        <span className="h2">Results</span>
                      </Card.Title>
                      <div className="d-flex justify-content-center">
                        <span>You got 4 correct answers</span>
                      </div>
                    </Card.Body>
                  </>
                ) : (
                  <Card.Body>
                    <Card.Title className="pb-2 cardTitle">
                      {questions[qNumber].question
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, "")
                        .replace(/&#039;/g, "")}
                    </Card.Title>
                    <div className="d-grid gap-3">
                      {alternatives[qNumber].map((alternatives, index) => {
                        return (
                          <Button
                            key={index}
                            className="customButton"
                            variant="outline-primary"
                            size="lg"
                            onClick={() => onClickButton(alternatives, index)}
                            id={`button${index}`}
                            disabled={disabledButton}
                          >
                            <Stack direction="horizontal" gap={3}>
                              <div className="">
                                <span className="text-left ">{index + 1}</span>
                              </div>
                              <div className="">
                                <span className="alternativeText">
                                  {alternatives}
                                </span>
                              </div>
                            </Stack>
                          </Button>
                        );
                      })}
                    </div>
                    <Button
                      className="mt-3 float-end nextButton"
                      variant="primary"
                      size="lg"
                      onClick={() => onClickNextButton()}
                      disabled={disableNextBtn}
                    >
                      Next
                    </Button>
                  </Card.Body>
                )}
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
