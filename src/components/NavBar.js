import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button} from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import PurpleAppBar from '../theme/PurpleAppBar';
import { selectAddress, fetchedAddresses} from '../actions/address';

class NavBar extends React.Component{

    constructor() {
        super();
    }

    componentWillMount() {
        axios.get(`/api/addresses`)
            .then(res => {
                this.props.fetchedAddresses(res.data)
            });
    }

    convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;
        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';
        keys = Object.keys(data[0]);
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) {result += columnDelimiter;}

                if(item[key] != null && item[key] != '' && typeof(item[key])== "string"){
                    if(item[key].includes('"')){
                        var b = item[key].replaceAll('"', "'");
                        result = result +  ('"'+b+'"');
                    }else{
                        result = result +  ('"'+item[key]+'"');

                    }
                }else{
                    result = result +  ('"'+item[key]+'"');
                }

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    };

    onExportCSVFile = ()=>{
        var csv = this.convertArrayOfObjectsToCSV({
            data: this.props.addresses
        });
        if (csv == null) return;
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "addresses.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    render() {
        return (
            <PurpleAppBar >
                <NavLink  to="/create-address" exact  >
                    <Button icon='add' label='CREATE' raised primary />
                </NavLink>
                <Button onClick={this.onExportCSVFile.bind(this)} className="margin-left-10px" icon='bookmark' label='EXPORT ADDRESSES TO CSV' raised/>
            </PurpleAppBar>
        );
    }
}


function mapStateToProps(state){
    return {
        addresses: state.address.addresses
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({selectAddress: selectAddress, fetchedAddresses: fetchedAddresses},dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(NavBar);