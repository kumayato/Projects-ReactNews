import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

import PCIndex from './components/pc_index';
import PCNewsDetails from  "./components/pc_news_details";

import MobileIndex from './components/mobile_index';
import MobileNewsDetails from "./components/mobile_news_details";

import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from  './components/mobile_usercenter';

/* path="/details/:uniquekey" :uniquekey用于传递参数。
 对应的子页面接收参数this.props.params.uniquekey*/
export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" components={PCIndex}></Route>
                        <Route path="/details/:uniquekey" components={PCNewsDetails}></Route>
                        <Route path="/usercenter" components={PCUserCenter}></Route>
                    </Router>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" components={MobileIndex}></Route>
                        <Route path="/details/:uniquekey" components={MobileNewsDetails}></Route>
						<Route path="/usercenter" component={MobileUserCenter}></Route>
                    </Router>
				</MediaQuery>
			</div>
		);
	};
}

ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
