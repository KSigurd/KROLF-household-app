import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import EditHouseholdModal from "../components/EditHouseholdModal";
import HouseholdSurface from "../components/HouseholdSurface";
import { Household } from "../interfaces/households";
import { setActiveHousholdAction, updateHouseholdAction } from "../store/household/householdSlice";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import { isUserAdmin } from "../store/householdUser/householdUserSelectors";
import LogoutButton from "../components/LogoutButton";
import BigThemedButton from "../components/BigThemedButton";
import { getHouseholdUserForLoggedInUserAction } from "../store/householdUser/householdUserSlice";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ChoresStatisticsNavigator"
>;

const ProfileScreen = ({ navigation }: Props) => {
  const [visible, setVisible] = useState(false);
  const [householdToEdit, setHouseholdToEdit] = useState({} as Household);
  const dispatch = useAppDispatch();
  const databaseHouseholds = useAppSelector(
    (state) => state.household.households
  );

  const user = useAppSelector((state) => state.user.user);

  const setHousholdAndNavigate = async (householdId: string) => {
    await dispatch(setActiveHousholdAction(householdId));
    navigation.navigate("ChoresStatisticsNavigator");
  };

  useEffect(() => {
    async () => {
      await dispatch(getHouseholdUserForLoggedInUserAction(user.id));
    }
  }, [databaseHouseholds])

  const householdUsersForLoggedInUser = useAppSelector(
    (state) => state.householdUser.householdUsersForLoggedInUser
  );

  const showModal = (household: Household) => {
    setHouseholdToEdit(household);
    setVisible(true);
  };

  const onSubmit = async (householdToUpdate?: Household) => {
    setVisible(false);
    // if(householdToUpdate) {
    //   console.log(householdToUpdate, "household")
    //   await dispatch(updateHouseholdAction(householdToUpdate));
    // }
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalStyle}
        >
          <EditHouseholdModal household={householdToEdit} onSubmit={onSubmit} />
        </Modal>
      </Portal>
      <Portal.Host>
        <View style={styles.root}>
            <Text style={styles.title}>Välj hushåll:</Text>
          <ScrollView>
            {databaseHouseholds.map((prop, key) => {
              return (
              
                <HouseholdSurface
                  key={key}
                  householdObject={prop}
                  isAdmin={isUserAdmin(prop.id, householdUsersForLoggedInUser)}
                  showModal={showModal}
                  onChange={(householdId) => {
                    setHousholdAndNavigate(householdId);
                  }}
                  />
                 
              );
            })}
          </ScrollView>
            <LogoutButton onClick={() => navigation.replace("Login")} />

          <View style={styles.NPbuttonRoot}>
            <BigThemedButton
              typeOfIcon="plus-circle-outline"
              buttonText="Lägg till"
              onPress={() => navigation.navigate("CreateHousehold")}
            />
            <BigThemedButton
              typeOfIcon="account-plus-outline"
              buttonText="Gå med"
              onPress={() => navigation.navigate("JoinHousehold")}
            />
          </View>
        </View>
      </Portal.Host>
    </Provider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "space-between",
  },
  NPbuttonRoot: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 20,
  },
  modalStyle: {
      height: "50%",
  }
});
