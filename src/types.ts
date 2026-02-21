/* ===== Card Data Types ===== */

export type Platform = 'threads' | 'x';
export type Format = '4:5' | '1:1' | '16:9';

// Preset layouts that determine initial positions of 5 base fields
export type CardLayout =
    | 'cover'         // Обложка
    | 'step-left'     // Шаг (лево)
    | 'step-center'   // Шаг (центр)
    | 'center'        // Всё по центру
    | 'closing';      // Финал

// Position of a text field on the card (percentage 0-100)
export interface FieldPos {
    x: number;   // % from left
    y: number;   // % from top
}

// All field positions
export interface FieldPositions {
    brand: FieldPos;
    title: FieldPos;
    subtitle: FieldPos;
    text: FieldPos;
    website: FieldPos;
    slideNumber: FieldPos;
}

// 5 base fields always present on every card
export interface CardData {
    // Content
    brand: string;
    title: string;
    subtitle: string;
    text: string;
    website: string;

    // Per-field colors
    brandColor: string;
    titleColor: string;
    subtitleColor: string;
    textColor: string;
    websiteColor: string;

    // Per-field font sizes (px on 1080-wide canvas)
    brandSize: number;
    titleSize: number;
    subtitleSize: number;
    textSize: number;
    websiteSize: number;

    // Card background
    bgColor: string;
    bgImage: string;     // base64 data URL or ''

    // Layout preset
    layout: CardLayout;

    // Step number (shown in step layouts)
    slideNumber: string;

    // Positions of each field (% of card)
    positions: FieldPositions;
}

/* ===== Style Types ===== */

export interface StyleConfig {
    id: string;
    name: string;
    fontTitle: string;
    fontBody: string;
}

/* ===== App State ===== */

export interface AppState {
    card: CardData;
    style: string;
    format: Format;
    platform: Platform;
}

/* ===== Format Sizes ===== */

export interface FormatSize {
    width: number;
    height: number;
    label: string;
}
