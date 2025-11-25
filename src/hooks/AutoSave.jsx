import { useEffect } from "react";
import { useFormikContext } from "formik";

export function AutoSave({ onChange }) {
    const { values } = useFormikContext();

    useEffect(() => {
        onChange(values);
    }, [values]);

    return null;
}