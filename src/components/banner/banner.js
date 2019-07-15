import React, { Fragment } from 'react';
import Header from './_header/header';
import Button from '../useables/button';
import caret from '../../assets/img/down-icon.png';
import './banner.css';

const banner = () => (

    <div className="banner-content" id="home">
        <div className="layer">
            <Header />
            <div class="container text-center" style={{ width: "100%" }}>
                {/* <!-- /banner --> */}
                <div className="banner-info-top">
                    <h3>Keep track of development projects near you</h3>
                </div>
                <div className="banner-info-bottom">
                    <p>The Sela Platform enables stakeholders share real time information on the state of infrastructure projects to ensure transparent delivery</p>
                </div>
                <Button btnStyle="banner-btn">
                    SEE PROJECTS
                </Button>
                <div className="bounce">
                    <img src={caret} />
                </div>

            </div>
        </div>
        {/* <!-- //banner --> */}
    </div>
);

export default banner;