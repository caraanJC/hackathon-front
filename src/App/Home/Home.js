import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const changeDirectory = (e) => {
        history.push(`/${e.target.name}`);
    };

    return (
        <div className='home'>
            <header>
                <h1>Auxilium</h1>
                <h2>Help Others by Ordering</h2>
                <p>
                    For every purchase you make, 6% of the net profit goes to
                    feeding kids in rural areas in the Philippines. Some of the
                    funds goes to school supplies and gadgets used for online
                    school.
                </p>
                <div>
                    <button onClick={changeDirectory} name='shop'>
                        Shop Now
                    </button>
                    <button onClick={changeDirectory} name='about'>
                        Learn More
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Home;
