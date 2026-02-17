import GameModal from './GameModal';

/**
 * GameModal — комплексний компонент модального вікна завершення гри.
 * Показує результати гри (ходи, час) або повідомлення про вичерпання часу.
 * Використовує портал React для рендерингу в #modal-root.
 */
export default {
    title: 'Common/GameModal',
    component: GameModal,
    tags: ['autodocs'],
    argTypes: {
        timeExpired: {
            control: 'boolean',
            description: 'Чи вийшов час',
        },
        finalStats: {
            control: 'object',
            description: 'Фінальна статистика гри { moves, time }',
        },
        onRestart: { action: 'restarted' },
        onFinish: { action: 'finished' },
    },
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 400,
            },
        },
    },
    decorators: [
        (Story) => {
            let modalRoot = document.getElementById('modal-root');
            if (!modalRoot) {
                modalRoot = document.createElement('div');
                modalRoot.id = 'modal-root';
                document.body.appendChild(modalRoot);
            }
            return <Story />;
        },
    ],
};

/**
 * Рівень пройдено — показує результати
 */
export const LevelCompleted = {
    args: {
        timeExpired: false,
        finalStats: {
            moves: 15,
            time: 42,
        },
    },
};

/**
 * Час вийшов — показує повідомлення про програш
 */
export const TimeExpired = {
    args: {
        timeExpired: true,
        finalStats: {
            moves: 8,
            time: 60,
        },
    },
};

/**
 * Користувацькі результати — для тестування різних значень
 */
export const CustomStats = {
    args: {
        timeExpired: false,
        finalStats: {
            moves: 127,
            time: 300,
        },
    },
};
