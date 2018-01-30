import React, { Component } from 'react';
import Title from './components/Title';
import DataSummary from './components/DataSummary';
import DataDetails from './components/DataDetails';
import Server from './data/Server';
import './App.css';

class App extends Component {

    state = {
        invoiceInfo:null,
        invoiceInfo2017:null,
        showIndex:0,
        mapInfo:null,
    }

    componentDidMount() {
        Server.instance.login(err=>{
            if(err)return;

            Server.instance.queryInvoiceLibStatisticsByCondition((err, body)=>{
                this.setState({invoiceInfo:body},()=>{
                    Server.instance.queryInvoiceLibStatisticsByCondition((err, body)=>{
                        this.setState({invoiceInfo2017:body},this.updateCompanyName);
                    }, {year:2017})
                });
            })

            Server.instance.queryInvoiceLibNationalEreaStatistics((err, body)=>{
                this.setState({mapInfo:body});
            })
        });

        this.showTimer = setInterval(()=>{
            const invoiceInfo = this.state.invoiceInfo||[];
            this.setState({showIndex:this.state.showIndex>=invoiceInfo.length-1?0:this.state.showIndex+1})
        },5*1000);
    }

    /**更新公司名称 */
    updateCompanyName=()=>{
        Server.instance.company((err, body)=>{
            const invoiceInfo = JSON.parse(JSON.stringify(this.state.invoiceInfo))
            invoiceInfo.forEach(invoice => {
                body.forEach(value => {
                    if(value.taxId === invoice.buyerTaxNo){
                        invoice.buyerName = value.companyName;
                    }
                });
            });
            this.setState({invoiceInfo:invoiceInfo});    
        })
    }

    render() {
        return (
            <div className='app' >
                <Title />
                <div className='app-container' >
                    <div className='app-container-l' >
                        <DataSummary {...this.state}/>
                    </div>
                    <div className='app-container-r' >
                        <DataDetails {...this.state}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
