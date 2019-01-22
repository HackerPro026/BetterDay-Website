import React from "react";
import {Menu} from "semantic-ui-react";

export default class NavBar extends React.Component {
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
            </Menu>
        );
    }
}