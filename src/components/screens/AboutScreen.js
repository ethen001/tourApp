import React, { Component } from 'react';
import {StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, ScrollContainer, Container} from '../common'
import {FontSize} from '../../Global'
import {getAboutInfo} from '../../actions'

class AboutScreenComponent extends Component {

    componentDidMount() {
        this.props.getAboutInfo();
    }

    render() {
        const {containerStyle, textStyle, titleStyle, cardStyle, mainStyle, scrollContainerStyle} = styles;
        const {About} = this.props.aboutInfo;
        return (
            <Container style={containerStyle}>
                <ScrollContainer contentContainerStyle={scrollContainerStyle}>
                    <Card style={cardStyle} style={mainStyle}>
                        <CardSection>
                            <Text style={titleStyle}>About SBNYC</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={textStyle}>{About}</Text>
                        </CardSection>
                    </Card>
                </ScrollContainer>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'space-around',
    },
    textStyle: {
        color: '#fff',
        fontSize: FontSize.LARGE,
        marginTop: '5%',
        flexWrap: 'wrap',

    },
    titleStyle: {
        color: '#fff',
        fontSize: FontSize.SUPER_LARGE,
        fontWeight: '600',
        fontStyle: 'italic',
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },
    cardStyle: {
        padding: '5%',
        height: '90%',
        justifyContent: "center",
        marginTop: 20
    },
    mainStyle: {
        flex: 10,
        padding: '3%'
    },
    scrollContainerStyle: {
        paddingVertical: '5%'
    }
});

function mapStateToProps(state) {
    const {aboutInfo, aboutError} = state.information;
    return {aboutError, aboutInfo};
}

export const AboutScreen = connect(mapStateToProps, {getAboutInfo})(AboutScreenComponent);
