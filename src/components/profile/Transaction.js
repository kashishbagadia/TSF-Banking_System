import React, { useEffect, useState } from "react";
import { transfer } from "../../actions/profile";
import { loadProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Transaction = ({ loadProfile, profiles, transfer, history }) => {
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);
  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    amount: "",
  });
  const { sender, receiver, amount } = formData;
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const From = profiles.filter((profile) => profile.name === sender);
    const To = profiles.filter((profile) => profile.name === receiver);
    transfer({ From: From[0].acc_no, To: To[0].acc_no, amount }, history);
  };

  return (
    <div className="transaction">
      <div className="box">
        <div className="glass"></div>
        <div className="glass-content">
          <h2>SENDER</h2>
          <br />
          <p>
            Select sender's name from whose Account we have to transfer the
            money:
          </p>
          <br />
          <p>
            <b>Money transfer From:</b>
          </p>
          <br />
          <div>
            <select name="sender" value={sender} onChange={(e) => onChange(e)}>
              <option>Option 1</option>
              {profiles.map((profile) => (
                <option>{profile.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="box">
        <div className="glass"></div>
        <div className="glass-content">
          <h2>MAKE TRANSACTION</h2>
          <br />
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="number"
              min="0"
              name="amount"
              value={amount}
              placeholder="Enter amount..."
              onChange={(e) => onChange(e)}
            />
            <br />
            <input type="submit" name="" value="Submit" />
          </form>
        </div>
      </div>
      <div className="box">
        <div className="glass"></div>
        <div className="glass-content">
          <h2>RECIPIENT</h2>
          <br />
          <p>
            Select receiver's name to whose Account we have to transfer the
            money:
          </p>
          <br />
          <p>
            <b>Money transfer To:</b>
          </p>
          <br />
          <div>
            <select  name="receiver" value={receiver} onChange={(e) => onChange(e)}>
              <option>Option 1</option>
              {profiles.map((profile) => (
                <option>{profile.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

Transaction.protoTypes = {
  loadProfile: PropTypes.func.isRequired,
  transfer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { loadProfile, transfer })(Transaction);
