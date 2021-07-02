import StandartFooter from "../Components/StandartFooter";
import StandartHeader from "../Components/StandartHeader";
import logo from '../images/icons/CR-green-ico.svg';
import topImage from '../images/home_page/top_image.png';
import bottomImage from '../images/home_page/bottom_image.png';
import greenGradient from '../images/home_page/green-gradient.svg';
import pinkGradient from '../images/home_page/pink-gradient.svg';
import RoomItemTwo from'../Components/room/RoomItemTwo';


import '../css/home.css';
import useCookie from "../hooks/CookiesHook";

function HomePage(params) {

    const auth = useCookie('oAuthToken');

    return (
        <>
            <StandartHeader authenticated={auth}/>
            <HomePageBody />
            <StandartFooter />
        </>
    )
}


function HomePageBody(params) {
    return (
        <div className='home-page__main'>
            <HomePageFistBlock />
            <HomePageSecondBlock />
            <HomePageThirdBlock />
        </div>
    )
}


function HomePageFistBlock(params) {
    return (
        <div className='home-page__first-block'>
            <div className='home-page-first-block__left'>
                <img src={logo} className='home-page__image' />
                <h2 className='home-page__title'>
                    The best code development platform
                </h2>
                <p className='home-page__subtitle'>
                    You can create your own room or participate in the development of public or private code of other developers. You can discover other rooms and get some interesting ideas from other developers
                </p>
            </div>
            <div className='home-page-first-block__right'>
                <div className='home-page-first-block__images-block'>
                    <img src={topImage} className='home-page-first-block__top-image' />
                    <img src={bottomImage} className='home-page-first-block__bottom-image' />
                </div>
            </div>
            <img src={greenGradient} className='home-page-fifst-block__numbers' />
        </div>
    );
}

function HomePageSecondBlock(params) {
    return (
        <div className='home-page__second-block'>
            <div className='home-page-second-block__left'>
                <div className='home-page-second-block__code-examples-block'>
                    <div className='home-page-second-block__code-item java-code-item'>
                        <p className='home-page-code-item__title'>
                            Java
                        </p>
                        <div className='home-page-code-item__code'>
                            <p>
                                <span className='java-code__key-word'>public </span>
                                <span>User </span>
                                <span className='java-code__method-name'>findUserByEmail</span>
                                <span>{'(String email) {'}</span>
                            </p>
                            <p className='java-code__level-2'>
                                <span className='java-code__key-word'>return </span>
                                <span className='java-code__object'>usersRepository</span>
                                <span>.findByEmail(email)</span>
                            </p>
                            <p className='java-code__level-3'>
                                <span>.orElse(</span>
                                <span className='java-code__key-word'>null</span>
                                <span>);</span>
                            </p>
                            <p>
                                <span>{'}'}</span>
                            </p>
                        </div>
                    </div>
                    <div className='home-page-second-block__code-item html-code-item'>
                        <p className='home-page-code-item__title'>
                            Html
                        </p>
                        <div className='home-page-code-item__code'>
                            <p>
                                <span>{'<'}</span>
                                <span className='html-code__tag'>div </span>
                                <span className='html-code__attr'> class</span>
                                <span>{'=”'}</span>
                                <span className='html-code__attr-value'>
                                    container
                            </span>
                                <span>{'”>'}</span>
                            </p>
                            <p className='html-code__level-2'>
                                <span>{'<'}</span>
                                <span className='html-code__tag'>div </span>
                                <span className='html-code__attr'> class</span>
                                <span>{'=”'}</span>
                                <span className='html-code__attr-value'>
                                    col-1
                            </span>
                                <span>{'”>'}</span>
                            </p>
                            <p className='html-code__level-3'>
                                <span>{'<'}</span>
                                <span className='html-code__tag'>img </span>
                                <span className='html-code__attr'> src</span>
                                <span>{'=”'}</span>
                                <span className='html-code__attr-value'>
                                    /assests/welcome.svg
                            </span>
                                <span>{'”>'}</span>
                            </p>
                            <p className='html-code__level-2'>
                                <span>{'</'}</span>
                                <span className='html-code__tag'>div</span>
                                <span>{'>'}</span>
                            </p>
                            <p>
                                <span>{'</'}</span>
                                <span className='html-code__tag'>div</span>
                                <span>{'>'}</span>
                            </p>
                        </div>
                    </div>
                    <div className='home-page-second-block__code-item python-code-item'>
                        <p className='home-page-code-item__title'>
                            Python
                        </p>
                        <div className='home-page-code-item__code'>
                            <p>
                                <span className='python-code__key-word'>def </span>
                                <span className='python-code__method-name'>find_despersion</span>
                                <span>(x:</span>
                                <span className='python-code__key-word'>dict</span>
                                <span>{') -> '}</span>
                                <span className='python-code__key-word'>float</span>
                                <span>:</span>
                            </p>
                            <p className='python-code__level-2'>
                                <span>s = 0</span>
                            </p>
                            <p className='python-code__level-2'>
                                <span className='python-code__key-word'>for </span>
                                <span>(x, p) </span>
                                <span className='python-code__key-word'>in </span>
                                <span>x.items():</span>
                            </p>
                            <p className='python-code__level-3'>
                                <span>s += x * p</span>
                            </p>
                        </div>
                    </div>
                </div>
                <img src={pinkGradient} className='home-page-second-block__numbers' />
            </div>
            <div className='home-page-second-block__right'>
                <h2 className='home-page__title'>
                    Write you code right here on your fawourite languages
                </h2>
                <p className='home-page__subtitle'>
                    Coderoom provides online editors for code development right on the site. Html or css, spring or django - it doesn't matter. Start programming right now, assemble a team or program yourself, climb the rating of programmers.
                </p>
            </div>
        </div>
    )
}

function HomePageThirdBlock(params) {

    const user = {
        name: 'Nicolas',
        surname: 'Neuer'
    }

    return (
        <div className='home-page__third-block'>
            <p className='home-page__title'>
                Start right now!
            </p>
            <div className='home-page-third-block__content'>
                <div className='home-page-third-block__left'>
                    <RoomItemTwo user={user} data={{title: 'My first room!'}}/>
                </div>
                <div className='home-page-third-block__right'>
                    <div className='home-page-third-block__create'>
                        create room
                    </div>
                    <div className='home-page-third-block__create'>
                        create editor
                    </div>
                </div>
            </div>
            <div className='home-page-third-block__learn-more'>
                learn more
            </div>
        </div>
    )
}

export default HomePage;