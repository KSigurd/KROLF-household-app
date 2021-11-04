import { FC, useEffect, useState } from "react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";
import { resetErrorAction } from "../store/globalActions";

const ErrorDialog: FC = (props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const choreState = useAppSelector((state) => state.chore);
  const completedChoreState = useAppSelector((state) => state.completedChore);
  const householdState = useAppSelector((state) => state.household);
  const householdUserState = useAppSelector((state) => state.householdUser);

  const resetErrors = () => {
    dispatch(resetErrorAction());
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
    resetErrors();
  };

  useEffect(() => {
    if (
      userState.error ||
      choreState.error ||
      completedChoreState.error ||
      householdState.error ||
      householdUserState.error
    ) {
      showDialog();
    }
  }, [
    userState.error,
    choreState.error,
    completedChoreState.error,
    householdState.error,
    householdUserState.error,
  ]);

  const getError = () => {
    if (userState.error) return userState.error;
    if (choreState.error) return choreState.error;
    if (completedChoreState.error) return completedChoreState.error;
    if (householdState.error) return householdState.error;
    if (householdUserState.error) return householdUserState.error;
  };

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title>Ooops!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{getError()}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok!</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal.Host>{props.children}</Portal.Host>
    </Provider>
  );
};

export default ErrorDialog;
