import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const User = ({ user }) => <img src={user.avatarURL}  alt={`Avatar of ${user.name}`}/>

User.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ users } , {id }) => {  
  return {
    user: users[id]
  }
};

export default connect(mapStateToProps)(User);