import React from "react";
import * as IntakeProfileService from "../../services/intakeProfilesService";
import SingleIntakeProfile from "./singleIntakeProfile";
import IntakeProfilesPaginatedModal from "./intakeProfilesPaginatedModal";
import Pagination from "rc-pagination";

class AllIntakeProfiles extends React.Component {
  state = {
    intakeProfiles: {},
    showModal: false,
    pageConfig: {
      current: 0,
      total: 0,
      pageSize: 10,
    },
  };

  componentDidMount = () => {
    this.getAll(1);
  };

  getAll = (page) => {
    IntakeProfileService.getAll(page - 1, this.state.pageConfig.pageSize).then(
      this.onGetIntakesSuccess
    );
  };

  onGetIntakesSuccess = (response) => {
    const pageOfIP = response.item.pagedItems.map(this.mapIntakeProfiles);
    const totalIP = response.item.totalCount;
    this.setState((prevState) => ({
      ...prevState,
      mappedIntakeProfiles: pageOfIP,
      pageConfig: {
        ...prevState.pageConfig,
        current: response.item.pageIndex + 1,
        total: totalIP,
      },
    }));
  };

  mapIntakeProfiles = (oneIntakeProfile) => {
    return (
      <React.Fragment key={`IntakeProfiles-${oneIntakeProfile.id}`}>
        <SingleIntakeProfile
          intakeProfile={oneIntakeProfile}
          handleModalToggle={this.setShowModal}
        ></SingleIntakeProfile>
      </React.Fragment>
    );
  };

  setShowModal = (oneIntakeProfile) => {
    this.setState((prevState) => ({
      ...prevState,
      showModal: !prevState.showModal,
      oneIntakeProfile,
    }));
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showModal && (
          <IntakeProfilesPaginatedModal
            isShowModal={this.state.showModal}
            setShowModal={this.setShowModal}
            intakeProfile={this.state.oneIntakeProfile}
          ></IntakeProfilesPaginatedModal>
        )}

        <div className="container pt-5 pb-1">
          <div className="card">
            <div className="card-header text-center">
              <h5>Intake Profiles</h5>
            </div>
            <div className="card-body">
              <div className="user-status table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Session ID</th>
                      <th scope="col" className="text-center">
                        Date Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.state.mappedIntakeProfiles}</tbody>
                </table>
              </div>
            </div>
            <div className="card-footer text-center">
              <Pagination
                className="btn mt3 test-nowrap"
                onChange={this.getAll}
                current={this.state.pageConfig.current}
                total={this.state.pageConfig.total}
                pageSize={this.state.pageConfig.pageSize}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllIntakeProfiles;
