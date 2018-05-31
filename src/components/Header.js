import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import { loadState } from '../utils/StorageUtils';
import ProfilePicture from '../assets/images/profile1.jpg';
import DubaiPoliceLogo from '../assets/images/dubai-police.jpg';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    const path = browserHistory.getCurrentLocation().pathname;
    const activeHead = path.charAt(6) === 'h' ? 'Hotel' : 'Admin';
    this.onlineUser = loadState();
    this.state = {
      activeItem: activeHead,
      isDraweropen: false,
      itemName: '',
      itemslist: ['Overview Home'],
      open: false,
      showAll: false,
      showOnlyHotel: false,
      showOnlyRemote: false,
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleItemClick = (e, name) => {
    this.setState({ activeItem: name });
    // const path = this.routeMap(name);
    // browserHistory.push(`/home/${path}`);
  };


  handleDrawerClose() {
    this.setState({ isDraweropen: false });
  }


  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillMount() {

  }
  render() {
    const loggedUserName = 'Ahmed';

    const { activeItem } = this.state;
    console.log('activeItem', activeItem);
    return (
      <Menu
        pointing
        secondary
        size="massive"
        className="menu-header custom-header"
      >
        <Menu.Item
          name="Overview"
          widths={10}
          style={{ alignSelf: 'center', marginRight: '65px' }}
        >
          <img src={DubaiPoliceLogo} height="62px" width="72px" />
          <span style={{ paddingLeft: '10px', color:'white', fontWeight:'Bold' }}>Dubai Police</span>
        </Menu.Item>

        <Menu.Item
          position="right"
          style={{ paddingBottom: 0, marginRight: 30, cursor: 'pointer' }}
          onClick={this.handleClick}
        >
          <div style={{ display: 'flex', fontWeight: 'bold' }}>
            <div className="account" > <img alt="profile" height="42px" width="42px" src={ProfilePicture} /> </div>
            <div style={{ height: 'fit-content', marginTop: 10 }}>
              <div style={{ fontSize: 10 }}>Logged in as</div>
              <div>{loggedUserName}</div>
            </div>
          </div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem primaryText="Profile" onClick={() => { this.setState({ open: false }); }} />
            <MenuItem primaryText="Logout" />

          </Popover>
        </Menu.Item>
      </Menu>
    );
  }
}

export default HeaderMenu;
