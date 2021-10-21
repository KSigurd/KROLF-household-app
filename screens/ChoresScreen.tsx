import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import ChoreButton from "../components/ChoreButton";
import { chores } from "../data/mockChoresData";
import { households } from "../data/mockHouseholdData";
import { RootStackParamList } from "../navigation/RootNavigator";
import { styles } from "../styles/styles";

// import { useAppSelector } from "../store/store";

// type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

// export const selectChores = (state: RootState) => {
//   // const result = state.chore.chores.filter();
//   // if {} else {}
//   // return chores;
// }

//const ChoresScreen = ({navigation}: Props) => {
  // const chores = useAppSelector(selectChores)


  
  
  type Props = NativeStackScreenProps<RootStackParamList, "Profile">;
  
  const household = households[2];
  
  const ChoresScreen: FC<Props> = ({ navigation }: Props) => {


  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={styles.root}>
      {/* {household.chores.map((prop, key) => {
        return (
          <ChoreButton  //TODO: Move this props-logic somewhere else
            key={key}
            buttonText={prop.title}
            completedBy={users.filter(
              (user) =>
                user.choresDone.filter((chore) => chore.choreId === prop.id)
                  .length
            )}
            daysSinceLast={String(7)}
            isLate={false}
          />
        );
      })} */}

      {/* <CreateChore setVisibleModal= {(isVisible)} /> */}

      <View style={styles.bottomButtonRow}>
        <Button
          icon="plus-circle-outline"
          labelStyle={styles.buttonIconSize}
          color={"#000"}
          uppercase={false}
          style={styles.smallButton}
          onPress={() => navigation.navigate("CreateChoreModalScreen")} //TODO
        >
          <Text style={styles.buttonText}>Lägg till</Text>
        </Button>
        <Button
          icon="pencil-outline"
          labelStyle={styles.buttonIconSize}
          color={"#000"}
          uppercase={false}
          style={styles.smallButton}
          onPress={() => {}} //TODO
        >
          <Text style={styles.buttonText}>Ändra</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChoresScreen;
