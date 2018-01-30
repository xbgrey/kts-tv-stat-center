import React, { Component } from 'react';
import './index.css';

export default class NumberDisplay extends Component {
    
    getShowText=(value)=>{
        var sum = []
        value = value+'';
        for(var i=0; i<value.length; i++){
            var str = value.substr(i,1);
            sum.push(<span style={{fontSize:this.props.size}} className={str===','?'comma':'number'} key={i}>{str}</span>)
        }
        return sum.map(value=>value);
    }
    
    render() {
        /**文本的的span结构 */
        const showText = this.getShowText(this.props.children);

        return (
            <div className='app-number-display' >
                {showText}
            </div>
        );
    }
}