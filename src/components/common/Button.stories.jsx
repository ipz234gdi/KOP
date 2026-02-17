import Button from './Button';

/**
 * Button — базовий компонент кнопки.
 * Використовується по всьому додатку для дій користувача.
 */
export default {
    title: 'Common/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Текст кнопки',
        },
        type: {
            control: { type: 'select' },
            options: ['button', 'submit', 'reset'],
            description: 'HTML тип кнопки',
        },
        disabled: {
            control: 'boolean',
            description: 'Чи вимкнена кнопка',
        },
        className: {
            control: 'text',
            description: 'Додатковий CSS клас',
        },
        onClick: { action: 'clicked' },
    },
};

/**
 * Кнопка за замовчуванням
 */
export const Default = {
    args: {
        children: 'Натисни мене',
        type: 'button',
        disabled: false,
    },
};

/**
 * Кнопка з довгим текстом
 */
export const WithLongText = {
    args: {
        children: 'Дуже довгий текст кнопки для перевірки відображення',
        type: 'button',
        disabled: false,
    },
};

/**
 * Вимкнена кнопка
 */
export const Disabled = {
    args: {
        children: 'Вимкнена',
        type: 'button',
        disabled: true,
    },
};
