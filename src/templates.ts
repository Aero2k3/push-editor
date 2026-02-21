import type { StyleConfig, FormatSize, Format, CardLayout, FieldPositions } from './types';

/* ===== Styles ===== */

export const styles: Record<string, StyleConfig> = {
    minimal: {
        id: 'minimal',
        name: 'Минимализм',
        fontTitle: "'Playfair Display', serif",
        fontBody: "'Inter', sans-serif",
    },
};

/* ===== Layout metadata ===== */

export interface LayoutMeta {
    id: CardLayout;
    name: string;
}

export const layoutMetas: LayoutMeta[] = [
    { id: 'cover', name: 'Обложка' },
    { id: 'step-left', name: 'Шаг ←' },
    { id: 'step-center', name: 'Шаг ⬌' },
    { id: 'center', name: 'Центр' },
    { id: 'closing', name: 'Финал' },
];

/* ===== Preset positions per layout (% of card) ===== */

export const layoutPositions: Record<CardLayout, FieldPositions> = {
    cover: {
        brand: { x: 5, y: 4 },
        slideNumber: { x: 5, y: 28 },
        title: { x: 5, y: 33 },
        subtitle: { x: 5, y: 58 },
        text: { x: 40, y: 64 },
        website: { x: 5, y: 91 },
    },
    'step-left': {
        brand: { x: 5, y: 4 },
        slideNumber: { x: 5, y: 30 },
        title: { x: 5, y: 36 },
        subtitle: { x: 5, y: 52 },
        text: { x: 5, y: 58 },
        website: { x: 5, y: 91 },
    },
    'step-center': {
        brand: { x: 5, y: 4 },
        slideNumber: { x: 43, y: 30 },
        title: { x: 10, y: 36 },
        subtitle: { x: 15, y: 52 },
        text: { x: 15, y: 58 },
        website: { x: 5, y: 91 },
    },
    center: {
        brand: { x: 5, y: 4 },
        slideNumber: { x: 43, y: 25 },
        title: { x: 5, y: 33 },
        subtitle: { x: 10, y: 56 },
        text: { x: 10, y: 63 },
        website: { x: 5, y: 91 },
    },
    closing: {
        brand: { x: 5, y: 85 },
        slideNumber: { x: 5, y: 28 },
        title: { x: 5, y: 22 },
        subtitle: { x: 5, y: 47 },
        text: { x: 5, y: 55 },
        website: { x: 55, y: 4 },
    },
};

/* ===== Default colors ===== */

export const defaultColors = {
    bg: '#F0EBE3',
    brand: '#D4836D',
    title: '#1A1A1A',
    subtitle: '#1A1A1A',
    text: '#333333',
    website: '#D4836D',
};

/* ===== Format Sizes ===== */

export const formatSizes: Record<Format, FormatSize> = {
    '4:5': { width: 1080, height: 1350, label: 'Reels/Threads' },
    '1:1': { width: 1080, height: 1080, label: 'Квадрат' },
    '16:9': { width: 1920, height: 1080, label: 'Landscape' },
};

/* ===== Platform formats ===== */

export const platformFormats: Record<string, Format[]> = {
    threads: ['4:5', '1:1'],
    x: ['16:9', '1:1'],
};
