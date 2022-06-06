import React from "react";
import './certificate.css'

function Certificate(props) {
    const data = props.dataFromList;
    console.log(data);
        
    return (
        <>
            <div style={{position: 'relative'}}>
                <img alt="" src={require('./certificate.png')} width="100%" height="100%"></img>
                <div id="data_name">{data[0]}</div>
                <div id="data_owner">{data[1]}</div>
                <div id="data_number">{data[2]}</div>
                <div id="data_address">{data[3]}</div>
                <div id="data_businessType">{data[4]}</div>
                <div id="data_certificateID">{data[5]}</div>
            </div>
        </>
    )
}

export default Certificate;