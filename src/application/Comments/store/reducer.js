import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    id:'',
    commentList:[],
    pageCount:0
})

export default (state = defaultState,action) => {
    switch(action.type) {
        case actionTypes.CHANGE_COMMENT_ID:
            return state.set('id',action.data);
        case actionTypes.CHANGE_COMMENT_LIST:
            return state.set('commnetList',action.data);
        case actionTypes.CHANGE_PAGE_COUNT:
            return state.set('pageCount',action.data)
        default:
            return state
    }
}