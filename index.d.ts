import type * as React from "react";
import { ViewStyle, TextStyle } from "react-native";

export type IOptionValue = any;
export type IOptionLabel = string;

interface IOption {
    value: IOptionValue;
    label: IOptionLabel;
    disabled?: boolean;
}

interface DefaultSelectProps {
    options: IOption[];
    openButtonText?: string;
    openButtonStyle?: ViewStyle;
    openButtonTextStyle?: TextStyle;
    closeButtonText?: string;
    closeButtonStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    labelStyle?: TextStyle;
    modalStyle?: ViewStyle;
    selectedText?: string;
    placeholder?: string;
}

export interface SelectListProps extends DefaultSelectProps {
    value: IOptionValue;
    onChange: (value: IOptionValue) => any;
}

export interface MultiSelectListProps extends DefaultSelectProps {
    value: IOptionValue[];
    onChange: (value: IOptionValue[]) => any;
    selectedValueStyle?: TextStyle;
}

declare class MultiSelectList extends React.Component<MultiSelectListProps> {}

declare class SelectList extends React.Component<SelectListProps> {}

export { MultiSelectList, SelectList };
