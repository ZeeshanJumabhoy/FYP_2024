import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const Header = () => {
  return (
    <Sidebar>
      <Menu>
        <SubMenu label="Charts">
          <MenuItem>Pie charts</MenuItem>
          <MenuItem>Line charts</MenuItem>
        </SubMenu>
        <MenuItem>Documentation</MenuItem>
        <MenuItem>Calendar</MenuItem>
        <SubMenu label="Charts">
          <MenuItem>Pie charts</MenuItem>
          <MenuItem>Line charts</MenuItem>
        </SubMenu>
        <MenuItem>Documentation</MenuItem>
        <MenuItem>Calendar</MenuItem>
        <SubMenu label="Charts">
          <MenuItem>Pie charts</MenuItem>
          <MenuItem>Line charts</MenuItem>
        </SubMenu>
        <MenuItem>Documentation</MenuItem>
        <MenuItem>Calendar</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Header;
