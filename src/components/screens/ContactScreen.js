import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text} from 'react-native';
import {Container, Card, CardSection, LabeledText, ScrollContainer} from '../common';
import {FontSize, formatPhoneNumberString} from '../../Global'
import {getHotelInfo} from '../../actions'

class ContactScreenComponent extends PureComponent {

    componentDidMount() {
        const {group, getHotelInfo} = this.props;
        getHotelInfo(group);
    }

    render() {
        const {containerStyle, labeledTextStyle1, labeledTextStyle2, textStyle, scrollContainerStyle, cardStyle, cardSectionStyle} = styles;
        const {hotelName, phoneNumber, address} = this.props.hotelInfo;
        return (
            <Container style={containerStyle}>
                <ScrollContainer contentContainerStyle={scrollContainerStyle}>
                    <Card style={cardStyle}>
                        <CardSection>
                            <Text style={textStyle}>Hotel</Text>
                            <LabeledText label="Name:" labelStyle={labeledTextStyle1} textStyle={labeledTextStyle2}>
                                {hotelName}
                            </LabeledText>
                            <LabeledText label="Address:" labelStyle={labeledTextStyle1} textStyle={labeledTextStyle2}>
                                {address}
                            </LabeledText>
                            <LabeledText label="Phone Number:" labelStyle={labeledTextStyle1} textStyle={labeledTextStyle2}>
                                {formatPhoneNumberString(phoneNumber)}
                            </LabeledText>
                        </CardSection>
                        <CardSection style={{marginTop: 100}}>
                            <Text style={textStyle}> SBNYC</Text>
                            <LabeledText label="Phone Number:" labelStyle={labeledTextStyle1} textStyle={labeledTextStyle2} >
                                212-643-1099
                            </LabeledText>
                        </CardSection>
                    </Card>
                </ScrollContainer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center'
    },
    labeledTextStyle1: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: FontSize.LARGE
    },
    labeledTextStyle2: {
        color: '#fff',
        fontWeight: '500',
        fontSize: FontSize.LARGE

    },
    textStyle: {
        fontSize: FontSize.SUPER_LARGE + FontSize.TINY,
        fontWeight: '600',
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },
    scrollContainerStyle: {
        paddingVertical: '5%',
        width: '100%',
        height: '120%'
    },
    cardStyle: {
        padding: '5%',
        height: '90%'
    },
});

function mapStateToProps(state) {
    const {group} = state.groupAuth;
    const {hotelInfo} = state.information
    return {group, hotelInfo};
}

export const ContactScreen = connect(mapStateToProps, {getHotelInfo})(ContactScreenComponent);