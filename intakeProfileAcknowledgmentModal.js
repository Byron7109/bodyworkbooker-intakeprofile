import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

function IntakeProfilesAcknowledgmentModal(props) {
  const handleClose = () => props.setShowAcknowledgmentModal();

  return (
    <>
      <Modal
        size="lg"
        show={props.isShowAcknowledgmentModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Policy Agreement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            The following sometimes occur during treatment. They are normal
            responses to relaxation. Trust your body to express what it needs
            to:
          </p>
          <p>❖ Need to move or change position</p>{" "}
          <p>❖ Sighing, yawning, change in breathing</p>{" "}
          <p>❖ Stomach gurgling</p>{" "}
          <p>❖ Emotional feelings and/or expression</p>{" "}
          <p>❖ Movement of intestinal gas</p> <p>❖ Energy shifts</p>{" "}
          <p>❖ Falling asleep</p> <p>❖ Memories</p>{" "}
          <p>Please read the following information:</p>{" "}
          <p>
            1. I understand that although bodywork and massage can be very
            therapeutic, relaxing and reduce tension, it is NOT a substitute for
            medical examination, diagnosis and treatment.
          </p>{" "}
          <p>
            2. This is a therapeutic massage and any sexual remarks or advances
            will terminate the session, and I will be liable for payment of the
            scheduled treatment.
          </p>{" "}
          <p>
            3. Being that massage therapy should not be done under certain
            medical conditions, I affirm that I have answered all questions
            pertaining to medical conditions truthfully.
          </p>{" "}
          <p>
            Note Cancellation Policy: The goals of the professional services
            provided are intended for high-quality therapeutic bodywork and
            healing in a punctual manner. No penalty fee will be applied if
            cancellation is made at least 24 hours prior to your appointment.
            Cancellations made on the day of appointment or within the 24 hour
            period of appointment will risk total loss of security deposit.
          </p>{" "}
          <p>
            It is asked that you extend common courtesy to the services, its
            practice, and other clients who may wish to schedule during that
            time.
          </p>{" "}
          <p>
            Thank you for your understanding and acknowledgment of the overall
            practice. We look forward to this first session with you!
          </p>
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

IntakeProfilesAcknowledgmentModal.propTypes = {
  isShowAcknowledgmentModal: PropTypes.bool,
  setShowAcknowledgmentModal: PropTypes.func,
};

export default IntakeProfilesAcknowledgmentModal;
