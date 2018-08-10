import React,{ Component } from 'react';
import Product from '../../../component/dashboard/Product/Product';
import { Route } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import axios from 'axios';
import classes from './Products.css';
import Modal from '../../../component/UI/Modal/Modal';
import OrderSummary from '../../../component/dashboard/Product/OrderSummary';
import * as actions from '../../../store/actions/index';
import PropTypes from 'prop-types';

class Products extends Component {
    state = {
        products: [],
        clicked: false,
        query:'',
        selectedValue:'',
    }
    componentWillMount(){
        console.log('In Products componentWillMount');
        this.props.onFetchProduct();
        //this.setState({products: this.props.products}); 
    }
    componentDidMount(){
        console.log('In componentDidMount');
        this.setState({products: this.props.products}); 
    }
   // static getDerivedStateFromProps(props, state){
   //     this.setState({products: this.props.products}); 
   // }
    componentWillReceiveProps(nextProps) {
        console.log('In componentWillReceiveProps');
        this.setState({
            products: nextProps.products
          });
      }
 purchaseCancelledHandler = () =>{
    this.setState({clicked: false});
 }
 checkoutHandler = () =>{
    this.props.history.push('/checkout');
 }
 purchaseContinuedHandler = (count) => {
    let cart = this.props.cart;
    let c;
    //let filteredCart = cart.filter(item=>{ c = item.count; 
    //    return item.id == this.state.id ; });
    for(let i in cart){
        if(cart[i].id == this.state.id){
            c = 1; 
            cart[i].count = cart[i].count + count;
        }
    }
    console.log('In purchaseContinuedHandler',cart);
    if(c !=1 ){cart.push({
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        img: this.state.img,
        count: count,
    });
}
    this.props.onInitPurchase(cart);
    this.setState({clicked: false});
 }
productSelectedHandler=(id, price, name, img, desc)=>{
    console.log('In productSelected Handler',desc);
    this.setState({
        clicked: true,
        id: id, 
        price: price,
        name: name,
        img: img,
        desc: desc,
    });
}
filterProduct = (event) => {
    //let x = document.getElementById("dropdown").selectedIndex;
    //console.log('In filter', this.state.selectedValue);
    let product = this.state.products;
    let sortedProduct = [];
    if(this.state.selectedValue == 'LowToHigh'){
    sortedProduct = product.sort( (a,b) =>{
        return (a.price > b.price);
    });
}
    if(this.state.selectedValue == 'HighToLow'){
    sortedProduct = product.sort( (a,b) =>{
        return b.price > a.price;
    });
} 
   if(this.state.selectedValue == '') return;
    //console.log('in filter', x, this.state.products, sortedProduct );
        this.setState({products: sortedProduct});
    }
    modalCloseHandler = () => {
        this.setState({clicked: false});
        this.props.location;
    }
  /*  searched = () => {
        let filtered = [];
            this.state.products.map((item) => {
            if(item.name.indexOf(this.state.query) === -1){ 
            return null;
            }
           return filtered.push(item);
        });
        console.log('Searched', filtered );
    }*/
    render(){
        let product = <p style={{textAlign: 'center'}}>Something went Wrong!!!</p>;
        let filtered = [];
        this.state.products.map((item) => {
        if(item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) === -1) { 
            return null;
        }
       return filtered.push(item);
    });
    if(this.state.query !== ''){
        product = filtered.map(post=>{
            return (
            <Product
            key={post.id} 
            title={post.description} 
            Name={post.name}
            Price={post.price}
            img={post.img}
            clicked={(count)=>this.productSelectedHandler(post.id, post.price, post.name, post.img, post.description, count)}
            />);
        }); 
    }  
        if(!this.state.error && this.state.query == ''){
       product = this.state.products.map(post=>{
            return (
            <Product
            key={post.id} 
            title={post.description} 
            Name={post.name}
            Price={post.price}
            img={post.img}
            clicked={(count)=>this.productSelectedHandler(post.id, post.price, post.name, post.img, post.description, count)}
            />);
        }); 
    } 
        return (
            <React.Fragment>
                <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-6">
                    <input type="text" 
                    className="form-control"
                    placeholder="Search" 
                    value={this.state.query} 
                    onChange={(event)=>this.setState({query: event.target.value})}
                    />
                </div>
                <div className="col-sm-2">
                <span >
                <select 
                className="form-control col-xs-2" 
                value={this.state.selectedValue} 
                onChange={(event)=>this.setState({selectedValue: event.target.value})} 
                onClick={this.filterProduct}>
                    <option value="" disabled >Filter</option>
                    <option value="HighToLow">High to Low</option>  
                    <option value="LowToHigh">Low to High</option>
                </select>
                </span>
                </div>
                </div>
            <section className={classes.Products}>
                    {product}
                    <Modal show={this.state.clicked} clicked={this.modalCloseHandler}>
                    <OrderSummary 
                    price={this.state.price} 
                    name={this.state.name} 
                    img={this.state.img} 
                    desc={this.state.desc} 
                    checkout={this.checkoutHandler} 
                    purchaseContinued={(count)=>this.purchaseContinuedHandler(count)} />
                    </Modal>
                </section>
            
               </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: state.item.products,
        error: state.item.error,
        cart: state.item.cart,
        isAuthenticated: state.login.token !== null ,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchProduct: () => dispatch(actions.fetchProducts()),
        onInitPurchase:(cartItem) => dispatch(actions.purchaseInit(cartItem)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
