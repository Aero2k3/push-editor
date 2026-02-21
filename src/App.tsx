import { useState, useRef, useCallback } from 'react';
import type { CardData, Format, Platform, CardLayout, FieldPositions } from './types';
import { styles, defaultColors, layoutPositions } from './templates';
import { isTelegram } from './telegram';
import CardPreview from './components/CardPreview';
import CardEditor from './components/CardEditor';
import TemplatePicker from './components/TemplatePicker';
import FormatTabs from './components/FormatTabs';
import ExportButton from './components/ExportButton';
import './App.css';

const defaultCard: CardData = {
    brand: '',
    title: '',
    subtitle: '',
    text: '',
    website: '',
    brandColor: defaultColors.brand,
    titleColor: defaultColors.title,
    subtitleColor: defaultColors.subtitle,
    textColor: defaultColors.text,
    websiteColor: defaultColors.website,
    brandSize: 36,
    titleSize: 106,
    subtitleSize: 36,
    textSize: 31,
    websiteSize: 22,
    bgColor: defaultColors.bg,
    bgImage: '',
    layout: 'cover',
    slideNumber: '1',
    positions: { ...layoutPositions.cover },
};

function getInitialData(): Partial<CardData> {
    const params = new URLSearchParams(window.location.search);
    const data: Partial<CardData> = {};
    if (params.get('title')) data.title = decodeURIComponent(params.get('title')!);
    if (params.get('text')) data.text = decodeURIComponent(params.get('text')!);
    if (params.get('brand')) data.brand = decodeURIComponent(params.get('brand')!);
    return data;
}

export default function App() {
    const [card, setCard] = useState<CardData>(() => ({
        ...defaultCard,
        ...getInitialData(),
    }));
    const [format, setFormat] = useState<Format>('4:5');
    const [platform, setPlatform] = useState<Platform>('threads');

    const cardRef = useRef<HTMLDivElement>(null);
    const currentStyle = styles['minimal'];
    const appLayout = isTelegram ? 'mobile' : 'desktop';

    const updateCard = useCallback((updates: Partial<CardData>) => {
        setCard((prev) => ({ ...prev, ...updates }));
    }, []);

    // When layout changes, reset positions to the preset
    const setLayout = useCallback((layout: CardLayout) => {
        setCard((prev) => ({
            ...prev,
            layout,
            positions: { ...layoutPositions[layout] },
        }));
    }, []);

    // When a field is dragged, update its position
    const handlePositionChange = useCallback((posUpdates: Partial<FieldPositions>) => {
        setCard((prev) => ({
            ...prev,
            positions: {
                ...prev.positions,
                ...Object.fromEntries(
                    Object.entries(posUpdates).map(([key, val]) => [
                        key,
                        { ...prev.positions[key as keyof FieldPositions], ...val },
                    ])
                ),
            },
        }));
    }, []);

    return (
        <div className={`app ${appLayout}`}>
            <header className="app-header">
                <div className="logo">
                    <span className="logo-mark">P</span>
                    <span className="logo-text">USH</span>
                </div>
                <div className="header-subtitle">Card Editor</div>
            </header>

            <main className="app-main">
                <section className="preview-section">
                    <CardPreview
                        card={card}
                        style={currentStyle}
                        format={format}
                        cardRef={cardRef}
                        onPositionChange={handlePositionChange}
                    />
                </section>

                <section className="controls-section">
                    <div className="controls-inner">
                        <FormatTabs
                            platform={platform}
                            format={format}
                            onPlatformChange={setPlatform}
                            onFormatChange={setFormat}
                        />

                        <TemplatePicker
                            current={card.layout}
                            onChange={setLayout}
                        />

                        <CardEditor
                            card={card}
                            onChange={updateCard}
                        />

                        <ExportButton cardRef={cardRef} />
                    </div>
                </section>
            </main>
        </div>
    );
}
