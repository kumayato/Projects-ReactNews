/**
 * Created by Administrator on 2017/5/15 0015.
 */
import React from 'react';
import {Row, Col, Carousel, Tabs} from 'antd';

import PCNewsBlock from './pc_news_block';
import PCImageNewsBlock from "./pc_news_image_block";
import PCProduct from  './pc_products'

const TabPane = Tabs.TabPane;

export default class PcNewsContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            autoplay: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1
        }

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={7}>
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            <PCImageNewsBlock count={6} type="guoji" width="400px" cartTiele="国际头条"/>
                        </div>
                    </Col>

                    <Col span={8}>
                        <Tabs class="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                                <PCNewsBlock count={24} type="top"/>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={24} type="guoji"/>
                            </TabPane>
                            <TabPane tab="国内" key="3">
                                <PCNewsBlock count={24} type="guonei"/>
                            </TabPane>
                            <TabPane tab="娱乐" key="4">
                                <PCNewsBlock count={24} type="yule"/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={5}>
                        <Tabs class="tabs_product">
                            <TabPane tab="ReactNews 产品" key="1">
                                <PCProduct/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className="PCImageNewsBlock-bottom">
                            <PCImageNewsBlock count={16} type="guonei" width="100%" cartTiele="国内新闻"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className="PCImageNewsBlock-bottom">
                            <PCImageNewsBlock count={16} type="yule" width="100%" cartTiele="娱乐新闻"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}