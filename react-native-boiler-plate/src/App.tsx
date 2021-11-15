import React from 'react';
import { Text, View } from 'react-native';
import {t} from 'react-native-tailwindcss';

interface Props{

}

export const App = ({} : Props) =>{
    return(
        <View style={[
            t.flex1, t.justifyCenter, t.alignCenter,
            t.border, t.borderBlack, t.m10]}>
            <Text style={[t.textCenter]}>{"Hello world"}</Text>
        </View>
    )
}