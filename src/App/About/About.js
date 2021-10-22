import NavbarSecondary from 'shared/NavbarSecondary';
import door from 'assets/images/door.jpg';
import { Link, useHistory } from 'react-router-dom';

import { GiChickenLeg, GiGraduateCap } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterSquare,
    AiFillLinkedin,
} from 'react-icons/ai';

import miguel from 'assets/images/miguel.jpg';
import charles from 'assets/images/charles.jpg';
import carlo from 'assets/images/carlo.jpg';

const About = () => {
    const history = useHistory();

    const shopButtonClick = () => {
        history.push('/shop');
    };
    return (
        <div className='about'>
            <NavbarSecondary />
            <header>
                <img src={door} alt='door with keys' />
                <h1>Be The Key To Others' Success</h1>
            </header>
            <div className='mission'>
                <h2>Mission</h2>
                <p>
                    Our mission is to alleviate poverty by helping feed and
                    develop children in poor areas in the Philippines.
                </p>
            </div>
            <div className='cta'>
                <p>
                    For every purchase you make, 6% of the net profit goes to
                    the pool of funds dedictated to helping feed and educate
                    children in poor areas in the Philippines.
                </p>
                <button onClick={shopButtonClick}>Shop Now</button>
            </div>
            <div className='allocation'>
                <h2>How Funds Are Allocated</h2>
                <ul className='allocation__list'>
                    <li className='allocation__item'>
                        <div className='icon'>
                            <GiChickenLeg />
                        </div>
                        <p className='description'>
                            It’s a known fact that food wins wars. Kids as well
                            need food to develop themselves into promising
                            adults. We at Auxilium help by providing kids with
                            food at regular intervals.
                        </p>
                    </li>
                    <li className='allocation__item'>
                        <div className='icon'>
                            <GiGraduateCap />
                        </div>
                        <p className='description'>
                            Education advances the nation. The more the kids
                            know about the world around them the better their
                            decisions they’ll make. Thus, we give attention to
                            the children’s education.
                        </p>
                    </li>
                    <li className='allocation__item'>
                        <div className='icon'>
                            <FaHome />
                        </div>
                        <p className='description'>
                            It is hard to survive without a home. So, we
                            semi-annually fix the home of somebody in need.
                        </p>
                    </li>
                </ul>
            </div>
            <div className='team'>
                <h2>The Team</h2>
                <p className='caption'>
                    This endeavor is made possible by these people who worked
                    hard to research, design, and code with passion.
                </p>
                <div className='member'>
                    <img src={miguel} alt='miguel' />
                    <div className='member__description'>
                        <h3>Miguel De Leon</h3>
                        <h4>Lead Designer & Front-End Developer</h4>
                        <p>
                            Responsible for making the website look modern and
                            human-centric.
                        </p>
                    </div>
                </div>
                <div className='member'>
                    <img src={charles} alt='charles' />
                    <div className='member__description'>
                        <h3>Charles Arriola</h3>
                        <h4>Tester & State Management</h4>
                        <p>
                            Managed the states using redux and tested the
                            website such that it is error-free.
                        </p>
                    </div>
                </div>
                <div className='member'>
                    <img src={carlo} alt='carlo' />
                    <div className='member__description'>
                        <h3>John Carlo Caraan</h3>
                        <h4>Team Leader & Back-end Developer</h4>
                        <p>
                            Organized the team and made the website functional.
                        </p>
                    </div>
                </div>
            </div>
            <div className='socials'>
                <h2>Follow Us</h2>
                <ul className='socials__links'>
                    <li>
                        <Link
                            to={{ pathname: 'https://www.facebook.com/' }}
                            target='_blank'
                        >
                            <AiFillFacebook />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={{ pathname: 'https://www.instagram.com/' }}
                            target='_blank'
                        >
                            <AiFillInstagram />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={{ pathname: 'https://twitter.com/?lang=en' }}
                            target='_blank'
                        >
                            <AiFillTwitterSquare />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={{ pathname: 'https://www.linkedin.com/' }}
                            target='_blank'
                        >
                            <AiFillLinkedin />
                        </Link>
                    </li>
                </ul>
            </div>
            <footer>Copyright &copy; 2021 Auxilium. All Rights Reserved</footer>
        </div>
    );
};

export default About;
