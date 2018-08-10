import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './AddProduct.css';
import * as actions from '../../store/actions/index';
class AddProductForm extends Component {
    state = {
        img:'',
    }
    handleChange = (event) => {
        event.preventDefault();
        let img = '';
        const file = event.target.files[0];
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(this.setState({img: reader.result}));
            reader.onerror = error => reject(error);
          });
        //const localImageUrl = window.URL.createObjectURL(file);
        //this.setState({img: img});
        //console.log(this.state.img);
      };
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const productData = (values) =>{
            let productData = {
                "name": values.ProductName,
                "description": values.description,
                "price": values.price,
                "img": this.state.img
            };
            this.props.onAddProduct(productData);
        };
        let message = "";
        if(this.props.status == 201 ){
            //message = <Redirect to="/product" />;
        } 

        return (
            <React.Fragment>
                {message}
            <form
            className={classes.Add}
            onSubmit={handleSubmit(productData)}>
              <div className="form-group">
                <label>Product Name</label>
                <div>
                  <Field
                    className="form-control"
                    name="ProductName"
                    component="input"
                    type="text"
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label >description</label>
                <div >
                  <Field
                    className="form-control"
                    name="description"
                    component="input"
                    type="text"
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="form-group"> 
                <label >Price</label>
                <div >
                  <Field
                    className="form-control"
                    name="price"
                    component="input"
                    type="number"
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="form-group">
                <label >Image</label>
                <div >
                <input
                    className="form-control"
                    id="upload"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.handleChange}
                />
                </div>
                
              </div>
             <div className="form-group">
              <div className="col-sm-offset-3 col-sm-6">
                <button type="submit" disabled={pristine || submitting} className="btn btn-default">
                  Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default">
                  Clear Values
                </button>
              </div>
              <div className="col-sm-offset-3 col-sm-4">
                {this.state.img == ''? null : <img src={this.state.img} style={{width: '300px',height: '200px'}}/> }
             </div>
              </div>
            </form>
            </React.Fragment>
          );
    }
}
const mapStateToProps = state => {
    return {
        status: state.item.status,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddProduct: (productData) => dispatch(actions.addProduct(productData)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'addForm' // a unique identifier for this form
})(AddProductForm));

