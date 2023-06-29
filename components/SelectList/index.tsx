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
import { IOptionLabel, SelectListProps } from "../..";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import removeAccent from "../../utils/removeAccent";

const MAX_OPTIONS_LENGTH = 100;
const MIN_SEARCH_LENGTH = 3;

function ShowIcon({ marked }: { marked: boolean }) {
    return marked ? (
        <AntDesign name="checksquare" style={styles.iconStyle} />
    ) : (
        <AntDesign name="minussquareo" style={styles.iconStyle} />
    );
}

interface ISelectItem {
    label: IOptionLabel;
    checked: boolean;
    onPress: (marked: boolean) => void;
    itemStyle?: ViewStyle;
    labelStyle?: ViewStyle;
}
function SelectItem({ label, checked, onPress, itemStyle = {}, labelStyle = {} }: ISelectItem) {
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

function SelectList({
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
}: SelectListProps) {
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

    const handleRemoveSelected = () => {
        setSelected(null);
    };

    const handleAddSelected = (value: any) => {
        setSelected(value);
    };

    const shouldSearch: boolean =
        options.length > MAX_OPTIONS_LENGTH && search.length < MIN_SEARCH_LENGTH;

    const searchResults = options.filter((opt) => {
        const str1 = removeAccent(opt.label);
        const str2 = removeAccent(search);
        return str1.includes(str2);
    });

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
                                data={searchResults}
                                renderItem={({ item }) => {
                                    const checked = selected.includes(item.value);

                                    const onPress = (marked: boolean) => {
                                        if (marked) return handleAddSelected(item.value);
                                        return handleRemoveSelected();
                                    };

                                    return (
                                        <SelectItem
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
                            {selected && (
                                <TouchableOpacity onPress={() => handleRemoveSelected()}>
                                    <Text style={[styles.selectedVal, selectedValueStyle]}>
                                        {selected}
                                    </Text>
                                </TouchableOpacity>
                            )}
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

export default SelectList;
