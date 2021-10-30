import { FC } from "react";
import React from "react";
import { useAppSelector } from "../store/store";
import {
  Button,
  Dialog,
  Paragraph,
  Provider,
} from "react-native-paper";

const ErrorDialog: FC = (props) => {
  let visible = false;
  const userState = useAppSelector((state) => state.user);
  const choreState = useAppSelector((state) => state.chore);
  const completedChoreState = useAppSelector((state) => state.completedChore);
  const householdState = useAppSelector((state) => state.household);
  const householdUserState = useAppSelector((state) => state.householdUser);

  const resetErrors = () => {
    userState.error = undefined;
    choreState.error = undefined;
    completedChoreState.error = undefined;
    householdState.error = undefined;
    householdUserState.error = undefined;
  };

  const showDialog = () => (visible = true);

  const hideDialog = () => {
    visible = false;
    resetErrors();
  };

  if (userState.error) {
    showDialog();
  }

  const getError = () => {
    if (userState.error) return userState.error;
    if (choreState.error) return choreState.error;
    if (completedChoreState.error) return completedChoreState.error;
    if (householdState.error) return householdState.error;
    if (householdUserState.error) return householdUserState.error;
  };

  return (
    <Provider>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Ooops!</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{getError()}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
      {props.children}
    </Provider>
  );
};

export default ErrorDialog;
