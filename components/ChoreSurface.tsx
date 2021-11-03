// import React, { FC } from "react";
// import { Surface, Text, Title, TouchableRipple } from "react-native-paper";
// import { HouseholdUser } from "../interfaces/households";
// import { styles } from "../styles/styles";

// interface Props {
//   buttonText: string;
//   completedBy: HouseholdUser[];
//   daysSinceLast: string;
//   isLate: boolean;
// }

// const ChoreButton: FC<Props> = (props: Props) => {
//   return (
//     <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
//       <TouchableRipple
//         borderless={true}
//         style={styles.fillParent}
//         onPress={() => {}} //TODO
//       >
//         <Surface style={styles.buttonInnerContainer}>
//           <Title style={[styles.choresButtonTitle, styles.buttonText]}>
//             {props.buttonText}
//           </Title>
//           {props.completedBy.length ? (
//             <Text style={[styles.buttonText, styles.choresButtonAdditions]}>
//               {props.completedBy.map((user) => user.avatar.avatar)}
//             </Text>
//           ) : (
//             <Surface
//               style={[
//                 styles.repeatabilityCircle,
//                 props.isLate
//                   ? styles.isLateBackground
//                   : styles.isNotLateBackground,
//               ]}
//             >
//               <Text
//                 style={props.isLate ? styles.isLateText : styles.isNotLateText}
//               >
//                 {props.daysSinceLast}
//               </Text>
//             </Surface>
//           )}
//         </Surface>
//       </TouchableRipple>
//     </Surface>
//   );
// };

// export default ChoreButton;

import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { avatars } from "../data/avatarData";
import { HouseholdUser } from "../interfaces/householdUser";
import { selectChoreById } from "../store/chore/choreSelectors";
import { getChoresAction, removeChoreAction } from "../store/chore/choreSlice";
import { getCompletedChoresAction } from "../store/completedChore/completedChoreSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { styles } from "../styles/styles";
import SmallIconButton from "./SmallIconButton";

interface Props {
  choreId: string;
  isEditPressed: boolean;
  navigation: any;
  completedBy: HouseholdUser[];
}

const ChoreSurface = ({ navigation, choreId, isEditPressed, completedBy }: Props) => {
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const chore = useAppSelector(selectChoreById(choreId));

  if (!chore) return null;

  //When pressing on delete (trash bin) button
  const removeChore = async (choreId: string) => {
    await dispatch(removeChoreAction(choreId));
    await dispatch(getChoresAction(activeHouseholdState));
    await dispatch(getCompletedChoresAction(activeHouseholdState));
  };

  return (
    <View>
      <Surface style={stylesLocal.surface}>
        <TouchableRipple
          borderless={true}
          style={stylesLocal.chip}
          onPress={() => {
            navigation.navigate("ChoreDescriptionModalScreen", choreId);
          }}
        >
          <Text style={stylesLocal.surfaceText}>{chore.title}</Text>
        </TouchableRipple>
        <View>
        {completedBy.length ? (
            <Text style={[styles.buttonText, styles.choresButtonAdditions]}>
              {completedBy.map(user => {
                return avatars.find(avatar => avatar.id = user.avatarId)?.avatar
              })}
                {/* { avatars.map(avatar => {
                  const result = completedBy.find(user => user.avatarId = avatar.id)
                  if(result) return (result)
                
                })} */}
            </Text>
          ) : (
            <Surface
              style={[
                styles.repeatabilityCircle,
                isLate
                  ? styles.isLateBackground
                  : styles.isNotLateBackground,
              ]}
            >
              <Text
                style={isLate ? styles.isLateText : styles.isNotLateText}
              >
                {daysSinceLast}
              </Text>
            </Surface>
        </View>
        {isEditPressed ? (
          <View style={stylesLocal.editContainer}>
            <SmallIconButton
              typeOfIcon="pencil-outline"
              onPress={() =>
                navigation.navigate("EditChoreModalScreen", choreId)
              }
            />
            <SmallIconButton
              typeOfIcon="delete-outline"
              onPress={() => removeChore(chore.id)}
            />
          </View>
        ) : null}
      </Surface>
    </View>
  );
};

export default ChoreSurface;

const stylesLocal = StyleSheet.create({
  surface: {
    height: "auto",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    elevation: 4,
    marginVertical: 5,
  },
  surfaceText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  chip: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 4,
  },
});
