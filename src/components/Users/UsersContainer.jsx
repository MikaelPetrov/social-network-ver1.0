import React from 'react';
import { connect } from 'react-redux';
import {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
    currentPageSelector,
    isFetchingSelector,
    isFollowingProgressSelector,
    pageSizeSelector,
    totalCountUsersSelector,
    usersSelector
    // usersPageReselect
} from '../../redux/selectors/user-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsersThunkCreator(currentPage, pageSize);
    }
    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props;
        this.props.getUsersThunkCreator(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalCountUsers={this.props.totalCountUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followThunkCreator={this.props.followThunkCreator}
                unfollowThunkCreator={this.props.unfollowThunkCreator}
                isFollowingProgress={this.props.isFollowingProgress}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        users: usersSelector(state),
        pageSize: pageSizeSelector(state),
        totalCountUsers: totalCountUsersSelector(state),
        currentPage: currentPageSelector(state),
        isFetching: isFetchingSelector(state),
        isFollowingProgress: isFollowingProgressSelector(state)
        // users: usersPageReselect(state)
    }
}
let mapDispatchToProps = {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer)