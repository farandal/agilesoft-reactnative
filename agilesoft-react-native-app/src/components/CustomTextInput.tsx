import React from "react";
import { useEffect, useRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

export interface ICustomTextInputProps extends TextInputProps {
  errors?: any
  customStyles?: { inputView?: any, errorView?: any, errorText?: any, inputText?: any}
}

const CustomTextInput = ({ autoFocus, errors, customStyles, ...props }: ICustomTextInputProps) => {
  const ref = useRef<TextInput>(null);


  useEffect(() => {
    autoFocus &&
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
        }
      }, 40);
  });

  return (
      <>
       <View style={customStyles && customStyles.inputView ?  customStyles.inputView : {}}>
            <TextInput  ref={ref} {...props} />
       </View>
       <View style={customStyles.errorView}>
          {errors && errors.message && <Text style={customStyles && customStyles.errorText ?  customStyles.errorText : {}} >{errors.message}</Text>}
       </View>
    </>


  );
};

export default CustomTextInput;
