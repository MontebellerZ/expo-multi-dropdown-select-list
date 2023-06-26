import React, { useMemo, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { IOptionLabel, MultiSelectListProps } from "../..";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

function ShowIcon({ marked }: { marked: boolean }) {
    return marked ? (
        <AntDesign name="checksquare" style={styles.iconStyle} />
    ) : (
        <AntDesign name="minussquareo" style={styles.iconStyle} />
    );
}

interface IMultiSelectItem {
    label: IOptionLabel;
    checked: boolean;
    onPress: (marked: boolean) => void;
    itemStyle?: ViewStyle;
    labelStyle?: ViewStyle;
}
function MultiSelectItem({
    label,
    checked,
    onPress,
    itemStyle = {},
    labelStyle = {},
}: IMultiSelectItem) {
    const [marked, setMarked] = useState(checked);

    const handleSelect = () => {
        onPress(!marked);
        setMarked(!marked);
    };

    return (
        <TouchableOpacity style={[styles.itemStyle, itemStyle]} onPress={handleSelect}>
            <ShowIcon marked={marked} />

            <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}

function MultiSelectList({
    options,
    value,
    onChange,
    openButtonText = "Select Option",
    openButtonStyle = {},
    openButtonTextStyle = {},
    closeButtonText = "Close",
    closeButtonStyle = {},
    itemStyle = {},
    labelStyle = {},
    modalStyle = {},
    selectedText = "Selected",
    selectedValueStyle = {},
    placeholder = "Search",
}: MultiSelectListProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(value);

    const handleSubmit = () => {
        onChange(selected);
    };

    const handleClose = () => {
        setShowModal(false);
        handleSubmit();
    };

    const handleOpen = () => {
        setShowModal(true);
    };

    return (
        <View>
            <TouchableOpacity style={[styles.openButton, openButtonStyle]} onPress={handleOpen}>
                <Text style={[styles.openButtonText, openButtonTextStyle]}>{openButtonText}</Text>
            </TouchableOpacity>

            <Modal
                animationType={"fade"}
                transparent={true}
                visible={showModal}
                onRequestClose={handleClose}
            >
                <View style={styles.modalOuter}>
                    <View style={[styles.modal, modalStyle]}>
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder={placeholder}
                            style={styles.search}
                        />

                        <FlatList
                            style={styles.flatlist}
                            contentContainerStyle={styles.flatlistContainer}
                            data={options.filter((opt) => opt.label.includes(search))}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item, index }) => {
                                const checked = selected.includes(item.value);

                                const onPress = () => {
                                    setSelected((selected) => {
                                        let copySelected: any[] = JSON.parse(
                                            JSON.stringify(selected)
                                        );

                                        copySelected.includes(item.value)
                                            ? copySelected.splice(index, 1)
                                            : copySelected.push(item.value);

                                        return copySelected;
                                    });
                                };

                                return (
                                    <MultiSelectItem
                                        label={item.label}
                                        checked={checked}
                                        onPress={onPress}
                                        itemStyle={itemStyle}
                                        labelStyle={labelStyle}
                                    />
                                );
                            }}
                        />

                        <View style={styles.selectedView}>
                            <Text style={styles.selectedViewText}>{selectedText}</Text>

                            <View style={styles.barStyle} />
                        </View>

                        <View style={styles.selectedView2}>
                            {selected.map((val) => (
                                <Text style={[styles.selectedVal, selectedValueStyle]}>{val}</Text>
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={handleClose}
                            style={[styles.closeBtn, closeButtonStyle]}
                        >
                            <Text style={styles.closeBtnText}>{closeButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default MultiSelectList;
