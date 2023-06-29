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
    openButtonContent?: string | React.ReactNode;
    openButtonStyle?: ViewStyle;
    openButtonTextStyle?: TextStyle;
    closeButtonContent?: string | React.ReactNode;
    closeButtonStyle?: ViewStyle;
    closeButtonTextStyle?: TextStyle;
    itemStyle?: ViewStyle;
    labelStyle?: TextStyle;
    modalStyle?: ViewStyle;
    selectedValueStyle?: TextStyle;
    selectedText?: string;
    placeholder?: string;
    searchRequiredText?: string;
}

export interface SelectListProps extends DefaultSelectProps {
    value: IOptionValue;
    onChange: (value: IOptionValue) => any;
}

export interface MultiSelectListProps extends DefaultSelectProps {
    value: IOptionValue[];
    onChange: (value: IOptionValue[]) => any;
}

declare class MultiSelectList extends React.Component<MultiSelectListProps> {}

declare class SelectList extends React.Component<SelectListProps> {}

export { MultiSelectList, SelectList };
