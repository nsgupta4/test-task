import React, {Component} from 'react';

class OrderSummary extends Component {
    render(){
       const summary = [];
        return ( <React.Fragment>
            <h3>Order</h3>
            <p></p>
            <ul>
                orderSummary
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p> button </p>
            <p>Continue to checkout?</p>
            <button onClick={this.props.purchaseCancelled}>CANCEL</button>
            <button onClick={this.props.purchaseContinued} >CONTINUE</button>
        </React.Fragment>);
    }
}
export default OrderSummary;