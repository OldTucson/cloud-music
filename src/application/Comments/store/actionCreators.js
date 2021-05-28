import { getCommentListRequest } from '../../../api/request'
import {
    CHANGE_COMMENT_LIST,
    CHANGE_PAGE_COUNT,
    CHANGE_COMMENT_ID
} from './constants'
import {fromJS} from 'immutable'

const changeCommentList = data => ({
    type:CHANGE_COMMENT_LIST,
    data:fromJS(data)
})

export const changePageCount = data => ({
    type:CHANGE_PAGE_COUNT,
    data
})

export const changeCommentId = data => ({
    type:CHANGE_COMMENT_ID,
    data
})

export const getCommentList = () => {
    return (dispatch,getState) => {
        const id = getState().getIn(['comments','id'])
        getCommentListRequest(id,0).then(res => {
            const data = res.comments
            console.log(data)
            dispatch(changeCommentList(data))
        })
    }
}

export const refreshMoreCommentList = () => {
    return (dispatch, getState) => {
      const id = getState().getIn(['comments','id'])
      const pageCount = getState().getIn(['comments', 'pageCount']);
      const commentList = getState().getIn(['comments', 'commentList']).toJS();
      getCommentListRequest(id,pageCount).then(res => {
        const data = [...commentList, ...res.comments];
        dispatch(changeCommentList(data));
      }).catch(() => {
        console.log('评论数据获取失败');
      });
    }
  };