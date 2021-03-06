/**
 * Created by Administrator on 2017/5/8 0008.
 */
import React from 'react';
import { Row, Col } from 'antd';

export default class MobileFooter extends React.Component {
    render(){
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='footer'>
                        &copy;&nbsp;2016 ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}
