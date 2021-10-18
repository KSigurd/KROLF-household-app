import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create(
    {
        root: {
            flex: 1,
            padding: 16,
            alignItems: 'center'
        },
        fullscreenButton: {
            width: "100%",
            height: 60,
            justifyContent: 'center',
            alignItems: "center",
            marginTop: 8,
            marginBottom: 8,
        },
        buttonInnerContainer: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20
        },
        choresButtonTitle: {
            textAlign: "left",
        },
        choresButtonAdditions: {
            textAlign: "right",
        },
        buttonText: {
            fontSize: 18,
            textAlign: "center",
        },
        repeatabilityCircle: {
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            elevation: 4,
        },
        buttonOutlined: {
            borderStyle: "solid",
            borderRadius: 10,
            elevation: 4
        },
        isLateBackground: {
            backgroundColor: "#CD5D6F"
        },
        isNotLateBackground: {
            backgroundColor: "#F2F2F2"
        },
        isLateText: {
            fontSize: 18,
            color: "white"
        },
        isNotLateText: {
            fontSize: 18,
            color: "black"
        }
    }
)