import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { Row, Col } from "reactstrap";

function IntakeProfilesModal(props) {
  const handleClose = () => props.setShowFormModal();

  const data = props.intakeData;

  const saveIntake = () => props.handleSave(data);

  const showBoolAnswer = (boolVal) => (boolVal === "true" ? "Yes" : "No");

  const showAcknowledgmentAnswer = (boolVal) =>
    boolVal === true ? "Yes" : "No";

  const showTextAnswer = "No information was entered";

  return (
    <>
      <Modal
        size="lg"
        show={props.isShowFormModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Please verify that the information is correct
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Current medication: </b>
                </Col>
                <Col className="text-center">
                  {data.currentMedication === ""
                    ? showTextAnswer
                    : data.currentMedication}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Has skin rash: </b>
                </Col>
                <Col className="text-center">
                  {showBoolAnswer(data.hasSkinRash)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Has acute pain: </b>
                </Col>
                <Col className="text-center">
                  {showBoolAnswer(data.hasAcutePain)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Has cold: </b>
                </Col>
                <Col className="text-center">
                  {showBoolAnswer(data.hasCold)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Has injuries: </b>
                </Col>
                <Col className="text-center">
                  {showBoolAnswer(data.hasInjuries)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Has wounds: </b>
                </Col>
                <Col className="text-center">
                  {showBoolAnswer(data.hasWounds)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Is contagious: </b>
                </Col>
                <Col className="text-center">
                  {showBoolAnswer(data.isContagious)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Is Pregnant: </b>
                </Col>
                <Col className="text-center">
                  {showBoolAnswer(data.isPregnant)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Allergy notes: </b>
                </Col>
                <Col className="text-center">
                  {data.allergyNotes === ""
                    ? showTextAnswer
                    : data.allergyNotes}
                </Col>
              </Row>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Pain diagram: </b>
                </Col>
                <Col className="text-center">
                  {data.painDiagramId === ""
                    ? showTextAnswer
                    : data.painDiagramId}
                </Col>
              </Row>
            </ListGroup.Item> */}
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Session goals: </b>
                </Col>
                <Col className="text-center">
                  {data.sessionGoals === ""
                    ? showTextAnswer
                    : data.sessionGoals}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row xs="2">
                <Col className="text-center">
                  <b>Has acknowledged: </b>
                </Col>
                <Col className="text-center">
                  {showAcknowledgmentAnswer(data.hasAcknowledged)}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={saveIntake}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

IntakeProfilesModal.propTypes = {
  isShowFormModal: PropTypes.bool,
  setShowFormModal: PropTypes.func,
  handleSave: PropTypes.func,
  intakeData: PropTypes.shape({
    currentMedication: PropTypes.string,
    hasSkinRash: PropTypes.string,
    hasAcutePain: PropTypes.string,
    hasCold: PropTypes.string,
    hasInjuries: PropTypes.string,
    hasWounds: PropTypes.string,
    isContagious: PropTypes.string,
    isPregnant: PropTypes.string,
    allergyNotes: PropTypes.string,
    // painDiagramId: PropTypes.string,
    sessionGoals: PropTypes.string,
    hasAcknowledged: PropTypes.bool,
  }),
};

export default IntakeProfilesModal;
