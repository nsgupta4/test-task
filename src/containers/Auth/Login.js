import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, } from 'redux-form'
class Login extends Component {
    render(){
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/dashboard" />
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
  const g = (values) =>{
      this.props.onLogin(values.email, values.password);
  };
  const { handleSubmit, pristine,  submitting } = this.props
  return ( <div> 
    {authRedirect} 
    <form onSubmit={handleSubmit(g)}>
      <div>
        <label>Email</label>
        <div>
          <Field
            id="email"
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            id="password"
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Login
        </button>
        {errorMessage}
      </div>
    </form>
    
</div>  
);
}
}


/*const selector = formValueSelector('simple'); // <-- same as form name
SimpleForm = connect(state => {
  // can select values individually
  const EmailValue = selector(state, 'email');
  const password = selector(state,'password');
  // or together as a group
  const { firstName, lastName } = selector(state, 'firstName', 'lastName');
  return {
    EmailValue,
    password,
    fullName: `${firstName || ''} ${lastName || ''}`,
  };
})(SimpleForm);

export default SimpleForm;
*/

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !==null,
        error: state.login.error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onLogin: (email, password) => dispatch(actions.login(email, password)),
      };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(Login = reduxForm({
        form: 'simple' // a unique identifier for this form
      })(Login));