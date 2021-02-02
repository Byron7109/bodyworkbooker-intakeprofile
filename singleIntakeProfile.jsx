import React from "react";
import PropTypes from "prop-types";
import * as dateService from "../../services/dateService";

function SingleIntakeProfile(props) {
  const oneIntakeProfile = props.intakeProfile;

  const setShowModal = () => {
    props.handleModalToggle(oneIntakeProfile);
  };

  return (
    <React.Fragment>
      <tr>
        <td className="bd-t-none u-s-tb">
          <div className="align-middle image-sm-size">
            <img
              className="img-radius align-top m-r-15"
              style={{ borderRadius: "41px" }}
              src={oneIntakeProfile.avatarUrl}
              alt=""
            />
            <div className="d-inline-block">
              <h6>
                {oneIntakeProfile.firstName + " " + oneIntakeProfile.lastName}
              </h6>
            </div>
          </div>
        </td>
        <td>{oneIntakeProfile.sessionId}</td>
        <td className="text-center">
          {dateService.formatDate(oneIntakeProfile.dateCreated)}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary float-right"
            onClick={setShowModal}
            data-intakeprofile-id={oneIntakeProfile}
          >
            View
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

SingleIntakeProfile.propTypes = {
  setShowModal: PropTypes.func,
  handleModalToggle: PropTypes.func,
  intakeProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    sessionId: PropTypes.number,
    dateCreated: PropTypes.string,
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
  }),
};

export default React.memo(SingleIntakeProfile);
