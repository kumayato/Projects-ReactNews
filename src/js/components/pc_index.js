/**
 * Created by Administrator on 2017/5/8 0008.
 */
import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PcNewsContainer from  './pc_newsContainer';

export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader/>
                <PcNewsContainer/>
                <PCFooter/>
            </div>
        );
    };
}

