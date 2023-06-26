import { StyleSheet } from "react-native";

export default StyleSheet.create({
    openButton: {
        backgroundColor: "#444",
        borderRadius: 1000,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    openButtonText: {
        color: "#fff",
    },
    modalOuter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000ca",
    },
    modal: {
        width: "90%",
        height: "90%",
        gap: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 16,
        backgroundColor: "#fff",
        padding: 10,
    },
    search: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 8,
    },
    flatlist: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#222",
        borderRadius: 10,
    },
    flatlistContainer: {},
    itemStyle: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    iconStyle: {
        color: "#000",
        fontSize: 20,
    },
    labelStyle: {
        flex: 1,
        color: "#222",
        fontSize: 18,
        textAlign: "left",
    },
    selectedView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    selectedViewText: {
        color: "#000",
        fontSize: 16,
    },
    selectedView2: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    selectedVal: {
        borderRadius: 1000,
        backgroundColor: "#444",
        color: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    barStyle: {
        height: 1,
        backgroundColor: "#000",
        flex: 1,
    },
    closeBtn: {
        borderRadius: 8,
        backgroundColor: "#444",
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignSelf: "center",
    },
    closeBtnText: {
        color: "#fff",
        fontSize: 16,
    },
});
