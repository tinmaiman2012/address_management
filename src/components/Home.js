import React  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-toolbox/lib/button';
import { Link } from 'react-router-dom';

import { selectAddress, fetchedAddresses} from '../actions/address';

class Home extends React.Component{
    
    createListAddress(){
        return this.props.addresses.map((add)=>{
            var editLink = `/edit-address/${add.id}`;
            return (
                <tr key={add.id}>
                    <td>{add.id}</td>
                    <td>{add.street_number}</td>
                    <td>{add.route}</td>
                    <td>{add.ward_or_willage}</td>
                    <td>{add.district_or_town}</td>
                    <td>{add.city_or_province}</td>
                    <td>{add.country}</td>
                    <td><Link to={editLink} ><Button  className="margin-right-10px"  label='Edit' raised/></Link></td>
                </tr>
            );
        });
    }

    render(){

        return (
            <div>
                <h3>Address List</h3>
                <table class="highlight striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Street Number</th>
                            <th>Route</th>
                            <th>Ward/Village</th>
                            <th>District/Town</th>
                            <th>City/Province</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.createListAddress()}
                    </tbody>
                </table>
            </div>

        )
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


export default connect (mapStateToProps,mapDispatchToProps)(Home);