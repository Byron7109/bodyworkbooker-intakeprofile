import React from "react";
import { withRouter } from "react-router";
import * as sessionsService from "../../services/sessionService";
import * as intakeProfilesService from "../../services/intakeProfilesService";
import { Formik, Field } from "formik";
import intakeProfilesValidationSchema from "./intakeProfilesValidationSchema";
import IntakeProfilesModal from "./intakeProfilesModal";
import IntakeProfilesAcknowledgmentModal from "./intakeProfileAcknowledgmentModal";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class AddIntake extends React.Component {
  state = {
    formData: {
      currentMedication: "",
      hasSkinRash: "",
      hasAcutePain: "",
      hasCold: "",
      hasInjuries: "",
      hasWounds: "",
      isContagious: "",
      isPregnant: "",
      allergyNotes: "",
      painDiagramId: "",
      sessionGoals: "",
      hasAcknowledged: false,
    },
    showFormModal: false,
    showAcknowledgmentModal: false,
  };

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.replace("/dashboard");
    } else {
      return;
    }
  }

  handleSubmit = (values) => {
    const formData = { ...values };

    this.setState((prevState) => {
      return {
        ...prevState,
        showFormModal: true,
        formData,
      };
    });
  };

  handleAcknowledgment = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showAcknowledgmentModal: true,
      };
    });
  };

  handleSave = (values) => {
    const newIntake = {
      currentMedication: values.currentMedication,
      hasSkinRash: values.hasSkinRash === "true" ? true : false,
      hasAcutePain: values.hasAcutePain === "true" ? true : false,
      hasCold: values.hasCold === "true" ? true : false,
      hasInjuries: values.hasInjuries === "true" ? true : false,
      hasWounds: values.hasWounds === "true" ? true : false,
      isContagious: values.isContagious === "true" ? true : false,
      isPregnant: values.isPregnant === "true" ? true : false,
      allergyNotes: values.allergyNotes,
      painDiagramId:
        values.painDiagramId > 0 ? parseInt(values.painDiagramId) : null,
      sessionGoals: values.sessionGoals,
      hasAcknowledged: values.hasAcknowledged,
      sessionId: this.props.location.state.sessionId,
    };
    intakeProfilesService
      .insert(newIntake)
      .then(this.successfulSaveToast)
      .catch(this.errorSaveToast);
  };

  setShowFormModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      showFormModal: !prevState.showFormModal,
    }));
  };

  setShowAcknowledgmentModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      showAcknowledgmentModal: !prevState.showAcknowledgmentModal,
    }));
  };

  successfulSaveToast = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your intake profile has been submitted.",
      showConfirmButton: false,
      timer: 1500,
    });
    this.onIntakeProfileSubmit();
  };

  onIntakeProfileSubmit = () => {
    const data = {
      id: this.props.location.state.sessionId,
      sessionStatusId: 1,
    };
    sessionsService.updateSessionStatus(data, 0).then(() => {
      this.props.history.push(
        "/sessions/" + this.props.location.state.sessionId
      );
    });
  };

  errorSaveToast = () => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "There was an error in your intake profile",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  render() {
    return (
      <React.Fragment>
        <IntakeProfilesModal
          isShowFormModal={this.state.showFormModal}
          setShowFormModal={this.setShowFormModal}
          intakeData={this.state.formData}
          handleSave={this.handleSave}
        />
        <IntakeProfilesAcknowledgmentModal
          isShowAcknowledgmentModal={this.state.showAcknowledgmentModal}
          setShowAcknowledgmentModal={this.setShowAcknowledgmentModal}
        />
        <Formik
          enableReinitialize={true}
          validationSchema={intakeProfilesValidationSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            } = props;
            return (
              <div className="container pt-5 pb-1">
                <div className="card">
                  <div className="card-header">
                    <h5>Intake Profile</h5>
                    <span>Please enter intake information</span>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit} className="theme-form">
                      <div className="row mb-0 form-group">
                        <label
                          htmlFor="currentMedication"
                          className="col-sm-3 col-form-label"
                        >
                          Current Medication
                        </label>
                        <div className="col-sm-9">
                          <Field
                            component="textarea"
                            placeholder="Current medication"
                            rows={1}
                            cols={1}
                            className={
                              errors.currentMedication &&
                              touched.currentMedication
                                ? "form-control error"
                                : "form-control"
                            }
                            name="currentMedication"
                            values={values.currentMedication}
                          />
                          {errors.currentMedication &&
                            touched.currentMedication && (
                              <span
                                className="input-feedback"
                                style={{ color: "red" }}
                              >
                                {errors.currentMedication}
                              </span>
                            )}
                        </div>
                      </div>
                      <fieldset className="m-t-15 m-checkbox-inline mb-0 custom-radio form-group">
                        <div className="justify-content-start row">
                          <label className="col-form-label col-sm-3 pt-0">
                            Has skin rash?
                          </label>
                          <div className="col-sm-3 pt-0">
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio1"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasSkinRash"
                                    checked={
                                      props.values.hasSkinRash === "true"
                                    }
                                    value={true}
                                  />
                                )}
                              />
                              <label htmlFor="radio1" className="true">
                                Yes
                              </label>
                            </div>
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio2"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasSkinRash"
                                    checked={
                                      props.values.hasSkinRash === "false"
                                    }
                                    value={false}
                                  />
                                )}
                              />
                              <label htmlFor="radio2" className="false">
                                No
                              </label>
                              {errors.hasSkinRash && touched.hasSkinRash && (
                                <span
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.hasSkinRash}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="justify-content-start row">
                          <label className="col-form-label col-sm-3 pt-0">
                            Has acute pain?
                          </label>
                          <div className="col-sm-3 pt-0">
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio3"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasAcutePain"
                                    checked={
                                      props.values.hasAcutePain === "true"
                                    }
                                    value={true}
                                  />
                                )}
                              />
                              <label htmlFor="radio3" className="true">
                                Yes
                              </label>
                            </div>
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio4"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasAcutePain"
                                    checked={
                                      props.values.hasAcutePain === "false"
                                    }
                                    value={false}
                                  />
                                )}
                              />
                              <label htmlFor="radio4" className="false">
                                No
                              </label>
                              {errors.hasAcutePain && touched.hasAcutePain && (
                                <span
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.hasAcutePain}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="justify-content-start row">
                          <label className="col-form-label col-sm-3 pt-0">
                            Has cold?
                          </label>
                          <div className="col-sm-3 pt-0">
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio5"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasCold"
                                    checked={props.values.hasCold === "true"}
                                    value={true}
                                  />
                                )}
                              />
                              <label htmlFor="radio5" className="true">
                                Yes
                              </label>
                            </div>
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio6"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasCold"
                                    checked={props.values.hasCold === "false"}
                                    value={false}
                                  />
                                )}
                              />
                              <label htmlFor="radio6" className="false">
                                No
                              </label>
                              {errors.hasCold && touched.hasCold && (
                                <span
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.hasCold}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="justify-content-start row">
                          <label className="col-form-label col-sm-3 pt-0">
                            Has injuries?
                          </label>
                          <div className="col-sm-3 pt-0">
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio7"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasInjuries"
                                    checked={
                                      props.values.hasInjuries === "true"
                                    }
                                    value={true}
                                  />
                                )}
                              />
                              <label htmlFor="radio7" className="true">
                                Yes
                              </label>
                            </div>
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio8"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasInjuries"
                                    checked={
                                      props.values.hasInjuries === "false"
                                    }
                                    value={false}
                                  />
                                )}
                              />
                              <label htmlFor="radio8" className="false">
                                No
                              </label>
                              {errors.hasInjuries && touched.hasInjuries && (
                                <span
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.hasInjuries}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="justify-content-start row">
                          <label className="col-form-label col-sm-3 pt-0">
                            Has wounds?
                          </label>
                          <div className="col-sm-3 pt-0">
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio9"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasWounds"
                                    checked={props.values.hasWounds === "true"}
                                    value={true}
                                  />
                                )}
                              />
                              <label htmlFor="radio9" className="true">
                                Yes
                              </label>
                            </div>
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio10"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasWounds"
                                    checked={props.values.hasWounds === "false"}
                                    value={false}
                                  />
                                )}
                              />
                              <label htmlFor="radio10" className="false">
                                No
                              </label>
                              {errors.hasWounds && touched.hasWounds && (
                                <span
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.hasWounds}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="justify-content-start row">
                          <label className="col-form-label col-sm-3 pt-0">
                            Is contagious?
                          </label>
                          <div className="col-sm-3 pt-0">
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio11"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="isContagious"
                                    checked={
                                      props.values.isContagious === "true"
                                    }
                                    value={true}
                                  />
                                )}
                              />
                              <label htmlFor="radio11" className="true">
                                Yes
                              </label>
                            </div>
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio12"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="isContagious"
                                    checked={
                                      props.values.isContagious === "false"
                                    }
                                    value={false}
                                  />
                                )}
                              />
                              <label htmlFor="radio12" className="false">
                                No
                              </label>
                              {errors.isContagious && touched.isContagious && (
                                <span
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.isContagious}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="justify-content-start row">
                          <label className="col-form-label col-sm-3 pt-0">
                            Is pregnant?
                          </label>
                          <div className="col-sm-3 pt-0">
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio13"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="isPregnant"
                                    checked={props.values.isPregnant === "true"}
                                    value={true}
                                  />
                                )}
                              />
                              <label htmlFor="radio13" className="true">
                                Yes
                              </label>
                            </div>
                            <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio14"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="isPregnant"
                                    checked={
                                      props.values.isPregnant === "false"
                                    }
                                    value={false}
                                  />
                                )}
                              />
                              <label htmlFor="radio14" className="false">
                                No
                              </label>
                              {errors.isPregnant && touched.isPregnant && (
                                <span
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.isPregnant}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="row form-group pt-2">
                        <label
                          htmlFor="AllergyNoyes"
                          className="col-sm-3 col-form-label"
                        >
                          Allergy notes
                        </label>
                        <div className="col-sm-9">
                          <Field
                            component="textarea"
                            placeholder="Allergy notes"
                            rows={1}
                            cols={1}
                            className={
                              errors.allergyNotes && touched.allergyNotes
                                ? "form-control error"
                                : "form-control"
                            }
                            name="allergyNotes"
                            values={values.allergyNotes}
                          />

                          {errors.allergyNotes && touched.allergyNotes && (
                            <span
                              className="input-feedback"
                              style={{ color: "red" }}
                            >
                              {errors.allergyNotes}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* <div className="row form-group pt-2">
                        <label
                          htmlFor="painDiagramId"
                          className="col-sm-3 col-form-label"
                        >
                          Pain diagram
                        </label>
                        <div className="col-sm-9">
                          <Field
                            placeholder="Pain diagram"
                            className={
                              errors.painDiagramId && touched.painDiagramId
                                ? "form-control error"
                                : "form-control"
                            }
                            name="painDiagramId"
                            type="text"
                            values={values.painDiagramId}
                          />
                          {errors.painDiagramId && touched.painDiagramId && (
                            <span
                              className="input-feedback"
                              style={{ color: "red" }}
                            >
                              {errors.painDiagramId}
                            </span>
                          )}
                        </div>
                      </div> */}
                      <div className="row form-group pt-2">
                        <label
                          htmlFor="sessionGoals"
                          className="col-sm-3 col-form-label"
                        >
                          Session goals
                        </label>
                        <div className="col-sm-9">
                          <Field
                            component="textarea"
                            placeholder="Session goals"
                            rows={1}
                            cols={1}
                            className={
                              errors.sessionGoals && touched.sessionGoals
                                ? "form-control error"
                                : "form-control"
                            }
                            name="sessionGoals"
                            values={values.sessionGoals}
                          />

                          {errors.sessionGoals && touched.sessionGoals && (
                            <span
                              className="input-feedback"
                              style={{ color: "red" }}
                            >
                              {errors.sessionGoals}
                            </span>
                          )}
                        </div>
                      </div>
                      <fieldset className="m-t-15 m-checkbox-inline mb-0">
                        <div className="justify-content-start row">
                          <label
                            className="col-form-label col-sm-3 pt-0"
                            style={{ paddingLeft: "1px" }}
                          >
                            <Button
                              variant="link"
                              onClick={this.handleAcknowledgment}
                              style={{ color: "blue" }}
                            >
                              Policy Agreement
                            </Button>
                          </label>

                          <div className="col-sm-3 pt-1">
                            <div className="checkbox-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="checkbox"
                                    className="form-check-input"
                                    {...field}
                                    type="checkbox"
                                    name="hasAcknowledged"
                                    checked={props.values.hasAcknowledged}
                                    value={true}
                                  />
                                )}
                              />{" "}
                              <label htmlFor="checkbox" className="true">
                                Acknowledged
                              </label>
                              {errors.hasAcknowledged &&
                                touched.hasAcknowledged && (
                                  <span
                                    className="input-feedback"
                                    style={{ color: "red" }}
                                  >
                                    {errors.hasAcknowledged}
                                  </span>
                                )}
                            </div>

                            {/* <div className="radio radio-primary ml-4-inline">
                              <Field
                                render={({ field }) => (
                                  <input
                                    id="radio14"
                                    className="form-check-input"
                                    {...field}
                                    type="radio"
                                    name="hasAcknowledged"
                                    checked={
                                      props.values.hasAcknowledged === "false"
                                    }
                                    value={false}
                                  />
                                )}
                              />{" "}
                              <label htmlFor="radio14" className="false">
                                No
                              </label>
                              {errors.hasAcknowledged &&
                                touched.hasAcknowledged && (
                                  <span
                                    className="input-feedback"
                                    style={{ color: "red" }}
                                  >
                                    {errors.hasAcknowledged}
                                  </span>
                                )}
                            </div> */}
                          </div>
                        </div>
                      </fieldset>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#6e7e96",
                        }}
                      >
                        By clicking the checkbox you are acknowledging the above
                      </div>
                      <div style={{ backgroundColor: "#fff" }}>
                        <button
                          type="submit"
                          id="insertButton"
                          className="mr-1 btn btn-primary float-right"
                          disabled={!isValid || isSubmitting}
                        >
                          Submit
                        </button>
                        {/* <button className="btn btn-secondary">Cancel</button> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

AddIntake.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      sessionId: PropTypes.number,
    }),
  }),
};
export default withRouter(AddIntake);
