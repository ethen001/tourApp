import React, {memo} from 'react';
import {connect} from 'react-redux';
import {ScrollContainer} from '../../common'
import { LostUserCard } from './LostUserCard';

function CardListComponent(props) {
    const {lostUsers} = props;
    if (lostUsers.length > 1) {
        lostUsers.sort((user1, user2) => {
            const date1 = new Date(user1.timestamp.seconds * 1000);
            const date2 = new Date(user2.timestamp.seconds * 1000);
            return date2 - date1;
        });
    }
    return (
        <ScrollContainer resizable >
            {
                lostUsers.map( (user, index) => {
                    return <LostUserCard
                        key={`lostUser ${index}`}
                        user={user.user}
                        location={user.location}
                        timestamp={user.timestamp}
                    />
                })
            }
        </ScrollContainer>
    );
}

function mapStateToProps(state) {
    const {lostUsers} = state.lostUser;
    return {lostUsers};
}

export const CardList = connect(mapStateToProps)(memo(CardListComponent));