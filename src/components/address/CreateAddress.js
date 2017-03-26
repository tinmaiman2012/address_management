import React from 'react';
import {Button} from 'react-toolbox/lib/button';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import Input from 'react-toolbox/lib/input'
import { Link } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

import { createNewAddresses, fetchedAddresses} from '../../actions/address';


class CreateAddress extends React.Component{

    state = {
        street_number_input: '',
        route_input:'',
        sublocality_level_1:'',
        administrative_area_level_2:'',
        administrative_area_level_1:'',
        googleAddress: '',
        ward_or_willage: '',
        district_or_town: '',
        city_or_province: '',
        country: '',
        showSuccessMessage: 'display-none success-color',
        method_type:'TEXT_INPUTS'
    };

    constructor() {
        super();
        this.createNewAddress =  this.createNewAddress.bind(this);
        this.cancel =  this.cancel.bind(this);
        this.onChange = (googleAddress) => {
            console.log(googleAddress);
            this.setState({ googleAddress: googleAddress });
        }
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value, showSuccessMessage: 'display-none success-color'});
        if(name == "method_type"){
            if(value == "TEXT_INPUTS"){
                this.setState({...this.state, [name]: value, showSuccessMessage: 'display-none success-color'});
            }

        }
    };

    cancel = () =>{

    };

    createNewAddress(){
        var that = this;
        axios.post('/api/address', this.state)
            .then(function (response) {
                axios.get(`/api/addresses`)
                    .then(res => {
                        that.props.fetchedAddresses(res.data)
                    });
                that.setState({...that.state,
                    street_number_input: '',
                    route_input:'',
                    street_number: '',
                    route:'',
                    sublocality_level_1:'',
                    administrative_area_level_2:'',
                    administrative_area_level_1:'',
                    googleAddress: '',
                    postal_code:'',
                    ward_or_willage: '',
                    district_or_town: '',
                    city_or_province: '',
                    country: '',
                    showSuccessMessage: 'display-block success-color'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        const { googleAddress } = this.state;
        var that = this;
        geocodeByAddress(googleAddress,  (err, { lat, lng }) => {
            if (err) { console.log('Oh no!', err) }
            axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`)
                .then(res=>{

                    var componentForm = {
                        street_number: 'short_name', // so nha
                        route: 'long_name', //ten duong
                        locality: 'long_name', // thanh pho
                        sublocality_level_1: 'long_name', // ten phuong
                        administrative_area_level_1: 'short_name', // thanh pho
                        administrative_area_level_2: 'long_name', // quan huyen
                        country: 'long_name', // quoc gia
                        postal_code: 'short_name' // ma vung
                    };
                    var place = res.data.results[0];
                    for (var i = 0; i < place.address_components.length; i++) {
                        var addressType = place.address_components[i].types[0];
                        if (componentForm[addressType]) {
                            var val = place.address_components[i][componentForm[addressType]];
                            this.setState({...this.state, [addressType]: val});
                        }
                    }
            });
            console.log(`Yay! got latitude and longitude for ${googleAddress}`, { lat, lng })
        })
    };


    render(){
        const showTextInput = this.state.method_type === "TEXT_INPUTS" ? 'display-block': 'display-none';
        const showGoogleAutoComplete = this.state.method_type === "GOOGLE_MAP_OBJECT" ? 'display-block': 'display-none';


        return (
            <div>
                <h3> Create New Address</h3>

                <RadioGroup name='comic' value={this.state.method_type} onChange={this.handleChange.bind(this, 'method_type')}>
                    <RadioButton label='Create By Press Text' value='TEXT_INPUTS'/>
                    <RadioButton label='Create By Google Suggestion' value='GOOGLE_MAP_OBJECT' />
                </RadioGroup>

                <section className={showTextInput}>

                    <Input type='text' label='Street Number' name='name' value={this.state.street_number_input}
                           onChange={this.handleChange.bind(this, 'street_number_input')} />

                    <Input type='text' label='Route' name='name' value={this.state.route_input}
                           onChange={this.handleChange.bind(this, 'route_input')} />

                    <Input type='text' value={this.state.ward_or_willage} label='Ward/Village'
                           onChange={this.handleChange.bind(this, 'ward_or_willage')} />

                    <Input type='text' value={this.state.district_or_town} label='District/Town'
                           onChange={this.handleChange.bind(this, 'district_or_town')} />

                    <Input type='text' value={this.state.city_or_province} label='City/Province'
                           onChange={this.handleChange.bind(this, 'city_or_province')} />

                    <Input type='text' value={this.state.country} label='Country'
                           onChange={this.handleChange.bind(this, 'country')} />
                </section>

                <section className={showGoogleAutoComplete}>

                    <form onSubmit={this.handleFormSubmit}>
                        <PlacesAutocomplete
                            value={this.state.googleAddress}
                            onChange={this.onChange}
                        />
                        <Button onClick={this.handleFormSubmit} className="margin-right-10px"
                                label='OK' raised  />
                        <Input type='text' label='Stress Number' name='name' value={this.state.street_number}
                                disabled/>
                        <Input type='text' label='Route' name='name' value={this.state.route}
                                disabled/>

                        <Input type='text' value={this.state.sublocality_level_1} label='Ward/Village'
                                disabled/>

                        <Input type='text' value={this.state.administrative_area_level_2} label='District/Town'
                                disabled/>

                        <Input type='text' value={this.state.administrative_area_level_1} label='City/Province'
                                disabled/>

                        <Input type='text' value={this.state.country} label='Country'
                                disabled/>

                    </form>
                </section>
                <div className={this.state.showSuccessMessage}>Create OK, Press 'Cancel' button if you want to go to home page.'</div>
                <Button onClick={this.createNewAddress} className="margin-right-10px"
                        label='Create' raised primary />
                <Link className="margin-left-10px" to="/"><Button  className="margin-right-10px"  label='Cancel' raised/></Link>

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
    return bindActionCreators({createNewAddresses: createNewAddresses, fetchedAddresses: fetchedAddresses},dispatch)
}


export default connect (mapStateToProps,mapDispatchToProps)(CreateAddress);