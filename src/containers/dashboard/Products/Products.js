import React,{ Component } from 'react';
import Product from '../../../component/dashboard/Product/Product';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import classes from './Products.css';
import Modal from '../../../component/UI/Modal/Modal';
import OrderSummary from '../../../component/dashboard/Product/OrderSummary';
import * as actions from '../../../store/actions/index';
class Products extends Component {
    state = {
        products: [],
        clicked: false,
    }
    componentDidMount(){
        console.log(this.props);
        this.props.onFetchProduct(); 
 }
 purchaseCancelledHandler = () =>{
    this.setState({clicked: false});
 }
 purchaseContinuedHandler = () => {

 }
    productSelectedHandler=(id)=>{
        this.setState({clicked: true});
    }
    modalCloseHandler = () => {
        this.setState({clicked: false});
    }
    render(){
        let product = <p style={{textAlign: 'center'}}>Something went Wrong!!!</p>;
        if(!this.state.error){
       product = this.props.products.map(post=>{
            return (
            <Product
            key={post.id} 
            title={post.title} 
            Name={post.Name}
            Price={post.price}
            clicked={()=>this.productSelectedHandler(post.id)}
            />);
        }); 
    }
        return (
            <div>
            <section className={classes.Products}>
                    {product}
                    <Modal show={this.state.clicked} clicked={this.modalCloseHandler}>
                    <OrderSummary price purchaseCancelled={this.purchaseCancelledHandler} purchaseContinued={this.purchaseContinuedHandler} />
                    </Modal>
                </section>
                </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: state.item.products,
        error: state.item.error,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchProduct: () => dispatch(actions.fetchProducts()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);