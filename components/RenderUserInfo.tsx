import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { getHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  selectAvatarById,
  selectHouseholdUserById
} from "../store/user/userSelector";

interface Props {
  onClick: () => void;
}

const RenderUserInfo = ({ onClick }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const userData = useAppSelector(selectHouseholdUserById(user.id));
  const avatarEmojiToRender = useAppSelector(selectAvatarById(userData?.avatarId));

  const activeHouseholdId = useAppSelector(
    (state) => state.household.activeHouseholdId
  );

  useEffect(() => {
    dispatch(getHouseholdUserAction(activeHouseholdId));
  }, [activeHouseholdId]);

  return (
    <TouchableOpacity onPress={onClick} style={styles.root}>
      <Text style={styles.text}>
      {avatarEmojiToRender?.avatar}   {userData?.name}   
      </Text>
    </TouchableOpacity>
  );
};
export default RenderUserInfo;

const styles = StyleSheet.create({
  root: {

    justifyContent: "center",
    alignSelf: "center",
    borderColor: "#fff",
    borderRadius: 25,
    borderWidth: 3, 
    margin: 10,
  },
  text: {
    flexWrap: "wrap",
    fontSize: 20,
    padding: 12,
    fontWeight: "300",
  },
});
