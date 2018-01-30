import React, { Component } from 'react';
import Field from '../../utils/doc/Doc.Field';

const geoCoordMap = {
        "北京市": [116.46, 39.92],
        "天津市": [117.2, 39.13],
        "河北省": [114.48, 38.03],
        "山西省": [112.53, 37.87],
        "内蒙古自治区": [118.87, 42.28],
        "辽宁省": [123.38, 41.8],
        "吉林省": [125.35, 43.88],
        "黑龙江省": [126.63, 45.75],
        "上海市": [121.48, 31.22],
        "江苏省": [118.78333, 32.05000],
        "浙江省": [120.19, 30.26],
        "安徽省": [117.27, 31.86],
        "福建省": [118.1, 24.46],
        "江西省": [115.89, 28.68],
        "山东省": [117, 36.65],
        "广东省": [113.23, 23.16],
        "广西壮族自治区": [110.28, 25.29],
        "海南省": [110.35, 20.02],
        "河南省": [113.65, 34.76],
        "湖北省": [114.31, 30.52],
        "湖南省": [113, 28.21],
        "重庆市": [106.54, 29.59],
        "四川省": [104.06, 30.67],
        "贵州省": [106.71, 26.57],
        "云南省": [102.73, 25.04],
        "西藏自治区":[91.11,29.97],
        "陕西省": [109.47, 36.6],
        "甘肃省": [103.73, 36.03],
        "青海省": [101.74, 36.56],
        "宁夏回族自治区": [106.27, 38.47],
        "新疆维吾尔族自治区": [87.68, 43.77],
        "香港特别行政区":[114.186124, 22.293586],
        "澳门特别行政区":[	113.557519,	22.204118],
        "台湾省":[121.973871, 24.086957]
    };

const valueList = [
]

const getGeoCoordMap = (name)=>{
    for(var t in geoCoordMap){
        if(t.indexOf(name)>=0){
            return geoCoordMap[t];
        }
    }
}

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {

        var geoCoord = getGeoCoordMap(data[i].name);
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

const option = {
    xAxis: {
        scale: true,
        show: false
    },
    yAxis: {
        scale: true,
        show: false
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + ' : ' + params.value[2];
        }
    },
    visualMap: {
        min: 0,
        max: 99999999,
        show: false,
        calculable: true,
        inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
        },
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
        {
            animation:false,
            type: 'effectScatter',
            z:999999999,
            symbolSize: 20,
            coordinateSystem: 'geo',
            data: [
                {
                    name:'文登\n100,100元',
                    value:geoCoordMap['文登'],
                }
            ],
            label: {
                normal: {
                    fontSize:18,
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                    color: '#fff',
                    // textBorderColor: "#50a3ba",
                    // textBorderWidth:2
                },
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
        },
        {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(valueList),
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        }
    ]
}

export default class MapChina extends Component {

    mapIndex = 0;

    visualMapMax = ()=>{
        const mapInfo = this.props.mapInfo||[];
        var max = 0;
        
        mapInfo.forEach(value=>{
            if(value.totalAmountTotal>max){
                max = value.totalAmountTotal;
            }
        })
        return max;
    }

    componentDidMount() {
        this.myChart = window['echarts'].init(document.getElementById('main'));
        this.myChart.setOption(option);

        this.showTimer = setInterval(()=>{
            
            this.mapIndex++;
            if(this.mapIndex>=valueList.length){
                this.mapIndex=0;
            }

            const item = valueList[this.mapIndex]||{};

            option.series[0].data[0].name  = item.name+'\n￥'+Field.formatMoneyInt(item.value, 0)+'\n供应商:'+item.length+'家';
            option.series[0].data[0].value = getGeoCoordMap(item.name); 

            this.myChart.setOption(option);
        },3*1000);
    }

    componentDidUpdate(){
        const mapInfo = this.props.mapInfo||[];
        
        valueList.splice(0, valueList.length);
        mapInfo.forEach(value=>{
            var item = {
                name:value.provinceName,
                value:value.totalAmountTotal,
                length:value.salerTaxNoList.length
            };
            valueList.push(item)
        })

        option.visualMap.max = this.visualMapMax();
        option.series[1].data = convertData(valueList);

        this.myChart.setOption(option);
    }

    render() {
        return <div id="main" style={this.props.style}></div>;
    }
}