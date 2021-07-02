import React from 'react';
import StandartFooter from '../Components/StandartFooter'
import StandartHeader from '../Components/StandartHeader';
import RoomItem from '../Components/RoomItem';
import '../css/account.css';
import axios from 'axios';
import cookies from '../cookies/Cookies';
import EditorItem from '../Components/room/RoomItemTwo';

class AccountPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: '',
                surname: '',
                nickname: '',
                workspaces: [],
                webWorkspaces: [],
                rooms: []
            },
            token: '',
            selectedImage: null
        }
        this.history = props.history;
        this.setUser = this.setUser.bind(this);
        this.noAuthorities = this.noAuthorities.bind(this);
    }

    setUser(data) {
        console.log(data)
        this.setState({ user: data });
    }

    noAuthorities() {
        this.history.push('/login');
    }

    componentDidMount() {
        const authToken = cookies.get('oAuthToken');
        this.setState({ token: authToken });

        const headers = {
            Authorization: authToken
        }

        axios.get('http://localhost:8080/api/v.1/account', { headers })
            .then(response => {
                this.setUser(response.data)
            })
        // .catch(this.noAuthorities);
    }

    imageSelectedHandler = event => {
        new Promise((resolve, reject) => {
            if (event.target.files[0] != null) {
                this.setState({
                    selectedImage: event.target.files[0]
                })
            }
            resolve();
        })
            .then(() => this.imageUploadHandler())
    }

    imageUploadHandler = () => {
        const formData = new FormData();
        formData.append('image', this.state.selectedImage, this.state.selectedImage.name);

        const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: this.state.token
        }

        axios.post('http://localhost:8080/api/v.1/upload/account/image', formData, { headers })
            .then((res) => {
                console.log(res.data);
                this.setState({ user: { ...this.state.user, image: res.data.image } })
            })
            .catch(e => console.log(e))
    }

    redirectToCreateRoomPage = () => {
        this.history.push('/create-room');
    }

    redirectToCreateEdtitorPage = () => {
        this.history.push('/create-editor');
    }

    render() {
        return (
            <React.Fragment>
                <StandartHeader authenticated={true} />
                <div className={'account-main'}>
                    <div className={'account-main__profile-section'}>
                        <div className={'account-profile-section'}>
                            <div className={'account-profile-section__header'} >
                                <img className={'account-profile-section__header-image'} />
                            </div>
                            <div className={'account-profile-section__info'}>
                                <span className={'account-profile-section__fio'}>
                                    {this.state.user.name} {this.state.user.surname}
                                </span>
                                <span className={'account-profile-section__nickname'}>
                                    {this.state.user.nickname}
                                </span>
                                <div className={'account-profile-section__profile-image-wrapper'} onClick={() => this.imageInput.click()}>
                                    {this.state.user.image == null ? '' :
                                        <img className={'account-profile-section__profile-image'}
                                            src={`http://localhost:8080/api/v.1/images/${this.state.user.image}`} />}
                                </div>
                                <input style={{ display: 'none' }} type='file'
                                    onChange={this.imageSelectedHandler}
                                    ref={imageInput => this.imageInput = imageInput} />
                            </div>
                        </div>
                    </div>
                    <div className={'account-main__items-section'}>
                        <p className={'account-items-section__title'}>
                            Your rooms
                        </p>
                        <div className={'account-items-section__loyaut'}>
                            {this.state.user.rooms.map(room => <RoomItem
                                user={this.state.user}
                                data={room}
                            />)}
                            <div onClick={() => this.redirectToCreateRoomPage()}
                                className='create-room-builder__add-editor-wrapper account-items__add-editor-wrapper'>
                                <div className='create-room-builder__add-editor'>
                                    add room
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'account-main__items-section'}>
                        <p className={'account-items-section__title'}>
                            Your editors
                        </p>
                        <div className={'account-items-section__loyaut'}>
                            {this.state.user.workspaces.map(workspace => <EditorItem
                                user={this.state.user}
                                data={workspace}
                                url={'/workspace'}
                            />)}
                            {this.state.user.webWorkspaces.map(workspace => <EditorItem
                                user={this.state.user}
                                data={workspace}
                                url={'/web-workspace'}
                            />)}
                            <div onClick={() => this.redirectToCreateEdtitorPage()}
                                className='create-room-builder__add-editor-wrapper account-items__add-editor-wrapper'>
                                <div className='create-room-builder__add-editor'>
                                    add editor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <StandartFooter />
            </React.Fragment>
        )
    }
}

export default AccountPage;