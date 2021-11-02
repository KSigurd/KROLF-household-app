import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { getHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  selectAvatarById,
  selectHouseholdUserById,
} from "../store/user/userSelector";

interface Props {
  onClick: () => void;
}

const RenderUserInfo = ({ onClick }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const activeHouseholdId = useAppSelector(
    (state) => state.household.activeHouseholdId
  );

  useEffect(() => {
    dispatch(getHouseholdUserAction(activeHouseholdId));
  }, [activeHouseholdId]);

  const userData = useAppSelector(selectHouseholdUserById(user.id));

  const avatarEmojiToRender = useAppSelector(selectAvatarById(userData?.avatarId));

  return (
    <TouchableOpacity onPress={onClick} style={styles.enklass}>
      <Text style={styles.text}>
        {userData?.name} {avatarEmojiToRender?.avatar}
      </Text>
    </TouchableOpacity>
  );
};
export default RenderUserInfo;

const styles = StyleSheet.create({
  enklass: {
    backgroundColor: "pink",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
});
