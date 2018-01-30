import React, { Component } from 'react';
import NumberDisplay from '../NumberDisplay';
import MapChina from '../MapChina';
import Field from '../../utils/doc/Doc.Field';
import './index.css';

export default class DataSummary extends Component {
    
    /**发票张数 */
    get invoiceNumber(){
        var sum = 0;
        const invoiceInfo = this.props.invoiceInfo||[];
        const invoiceInfo2017 = this.props.invoiceInfo2017||[];
        
        invoiceInfo.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                sum += value.invoiceMonthCount;
            })
        })

        invoiceInfo2017.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                sum += value.invoiceMonthCount;
            })
        })

        return sum;
    }

    /**发票金额 */
    get invoiceAmount(){
        var sum = 0;
        const invoiceInfo = this.props.invoiceInfo||[];
        const invoiceInfo2017 = this.props.invoiceInfo2017||[];
        
        invoiceInfo.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                sum += Number(value.invoiceAmountMonthTotal);
            })
        })

        invoiceInfo2017.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                sum += Number(value.invoiceAmountMonthTotal);
            })
        })

        return Field.formatMoneyInt(sum, 0);
    }

    /**供应商数量 */
    get suppliersNum(){
        const mapInfo = this.props.mapInfo||[];
        var sum = 0;
        mapInfo.forEach(value=>{
            sum += value.salerTaxNoList.length;
        });
        return sum;
    }

    /**税额 */
    get invoiceTax(){
        var sum = 0;
        const invoiceInfo = this.props.invoiceInfo||[];
        const invoiceInfo2017 = this.props.invoiceInfo2017||[];
        
        invoiceInfo.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                if(value.redBlueType===0)
                    sum += Number(value.taxAmountMonthTotal);
            })
        })

        invoiceInfo2017.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                sum += Number(value.taxAmountMonthTotal);
            })
        })

        return Field.formatMoneyInt(sum, 0);
    }

    /**发票金额 */
    get invoiceTotal(){
        var sum = 0;
        const invoiceInfo = this.props.invoiceInfo||[];
        const invoiceInfo2017 = this.props.invoiceInfo2017||[];
        
        invoiceInfo.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                if(value.redBlueType===0)
                    sum += Number(value.totalAmountMonthTotal);
            })
        })

        invoiceInfo2017.forEach(value=>{
            const invoiceLibStatisticsMonthInfoList = value.invoiceLibStatisticsMonthInfoList||[]
            invoiceLibStatisticsMonthInfoList.forEach(value=>{
                sum += Number(value.totalAmountMonthTotal);
            })
        })

        return Field.formatMoneyInt(sum, 0);
    }

    render() {        
        return (
            <div className='app-data-summary' >
                <div className='map' >
                    <MapChina mapInfo={this.props.mapInfo} style={{ width: "100%", height: 450, position: 'absolute', right: 0, bottom: 0 }} />
                </div>
                <div className='data' >
                    <div style={{marginBottom:35}} >
                        <p style={{fontSize:18}} >采购协同交易额</p>
                        <NumberDisplay size={34}>{this.invoiceTotal}</NumberDisplay>
                    </div>

                    <div style={{marginBottom:35}} >
                        <p style={{fontSize:18}} >税额</p>
                        <NumberDisplay size={34}>{this.invoiceTax}</NumberDisplay>
                    </div>

                    <div style={{marginBottom:35}} >
                        <p style={{fontSize:18}} >供应商数量</p>
                        <NumberDisplay size={34}>{this.suppliersNum}</NumberDisplay>
                    </div>

                    {/* style={{position:'absolute', right:10, top:0}}  */}
                    <div>
                        <p style={{fontSize:18}} >发票张数</p>
                        <NumberDisplay size={40}>{this.invoiceNumber}</NumberDisplay>
                    </div>
                </div>
            </div>
        );
    }
}