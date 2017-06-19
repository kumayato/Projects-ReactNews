/**
 * Created by Administrator on 2017/5/15 0015.
 */
import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCNewsBlock extends React.Component {
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
        // let news = this.state.news;
        // 解构赋值
        const {news} = this.state;
        const newsList = news.length
            // 箭头函数，如果函数里面的表达式用()包裹就相当于return，如果用{}包裹需要加上return。
            ? news.map((newsItem, index) => (
                <li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        {newsItem.title}
                    </Link>
                </li>
            ))
            : '没有加载到任何新闻';

        return(
            <Card class="topNewsList">
                <ul>
                    {newsList}
                </ul>
            </Card>
        )
    }
}

