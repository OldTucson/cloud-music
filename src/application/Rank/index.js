//src/appliction/Rank/index.js
import React,{ useEffect } from 'react';
import { connect } from 'react-redux'
import {getRankList} from './store/index'
import {filterIndex } from '../../api/utils'
import { renderRoutes } from 'react-router-config'
import {
  Container,
  SongList,
  ListItem,
  List
} from './style';
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading'

const mapStateToProps = state => ({
  rankList:state.getIn(['rank','rankList']),
  loading:state.getIn(['rank','loading'])
})

const mapDispatchToProps = dispatch => {
  return {
    getRankListDataDispatch(){
      dispatch(getRankList())
    }
  }
}

// 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
const renderRankList = (list, global) => {
  return (
    <List globalRank={global}>
      {
      list.map ((item,index) => {
        return (
          <ListItem key={index} tracks={item.tracks} onClick={() => enterDetail (item.name)}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            { renderSongList (item.tracks)  }
          </ListItem>
        )
      })
    } 
    </List>
  )
}

const enterDetail  = name => {

}

const renderSongList = (list) => {
  return list.length ? (
    <SongList>
      {
        list.map ((item, index) => {
          return <li key={index}>{index+1}. {item.first} - {item.second}</li>
        })
      }
    </SongList>
  ) : null;
}

function Rank (props) {
  const {rankList:list,loading} = props
  const {getRankListDataDispatch} = props


  let rankList = list ? list.toJS() : []
  let globalStartIndex = filterIndex (rankList);
  let officialList = rankList.slice (0, globalStartIndex);
  let globalList = rankList.slice (globalStartIndex);
  let displayStyle = loading ? {"display":"none"}:  {"display": ""};

  useEffect (() => {
    getRankListDataDispatch ();
  }, []);
  return (
    <Container>
    <Scroll>
      <div>
        <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          { renderRankList (officialList) }
        <h1 className="global" style={displayStyle}> 全球榜 </h1>
          { renderRankList (globalList, true) }
        { loading ? <Loading></Loading> : null }
      </div>
    </Scroll> 
    {renderRoutes (props.route.routes)}
  </Container>
  )
}

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Rank));