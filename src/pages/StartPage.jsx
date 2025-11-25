import Button from '../components/common/Button'
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { AutoSave } from "../utils/AutoSave";
import styles from './StartPage.module.css';

const settingsSchema = yup.object({
    userId: yup
        .string()
        .required("Вкажіть userId")
        .min(3, "Має бути щонайменше 3 символи"),
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

    // комбінуємо початкові значення; якщо в settings немає userId — пустий рядок
    const initialValues = { userId: settings.userId || '', ...settings };

    return (
        <main className={styles.page}>
            <section>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={settingsSchema}
                    onSubmit={(values) => {
                        setSettings(values);
                        onStart(values);
                    }}
                >
                    <Form className={styles.form}>
                        <AutoSave
                            onChange={(values) => {
                                localStorage.setItem("settings", JSON.stringify(values));
                                setSettings(values);
                            }}
                        />

                        <h2 className={styles.title}>Налаштування гри</h2>
                        <p className={styles.hint}>Оберіть параметри для початку гри.</p>

                        <div className={styles.field}>
                            <label htmlFor="userId" className={styles.label}>
                                User ID:
                            </label>
                            <Field
                                id="userId"
                                name="userId"
                                type="text"
                                placeholder="ваш id (наприклад: user123)"
                                className={styles.input}
                            />
                            <ErrorMessage name="userId" component="div" className={styles.error} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="diskCount" className={styles.label}>
                                Кількість дисків:
                            </label>
                            <Field
                                id="diskCount"
                                name="diskCount"
                                type="number"
                                className={styles.input}
                            />
                            <ErrorMessage name="diskCount" component="div" className={styles.error} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="difficulty" className={styles.label}>
                                Складність:
                            </label>
                            <Field as="select" id="difficulty" name="difficulty" className={styles.input}>
                                <option value="1">Легка</option>
                                <option value="2">Середня</option>
                                <option value="3">Важка</option>
                            </Field>
                            <ErrorMessage name="difficulty" component="div" className={styles.error} />
                        </div>

                        <div className={styles.controls}>
                            <Button type="submit">Розпочати гру</Button>
                        </div>
                    </Form>
                </Formik>
            </section>
        </main>
    );
}

export default StartPage;