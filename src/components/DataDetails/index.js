import React, { Component } from 'react';
import { Icon } from 'antd';
import moment from 'moment';
import Statistics from './ui/Statistics';
import './index.css'

class DataDetails extends Component {

    state={
        date:moment()
    }

    componentDidMount(){
        this.dateTimer = setInterval(()=>{
            this.setState({date:moment()});
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.dateTimer);
        clearInterval(this.showTimer);
    }

    render() {

        const invoiceInfo = this.props.invoiceInfo||[];
        const showIndex = this.props.showIndex;

        return (
            <div className='app-data-details' >
                <div style={{color:'#4cc1e0',height:36}} >
                    <span style={{fontSize:24,float:'right'}} >{this.state.date.format('YYYY年MM月DD日 HH:mm:ss')}</span>
                    <Icon style={{fontSize:34,marginRight:10,float:'right'}} type="clock-circle-o" />
                </div>

                <p className='details-t' >税号列表</p>
                <ul className='details-list clear' >
                    {
                        invoiceInfo.map((value, index)=>(
                            <li className={showIndex===index?'on':''} key={index}>{value.buyerName}</li>
                        ))
                    }
                </ul>

                <p className='details-t' >月度统计</p>
                <Statistics showIndex={showIndex} invoiceInfo={invoiceInfo} style={{height:200}} /> 
            </div>
        );
    }
}

export default DataDetails;
