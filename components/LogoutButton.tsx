import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import { User } from "../interfaces/user";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutUserAction } from "../store/user/userSlice";

interface Props {
  onClick: () => void;
}

const LogoutButton = ({ onClick }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const activeUserState = useAppSelector((state) => state.user);
  const logoutUser = async (user: User) => {
    activeUserState.loggedIn = false;
    await dispatch(logoutUserAction(user)).then(() => {
      onClick();
    });
  };

  return (
    <NPbutton
      icon="logout"
      color="black"
      style={styles.logOutButton}
      onPress={() => logoutUser(user.user)}
    >
      <Text style={{fontWeight: "bold"}}>Logout</Text>
    </NPbutton>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  NPbutton: {
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: 10
  },
  logOutButton: {
    backgroundColor: "white",
    padding: 5,
    marginBottom: 15,
    marginTop: 8,
    borderRadius: 10,
    elevation: 4,
  },
});
