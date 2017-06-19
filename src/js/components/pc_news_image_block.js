/**
 * Created by Administrator on 2017/5/15 0015.
 */
import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCImageNewsBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ""
        };
    }

    // 组件即将加载时获取到新闻数据
    componentWillMount() {
        const myFetchOptions = {
            method: 'GET'
        };
        // 新闻的类型和条数从父页面传过来
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}));

    }

    render() {
        // 定义styleImage的样式
        const  styleImage = {
            width : "112px",
            height : "90px"
        }
        // 定义h3和p的样式
        const styeH3 = {
            width: "112px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign : "left",
        }

        const styleP = {
            width: "112px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign : "center",

        }

        // let news = this.state.news;
        // 解构赋值
        const {news} = this.state;
        const newsList = news.length
            // 箭头函数，如果函数里面的表达式用()包裹就相当于return，如果用{}包裹需要加上return。
            ? news.map((newsItem, index) => (
                <div key={index} class="imageblock">
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div class="custom-image">
                            <img src={newsItem.thumbnail_pic_s} alt="新闻缩略图" style={styleImage}/>
                        </div>
                        <div class="custom-card">
                            <h3 style={styeH3}>{newsItem.title}</h3>
                            <p style={styleP}>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            : '没有加载到任何新闻';

        return(
            <Card class="topNewsImage" title={this.props.cartTiele} width={this.props.width}>
                {newsList}
            </Card>
        )
    }
}

