import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Field, reduxForm, } from 'redux-form'
import { RingLoader} from 'react-spinners';
import classes from './Login.css';

const validate = values => {
    const errors = {}

    if (!values.name) {
      errors.name = 'Required'
    } 
    if (!values.username) {
      errors.username = 'Required'
    } //else if(values.password.length < 6 ){
    //    errors.password = 'Atleast 6 char long'
    //}
    if (!values.password) {
      errors.password = 'Required'
    }
    if(!values.confirmPassword){
      errors.confirmPassword = 'Required'
    }else if(values.password !== values.confirmPassword){
      errors.confirmPassword = 'Password Must be same'
    }
    return errors;
  };
  
  const warn = values => {
    const warnings = {}
    if (values.password < 6) {
      warnings.confirmPassword = 'Too Weak'
    }
    return warnings
  };
class Profile extends Component {
 state = {
   clicked: false,
 }
  componentDidMount(){
    //this.props.onGetProfile();
  }
  onClickChangePassword = () => {
    this.setState({
      clicked: true,
    })
  }
    render(){
      const { handleSubmit, pristine,  submitting } = this.props
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/dashboard" />
        }
        let errorMessage = null;
        if(this.props.message){
            errorMessage = (
                <p>{this.state.clicked ? null :this.props.message}</p>
            );
        }

  const g = (values) =>{
    if(this.state.clicked){
      this.props.onChangePassword(values.password)
    }else{
      this.props.onUpdateProfile({
        name: values.name,
        username: values.username
      });
    }
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
  let form = (<form onSubmit={handleSubmit(g)}>
      
  <Field 
    name="name"
    component={renderField}
    type="text"
    label="Name"
    
  />
   <Field 
    name="username"
    component={renderField}
    type="text"
    label="username"
  />
           

<div>
<button type="submit" disabled={pristine || submitting} className={classes.Button}>
  Update
</button>

</div>
</form>);
const changeForm = (<form onSubmit={handleSubmit(g)}>
      
<Field 
  name="password"
  component={renderField}
  type="password"
  label="password"
/>
 <Field 
  name="confirmPassword"
  component={renderField}
  type="password"
  label="confirm Password"
/>
         

<div>
<button type="submit" disabled={pristine || submitting} className={classes.Button}>
Change
</button>

</div>

</form>

);
  if(this.props.loading){
    form = <RingLoader />
}else if(this.state.clicked){
  form = changeForm;
}

  return ( <div className={classes.Login}> 

    {authRedirect}
    {errorMessage}
    {form}
  {this.state.clicked ? null :<a onClick={this.onClickChangePassword}>Change Password</a> }
    
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
        profileError: state.login.error,
        loading: state.login.loading,
        initialValues: state.login,
        message: state.login.message,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onUpdateProfile: (updatedData) => dispatch(actions.updateProfile(updatedData)),
      onChangePassword: (updatedPwd) => dispatch(actions.updatePassword(updatedPwd)),
      };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(Profile = reduxForm({
        form: 'simple',
        validate,
        warn
      })(Profile));