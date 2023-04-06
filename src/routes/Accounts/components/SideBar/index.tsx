import React from "react";
import { useLocation } from "react-router-dom";
import { List, ListLink, Text } from "./styled";

interface Props {}

export const SideBar: React.FC<Props> = () => {
  const location = useLocation();
  return (
    <List>
      <li>
        <ListLink
          to={"/accounts/edit/"}
          selected={location.pathname === "/accounts/edit/"}
        >
          <Text>Edit Profile</Text>
        </ListLink>
      </li>
      <li>
        <ListLink
          to={"/accounts/password/change/"}
          selected={location.pathname === "/accounts/password/change/"}
        >
          <Text>Change Password</Text>
        </ListLink>
      </li>
      <li>
        <ListLink
          to={"/accounts/privacy_and_security/"}
          selected={location.pathname === "/accounts/privacy_and_security/"}
        >
          <Text>Privacy and Security</Text>
        </ListLink>
      </li>
    </List>
  );
};
