import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Field, reduxForm, } from 'redux-form'
class Signup extends Component {
    state ={
        isSignup: true,
    }
    render(){
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
  return ( <div> {errorMessage}
    <form onSubmit={handleSubmit(g)}>
      <div>
        <label>Name</label>
        <div>
          <Field
            id="name"
            name="name"
            component="input"
            type="text"
            placeholder="Name"
          />
        </div>
      </div>
      <div>
        <label>UserName</label>
        <div>
          <Field
            id="username"
            name="username"
            component="input"
            type="text"
            placeholder="Name"
          />
        </div>
      </div>
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
        <label>Sex</label>
        <div>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="male"
            />{' '}
            Male
          </label>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="female"
            />{' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          SIGN UP
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

const mapDispatchToProps = dispatch => {
    return {
      onSignup: (email, password, name, username, sex) => dispatch(actions.signUp(email, password, name, username, sex)),
      };
    };

    export default connect(null,mapDispatchToProps)(Signup = reduxForm({
        form: 'simple' // a unique identifier for this form
      })(Signup));