import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle,
    ScrollView,
} from "react-native";
import { IOptionLabel, MultiSelectListProps } from "../..";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

const MAX_OPTIONS_LENGTH = 100;
const MIN_SEARCH_LENGTH = 3;

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
    const handleSelect = () => {
        onPress(!checked);
    };

    return (
        <TouchableOpacity style={[styles.itemStyle, itemStyle]} onPress={handleSelect}>
            <ShowIcon marked={checked} />

            <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}

function MultiSelectList({
    options,
    value,
    onChange,
    openButtonContent = "Select Option",
    openButtonStyle = {},
    openButtonTextStyle = {},
    closeButtonContent = "Close",
    closeButtonStyle = {},
    closeButtonTextStyle = {},
    itemStyle = {},
    labelStyle = {},
    modalStyle = {},
    selectedText = "Selected",
    selectedValueStyle = {},
    placeholder = "Search",
    searchRequiredText = "Insert at least 3 characters in search field",
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

    const handleRemoveSelected = (position: number) => {
        setSelected((selected) => {
            const copySelected: typeof selected = JSON.parse(JSON.stringify(selected));
            copySelected.splice(position, 1);
            return copySelected;
        });
    };

    const handleAddSelected = (value: any) => {
        setSelected((selected) => {
            const copySelected: typeof selected = JSON.parse(JSON.stringify(selected));
            copySelected.push(value);
            copySelected.sort();
            return copySelected;
        });
    };

    const shouldSearch: boolean =
        options.length > MAX_OPTIONS_LENGTH && search.length < MIN_SEARCH_LENGTH;

    return (
        <View>
            <TouchableOpacity style={[styles.openButton, openButtonStyle]} onPress={handleOpen}>
                {typeof openButtonContent === "string" ? (
                    <Text style={[styles.openButtonText, openButtonTextStyle]}>
                        {openButtonContent}
                    </Text>
                ) : (
                    openButtonContent
                )}
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

                        {shouldSearch ? (
                            <Text style={[styles.flatlistShouldSearch]}>{searchRequiredText}</Text>
                        ) : (
                            <FlatList
                                style={styles.flatlist}
                                contentContainerStyle={styles.flatlistContainer}
                                keyExtractor={(item) => item.value}
                                data={options.filter((opt) => opt.label.includes(search))}
                                renderItem={({ item }) => {
                                    const checked = selected.includes(item.value);

                                    const onPress = (marked: boolean) => {
                                        if (marked) return handleAddSelected(item.value);

                                        const findValue = selected.findIndex(
                                            (sel) => sel === item.value
                                        );
                                        return handleRemoveSelected(findValue);
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
                        )}

                        <View style={styles.selectedView}>
                            <Text style={styles.selectedViewText}>{selectedText}</Text>

                            <View style={styles.barStyle} />
                        </View>

                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollViewContainer}
                        >
                            {selected.map((val, i) => (
                                <TouchableOpacity key={i} onPress={() => handleRemoveSelected(i)}>
                                    <Text style={[styles.selectedVal, selectedValueStyle]}>
                                        {val}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            onPress={handleClose}
                            style={[styles.closeBtn, closeButtonStyle]}
                        >
                            {typeof closeButtonContent === "string" ? (
                                <Text style={[styles.closeBtnText, closeButtonTextStyle]}>
                                    {closeButtonContent}
                                </Text>
                            ) : (
                                closeButtonContent
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default MultiSelectList;
