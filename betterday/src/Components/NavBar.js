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
                 
            <Menu.Item
                name='Q and A'
                active={activeItem === ''}
                onClick={
                    () => {
                        document.location.href = "/Q&A";
                    }
                }
            >
                Q&amp;A
            </Menu.Item>
            <Menu.Item
                name="History"
                active={activeItem === ''}
                onClick={
                    () => {
                        document.location.href = "/hist"
                    }
                }
            >
            History
            </Menu.Item>
            <Menu.Item
                name="Pricing"
                active={activeItem === ''}
                onClick={
                    () => {
                        document.location.href = "/price"
                    }
                }
            >
            Pricing
            </Menu.Item>

        <Menu.Menu position='right'>
                <Menu.Item
                active={true}
                color="violet"
                name='callHelp'
                href="/help"
                >

                Call Mental Health Agencies
                </Menu.Item>
                             
          {this.props.signedIn ? 
            <Menu.Item
                active={true}
                color="red"
                name='signout'
                onClick={
                    () => {
                        this.props.firebase.auth().signOut().then(() => {
                            window.location.href = "/";
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
                    Sign In:&ensp;<Icon name="sign in" />
                </Menu.Item>
                
                
            }
            </Menu.Menu>
            </Menu>
        );
    }
}
    