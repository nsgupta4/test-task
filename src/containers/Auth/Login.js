import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, } from 'redux-form'
import classes from './Login.css';

const validate = values => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if(values.password.length < 6 ){
        errors.password = 'Atleast 6 char long'
    }
    return errors;
  };
  
  const warn = values => {
    const warnings = {}
    if (values.email < 6) {
      warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
  };
class Login extends Component {
    render(){
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/dashboard" />
        }

        let errorMessage = null;
        if(this.props.err){
            errorMessage = (
                <p>{this.props.err.message}</p>
            );
        }

  const g = (values) =>{
      this.props.onLogin(values.email, values.password);
  };

  
  
  const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className={classes.Label}>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className={classes.Input}/>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

  const { handleSubmit, pristine,  submitting } = this.props
  return ( <div className={classes.Login}> 
    {authRedirect}
    {errorMessage} 
    <form onSubmit={handleSubmit(g)}>
      
          <Field 
            name="email"
            component={renderField}
            type="email"
            label="email"
          />
       
          <Field 
            name="password"
            component={renderField}
            type="password"
            label="Password"
          />
      <div>
        <button type="submit" disabled={pristine || submitting} className={classes.Button}>
          Login
        </button>
        
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
        err: state.login.error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onLogin: (email, password) => dispatch(actions.login(email, password)),
      };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(Login = reduxForm({
        form: 'simple',
        validate,
        warn
      })(Login));