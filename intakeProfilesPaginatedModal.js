import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { Row, Col } from "reactstrap";

function IntakeProfilesPaginatedModal(props) {
  const handleClose = () => props.setShowModal();

  const data = props.intakeProfile;

  const showTextAnswer = "No information was entered";

  const showBoolAnswer = (boolVal) => (boolVal === true ? "Yes" : "No");

  return (
    <>
      <Modal
        size="lg"
        show={props.isShowModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{data.firstName + " " + data.lastName}</Modal.Title>
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
                  {showBoolAnswer(data.hasAcknowledged)}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

IntakeProfilesPaginatedModal.propTypes = {
  isShowModal: PropTypes.bool,
  handleView: PropTypes.func,
  setShowModal: PropTypes.func,
  intakeProfile: PropTypes.shape({
    currentMedication: PropTypes.string,
    hasSkinRash: PropTypes.bool,
    hasAcutePain: PropTypes.bool,
    hasCold: PropTypes.bool,
    hasInjuries: PropTypes.bool,
    hasWounds: PropTypes.bool,
    isContagious: PropTypes.bool,
    isPregnant: PropTypes.bool,
    allergyNotes: PropTypes.string,
    // painDiagramId: PropTypes.number,
    sessionGoals: PropTypes.string,
    hasAcknowledged: PropTypes.bool,
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default IntakeProfilesPaginatedModal;
