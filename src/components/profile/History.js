import React, { useEffect } from "react";
import HistoryItem from "./HistoryItem";
import { loadHistory } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const History = ({ loadHistory, hist: { history, loading } }) => {
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);
  return (
    <div className="history">
      <div class="box2">
        <ul class="timeline">
          {loading ? (
            <h1>loading</h1>
          ) : history.length > 0 ? (
            history.map((hist) => (
              <HistoryItem
                Date={hist.Date}
                From={hist.From.name}
                To={hist.To.name}
                amount={hist.amount}
              />
            ))
          ) : (
            <h2>No transactions uptil now :(</h2>
          )}
        </ul>
      </div>
    </div>
  );
};

History.protoTypes = {
  loadHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  hist: state.profile,
});

export default connect(mapStateToProps, { loadHistory })(History);
