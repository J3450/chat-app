import { Text as RNtext, TextProps } from "react-native"
import React from "react"

interface   CustomTextProps extends TextProps {
    children: React.ReactNode
}

export function Text({children, style, ...props}: CustomTextProps){
    return (
        <RNtext style={[{color: "white" }, style]} {...props}>
            {children}
        </RNtext>
    );
}