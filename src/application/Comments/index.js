import React,{useEffect} from 'react'
import {CommentsContainer} from './style'
import {getCommentList,changePageCount,refreshMoreCommentList,changeCommentId} from './store/actionCreators'
import {connect} from 'react-redux'
import Scroll from './../../baseUI/scroll/index';



function Comments(props) {
    const {id,commentList,pageCount} = props
    const {getCommentListDispatch,setCommentId} = props
    useEffect(() => {
        setCommentId(1406633327)
        getCommentListDispatch()
    },[])
    return (
        id&&<CommentsContainer>
            <div className="background layer">评论</div>
        </CommentsContainer>
    )
}

const mapStateToProps = state => ({
    id:state.getIn(['comments','id']),
    commentList:state.getIn(['comments','commentList']),
    pageCount:state.getIn(['comments','pageCount'])
})

const mapDispatchToProps = dispatch => {
    return {
        getCommentListDispatch(){
            dispatch(getCommentList())
        },
        pullUpRefreshDispatch(count){
            dispatch(changePageCount(count+1));
            dispatch(refreshMoreCommentList());
        },
        setCommentId(id){
            dispatch(changeCommentId(id))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);