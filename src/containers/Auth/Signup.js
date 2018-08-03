import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Field, reduxForm, } from 'redux-form';
import classes from './Signup.css';
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if(!values.conformPassword){
    errors.conformPassword = 'Required'
  }else if(values.password !== values.conformPassword){
    errors.conformPassword = 'Password Must be same'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.password > 6) {
    warnings.age = 'password should be atleast be 6 char...'
  }
  return warnings
};

class Signup extends Component {
    state ={
        isSignup: true,
    }
    
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
      this.props.onSignup(values.email, values.password, values.name, values.username, values.sex);
  };
  const { handleSubmit, pristine,  submitting } = this.props
  const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label className={classes.Label}>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className={classes.Input}/>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
 let form = ( <form onSubmit={handleSubmit(g)}>
 
     <Field className={classes.Input}
       name="name"
       component={renderField}
       type="text"
       label="name"
     />
 
     <Field className={classes.Input}
       name="username"
       component={renderField}
       type="text"
       label="username"
     />
 
     <Field className={classes.Input}
       name="email"
       component={renderField}
       type="email"
       label="Email"
     />
       <Field 
         name="sex"
         component={renderField}
         type="radio"
         value="male"
       />{' '}
       Male
   
       <Field 
         name="sex"
         component={renderField}
         type="radio"
         value="female"
       />{' '}
       Female
   
       <Field className={classes.Input}
       name="password"
       component={renderField}
       type="password"
       label="Password"
     />
     <Field className={classes.Input}
       name="conformPassword"
       component={renderField}
       type="password"
       label="Confirm Password"
     />
 <div>
   <button type="submit" disabled={pristine || submitting} className={classes.Button}>
     SIGN UP
   </button>
 </div>
</form>

 );
  return ( 
      <div className={classes.Signup}> 
      {authRedirect}
      {errorMessage}
      {form}
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
      onSignup: (email, password, name, username, sex) => dispatch(actions.signUp(email, password, name, username, sex)),
      };
    };

    export default connect(mapStateToProps,mapDispatchToProps)(Signup = reduxForm({
        form: 'simple',
        validate,
        warn // a unique identifier for this form
      })(Signup));