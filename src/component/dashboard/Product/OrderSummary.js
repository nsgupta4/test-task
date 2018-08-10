import React, {Component} from 'react';
import classes from './OrderSummary.css';
class OrderSummary extends Component {
    state={
        count: 1,
        totalPrice: 0,
    }
   onRemoveQty = () => {
       if(this.state.count == 1){
           return;
    }
    this.setState({count: this.state.count - 1});
   };
   
    render(){
       //let totalPrice = this.props.price;
       //console.log('in ORderser summary', this.state.totalPrice);
        return ( <React.Fragment>
            <h3>Order Summary</h3>
            <div className="row">
            <p></p>
             <div className="col-sm-4">
                <img style={{height: '100px', width:'100px'}} src={this.props.img}/>
            </div>
            <div className="col-sm-4">{this.props.name}</div>
            <div className="col-sm-8">{this.props.desc} <br/><br/>
            <strong>Price: {this.props.price}$ * {this.state.count}</strong>
            </div>
            </div><br/>
            <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
                <span className={classes.Qty}> Qty: &nbsp;
                <a onClick={() => this.setState({count: this.state.count + 1})}><i className="far fa-plus-square fa-2x"></i></a> &nbsp;
                {this.state.count}
                &nbsp;&nbsp;<a onClick={this.onRemoveQty}><i className="far fa-minus-square fa-2x"></i></a>
                </span>
            </div>
            </div>
            <p></p>
            <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
            <span className={classes.button}>
            <button onClick={()=>this.props.purchaseContinued(this.state.count)}>Add to cart</button>
            </span>
            </div>
            </div>
        </React.Fragment>);
    }
}
export default OrderSummary;