/* Telegram WebApp SDK wrapper */

declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                ready(): void;
                expand(): void;
                close(): void;
                MainButton: {
                    text: string;
                    show(): void;
                    hide(): void;
                    onClick(fn: () => void): void;
                    offClick(fn: () => void): void;
                    showProgress(): void;
                    hideProgress(): void;
                };
                sendData(data: string): void;
                themeParams: {
                    bg_color?: string;
                    text_color?: string;
                    hint_color?: string;
                    button_color?: string;
                    button_text_color?: string;
                };
                initDataUnsafe: {
                    user?: {
                        id: number;
                        first_name: string;
                        username?: string;
                    };
                    start_param?: string;
                };
                colorScheme: 'light' | 'dark';
                isExpanded: boolean;
                viewportHeight: number;
                viewportStableHeight: number;
            };
        };
    }
}

export const tg = window.Telegram?.WebApp;
// SDK загружается всегда, но initData не пустой только внутри Telegram
export const isTelegram = !!tg && !!tg.initDataUnsafe?.user;
