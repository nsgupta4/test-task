import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from '../../../../component/UI/Modal/Modal';
import * as actions from '../../../../store/actions/index';
import classes from './Checkout.css';
class Checkout extends Component{
    state = {
        message:'',
        clicked: false,
    }
    orderPlaced = () => {
        let message = "Your order is placed";
        this.setState({message: message});
    }
    modalCloseHandler = () => {
        this.setState({clicked: false});
        this.props.location;
    }
    render(){
        //console.log('In checkout',this.props.cart);
        let totalPrice = 0;
        let view = this.props.cart.map((item, index)=>{
            totalPrice = totalPrice + (item.price * item.count);
            return(
            <React.Fragment key={index}>
            <div className={classes.Cart}>
            <div className="row">
                <div key={item.id} className="col-sm-2"><img src={item.img} style={{width:'100px', height:'100px'}}/>
                </div>
                <div className="col-sm-2">{item.name}
                </div>  
                <div className="col-sm-2">{item.price}
                </div> 
                <div className="col-sm-2">{item.count}
                </div>
                <div><a onClick={() => this.props.onRemoveItem(index, this.props.cart)}><i className="fas fa-times fa-2x"></i></a>
                </div><br/>
                </div></div></React.Fragment>);
        });
        let button = ( <React.Fragment><div className={classes.Cart}><span>Total Price: {totalPrice.toFixed(2)}</span><br/>
            <button onClick={this.orderPlaced}> Place Order</button></div></React.Fragment>);
        if(this.props.cartLength == 0){
            button = <h2><p className="text-center">Add items to cart</p></h2>;
        }
        return(
            <div className="row">
            <p className="text-center"> {this.state.message} </p>
            <h1><p className="text-center">Checkout</p></h1>
            {this.props.cartLength !==0 ?<div className={classes.Cart}>
            <div className="row">
            <div className="col-sm-2"> Product Image</div>
            <div className="col-sm-2"> Product Name</div>
            <div className="col-sm-2"> Price</div>
            <div className="col-sm-2"> Quantity</div>
            </div></div> : null}
                <div className="col-sm-12" onClick={()=>this.setState({clicked: true})}>
               {view}
               <Modal show={this.state.clicked} clicked={this.modalCloseHandler}>
               </Modal>
               </div>
               <div>
               {button}
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        cart: state.item.cart,
        cartLength: state.item.cartLength,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem: (id, cart) => dispatch(actions.removeCartItem(id, cart)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

 