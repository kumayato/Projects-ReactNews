/**
 * Created by Administrator on 2017/5/16 0016.
 */
import React from "react";
import {Row, Col, BackTop} from 'antd';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCImageNewsBlock from  "./pc_news_image_block";
import CommonComments from "./common_comments";

export default class PCNewsDetails extends React.Component {
    constructor(){
        super()
        this.state = {
            newsItem: ""
        };
    };

    // 组件结束时加载数据
    componentDidMount(){
        var myFetchOptions = {
            method : "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey,myFetchOptions)
            .then(response=>response.json())
            .then(json=>this.setState({ newsItem:json}));

        /*意味不明*/
        document.title = this.state.newsItem.title + ' - React News | React 驱动的新闻平台';

    }

    createMarkup(){
        return {__html : this.state.newsItem.pagecontent}
    }

    render(){
        return(
            <div id="PCNewsDetails">
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCImageNewsBlock count={42} type="guoji" cartTiele="国际头条" />
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter/>
                <BackTop/>
            </div>
        )
    }

}
