import React from "react";
import {Menu, Icon} from "semantic-ui-react";
import betterdaylogo from "./betterdaylogo.png";

export default class NavBar extends React.Component {

    //Don't USE STATE for this! Just have a prop passed in and change this.state.signedIn to this.props.signedIn
    //I know you're gonna interperet this wrong, but you HAVE TO PASS IN A PROP
    //      <NavBar signedIn={this.state.username != ""} />
    //      There
            //Good luck lol

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
                    <img src={betterdaylogo} width ="120px" />
                </Menu.Item>
            
            <Menu.Menu position='right'>

          {this.props.signedIn ? 
            <Menu.Item
                active={true}
                color="red"
                name='signout'
                onClick={
                    () => {
                        this.props.firebase.auth().signOut().then(() => {
                            window.location.href = "";
                        });
                    }
                }
                >
                    Logout:&ensp;<Icon name='sign out' />
                </Menu.Item>
                :
                <Menu.Item
                    active={true}
                    color="green"
                    name="sign in"
                    onClick={
                        () => {
                            document.location.href = "/auth";
                        }
                    }
                > 
                    <Icon name="sign in" />
                </Menu.Item>
                
            }
            </Menu.Menu>
            </Menu>
        );
    }
}
    