import React, { Component } from 'react';

const option = {
    color: ['#3398DB'],
    
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true
    },
    xAxis : [
        {
            // animation: false,
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            },
            nameTextStyle:{
              color:'#fff'  
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        }
    ],
    yAxis : [
        {
            // animation: false,
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            },
            type : 'value'
        }
    ],
    series : [
        {
            // animation: false,
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[]
        }
    ]
};

export default class Statistics extends Component {

    componentDidMount() {
        this.myChart = window['echarts'].init(document.getElementById('statistics'));
        this.myChart.setOption(option);
    }

    componentWillUpdate(){
        this.myChart.setOption(this.option);
    }

    get option(){
        /**@type{Array} */
        const info = this.props.invoiceInfo[this.props.showIndex]||{};
        const invoiceLibStatisticsDayList = info.invoiceLibStatisticsDayList||[];
        const xAxis = [];
        const series = [];
        for(var i=0; i<invoiceLibStatisticsDayList.length; i++){
            /**@type{Array} */
            const invoiceLibStatisticsDayInfoList = invoiceLibStatisticsDayList[i].invoiceLibStatisticsDayInfoList;
            var decimal = 0;
            for(var l=0; l<invoiceLibStatisticsDayInfoList.length; l++){
                if(invoiceLibStatisticsDayInfoList[l].redBlueType===0)
                    decimal += Number(invoiceLibStatisticsDayInfoList[l].totalAmountDayTotal);
            }
            series.push(decimal);
            xAxis.push(i+1);
        }
        option.xAxis[0].data = xAxis;
        option.series[0].data = series;

        return option;
    }

    render() {
        return <div id="statistics" style={this.props.style}></div>;
    }
}