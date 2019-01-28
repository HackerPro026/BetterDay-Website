import React from "react";
import {Menu, Icon} from "semantic-ui-react";
import user from "../App.js"

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {signedIn: ""}

        if(user){
            this.state.signedIn = true
        }else if(!user){
            this.state.signedIn = false
        }
    }
    render(){
        const activeItem = window.location.pathname.replace(/[\\\/][^\\\/]*$/, '');
        return (
            <Menu inverted>
                <Menu.Item
                    name='home'
                    active={activeItem === ''}
                    onClick={
                        () => {
                            document.location.href = "/";
                        }
                    }
                >
                    Home
                </Menu.Item>
            {this.state.signedIn ? 
                <Menu.Item
                active={true}
                color="green"
                name="sign in"
                >
                    <Icon name="sign in" />
                </Menu.Item>
                :
                <Menu.Item
                    active={true}
                    color="red"
                    name='signout'
                    onClick={
                        () => {
                            this.props.firebase.auth().signOut().then(() => {
                                window.location.reload();
                            });
                        }
                    }   
                >
                    <Icon name='sign out' />
                </Menu.Item>
                }
            </Menu>
        );
    }
}