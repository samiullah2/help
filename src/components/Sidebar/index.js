import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="/recipe-finder">
                    Recipe Finder
                </SidebarLink>
                <SidebarLink to="/meal-generator">
                    Meal Generator
                </SidebarLink>
                <SidebarLink to="/shoppinglist">
                    Groceries
                </SidebarLink>
                <SidebarLink to="/account">
                    Account
                </SidebarLink>    
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to="/sign-in">Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar