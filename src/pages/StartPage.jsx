import Button from '../components/Button'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const settingsSchema = yup.object({
    diskCount: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required("Кількість дисків є обов'язковою")
        .min(3, "Має бути щонайменше 3 диски")
        .max(8, "Має бути не більше 8 дисків"),
    difficulty: yup
        .number()
        .required("Оберіть складність")
        .oneOf([1, 2, 3], "Невірне значення складності"),
});

function StartPage({ onStart, settings, setSettings }) {

    return (
        <main>
            <section>
                <Formik
                    initialValues={settings}
                    enableReinitialize
                    validationSchema={settingsSchema}
                    onSubmit={(values) => {
                        setSettings(values);
                        onStart();
                    }}
                >
                    <Form style={{ maxWidth: "400px", margin: "0 auto" }}>
                        <h2>Налаштування гри</h2>
                        <p style={{ color: "#6c757d", marginTop: "-10px" }}>Оберіть параметри для початку гри.</p>

                        <div style={{ marginBottom: "1rem"}}>
                            <label htmlFor="diskCount" style={{ display: "block", marginBottom: "0.5rem" }}>
                                Кількість дисків:
                            </label>
                            <Field
                                id="diskCount"
                                name="diskCount"
                                type="number"
                                style={{ display: "block", boxSizing: "border-box", width: "100%", padding: "0.5rem" }}
                            />
                            <ErrorMessage name="diskCount" component="div" style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }} />
                        </div>

                        <div style={{ marginBottom: "1rem" }}>
                            <label htmlFor="difficulty" style={{ display: "block", marginBottom: "0.5rem" }}>
                                Складність:
                            </label>
                            <Field as="select" id="difficulty" name="difficulty" style={{ width: "100%", padding: "0.5rem" }}>
                                <option value="1">Легка</option>
                                <option value="2">Середня</option>
                                <option value="3">Важка</option>
                            </Field>
                            <ErrorMessage name="difficulty" component="div" style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }} />
                        </div>

                        <div className="start-controls" style={{ marginTop: "24px" }}>
                            <Button type="submit">Розпочати гру</Button>
                        </div>
                    </Form>
                </Formik>
            </section>
        </main>
    );
}

export default StartPage;