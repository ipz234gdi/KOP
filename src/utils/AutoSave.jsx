/**
 * @module AutoSave
 * @description Formik auto-save component that triggers a callback on every form value change.
 */
import { useEffect } from "react";
import { useFormikContext } from "formik";

/**
 * AutoSave component — calls onChange whenever Formik form values change.
 * @function AutoSave
 * @param {Object} props - Component props.
 * @param {Function} props.onChange - Callback invoked with current form values.
 * @returns {null} Renders nothing.
 */
export function AutoSave({ onChange }) {
    const { values } = useFormikContext();

    useEffect(() => {
        onChange(values);
    }, [values]);

    return null;
}