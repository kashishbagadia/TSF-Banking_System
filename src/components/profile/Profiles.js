import React, { useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { loadProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Profiles = ({ loadProfile, profile: { profiles, loading } }) => {
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);
  return (
    <div className="profile-box">
      {loading ? (
        <h1>loading</h1>
      ) : profiles.length > 0 ? (
        profiles.map((profile) => (
          <ProfileItem
            name={profile.name}
            profession={profile.profession}
            acc_no={profile.acc_no}
            email={profile.email}
            acc_balance={profile.acc_balance}
          />
        ))
      ) : (
        <h2>No Profile Found</h2>
      )}
    </div>
  );
};

Profiles.protoTypes = {
  loadProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { loadProfile })(Profiles);
