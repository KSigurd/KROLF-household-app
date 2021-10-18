import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text } from "react-native";
import ChoreButton from "../components/ChoreButton";
import { households } from "../data/mockHouseholdData";
import { RootStackParamList } from "../navigation/RootNavigator";
import { styles } from "../styles/styles";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const household = households[2];

const ChoresScreen: FC<Props> = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      {household.chores.map((prop, key) => {
        return (
          <ChoreButton
            key={key}
            buttonText={prop.title}
            completedBy={household.users.filter(
              (user) =>
                user.choresDone.filter((chore) => chore.choreId === prop.id)
                  .length
            )}
            daysSinceLast={String(7)}
            isLate={false}
          />
        );
      })}
    </View>
  );
};

export default ChoresScreen;
