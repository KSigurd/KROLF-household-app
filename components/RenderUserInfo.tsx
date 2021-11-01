import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { getHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectAvatarById, selectHouseholdUserById } from "../store/user/userSelector";

interface Props{
onClick: () => void;
}

const RenderUserInfo = ({ onClick }: Props) => {
      const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const activeHouseholdId = useAppSelector(
      (state) => state.household.activeHouseholdId
  );
  dispatch(getHouseholdUserAction(activeHouseholdId));

  const userData = useAppSelector(selectHouseholdUserById(user.id));

const avatar = userData?.avatarId

let avatarEmoji = ""
if(avatar) {
    avatarEmoji = avatar
}
  const avatarEmojiToRender = useAppSelector(selectAvatarById(avatarEmoji));   

  return (
    <TouchableOpacity onPress= {onClick} style={styles.enklass}>
      <Text style={styles.text}>{userData?.name}  {avatarEmojiToRender?.avatar}</Text>
    </TouchableOpacity>

  );
};
export default RenderUserInfo;

const styles = StyleSheet.create({
  enklass: {
      backgroundColor: "pink",
      justifyContent: "center",
      alignSelf: "center"
  },
  text: {
      fontSize: 18,
      padding: 10
  }
});
