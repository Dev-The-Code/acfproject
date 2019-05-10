import { connect } from "react-redux";
import AdminLayout from "./AdminLayout";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminLayout)
);
