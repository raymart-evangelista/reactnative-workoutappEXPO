import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { Formik, Field, FieldArray, ErrorMessage, useFormik } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper';
import * as Yup from 'yup';
import { FlatList } from "react-native";

import TextInput from "../components/TextInput";
import SegmentedButtonWithSelectedCheck from "../components/SegmentedButtonWithSelectedCheck";

import programsService from "../services/programs";

const CreateProgramScreen = () => {
    return (
        <>
            <Text>HEllooo</Text>
        </>
    );
};

export default CreateProgramScreen;
