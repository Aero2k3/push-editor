import { useState, useRef } from 'react';
import type { CardData } from '../types';
import './CardEditor.css';

interface Props {
    card: CardData;
    onChange: (updates: Partial<CardData>) => void;
}

const bgPresets = [
    '#F0EBE3', '#FFFFFF', '#F5F0EB', '#E8E0D5',
    '#1A1A1A', '#2D2D2D', '#3D2B1F', '#1A3A5C',
];

export default function CardEditor({ card, onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result;
            if (typeof result === 'string') {
                onChange({ bgImage: result });
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        onChange({ bgImage: '' });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="card-editor">
            {/* ===== Text Fields with inline color ===== */}
            <FieldBlock
                label="БРЕНД"
                value={card.brand}
                color={card.brandColor}
                fontSize={card.brandSize}
                onText={(v) => onChange({ brand: v })}
                onColor={(c) => onChange({ brandColor: c })}
                onFontSize={(s) => onChange({ brandSize: s })}
                placeholder="Имя / бренд"
                maxLength={30}
                sizeMin={16} sizeMax={60}
            />

            <FieldBlock
                label="ЗАГОЛОВОК"
                value={card.title}
                color={card.titleColor}
                fontSize={card.titleSize}
                onText={(v) => onChange({ title: v })}
                onColor={(c) => onChange({ titleColor: c })}
                onFontSize={(s) => onChange({ titleSize: s })}
                placeholder="Введите заголовок"
                maxLength={100}
                multiline
                sizeMin={40} sizeMax={160}
            />

            <FieldBlock
                label="ПОДЗАГОЛОВОК"
                value={card.subtitle}
                color={card.subtitleColor}
                fontSize={card.subtitleSize}
                onText={(v) => onChange({ subtitle: v })}
                onColor={(c) => onChange({ subtitleColor: c })}
                onFontSize={(s) => onChange({ subtitleSize: s })}
                placeholder="Подзаголовок (курсив)"
                maxLength={150}
                sizeMin={16} sizeMax={60}
            />

            <FieldBlock
                label="ТЕКСТ"
                value={card.text}
                color={card.textColor}
                fontSize={card.textSize}
                onText={(v) => onChange({ text: v })}
                onColor={(c) => onChange({ textColor: c })}
                onFontSize={(s) => onChange({ textSize: s })}
                placeholder="Текст описания"
                maxLength={500}
                multiline
                sizeMin={16} sizeMax={60}
            />

            <FieldBlock
                label="САЙТ"
                value={card.website}
                color={card.websiteColor}
                fontSize={card.websiteSize}
                onText={(v) => onChange({ website: v })}
                onColor={(c) => onChange({ websiteColor: c })}
                onFontSize={(s) => onChange({ websiteSize: s })}
                placeholder="YOURSITE.COM"
                maxLength={40}
                sizeMin={12} sizeMax={40}
            />

            {/* Step number */}
            {(card.layout === 'step-left' || card.layout === 'step-center') && (
                <div className="editor-field">
                    <label>НОМЕР ШАГА</label>
                    <input
                        type="text"
                        value={card.slideNumber}
                        onChange={(e) => onChange({ slideNumber: e.target.value })}
                        placeholder="1"
                        maxLength={5}
                    />
                </div>
            )}

            {/* ===== Background Image ===== */}
            <div className="editor-field">
                <label>ФОТО ФОНА</label>
                <div className="bg-image-row">
                    <button
                        className="upload-btn"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        📷 Загрузить фото
                    </button>
                    {card.bgImage && (
                        <button className="remove-btn" onClick={removeImage}>
                            ✕
                        </button>
                    )}
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
                {card.bgImage && (
                    <div className="bg-image-thumb">
                        <img src={card.bgImage} alt="bg" />
                    </div>
                )}
            </div>

            {/* ===== Background Color ===== */}
            <div className="editor-field">
                <label>ЦВЕТ ФОНА</label>
                <div className="color-presets">
                    {bgPresets.map((color) => (
                        <button
                            key={color}
                            className={`color-swatch ${card.bgColor === color ? 'active' : ''}`}
                            style={{ background: color }}
                            onClick={() => onChange({ bgColor: color })}
                        />
                    ))}
                    <label className="color-custom">
                        <input
                            type="color"
                            value={card.bgColor}
                            onChange={(e) => onChange({ bgColor: e.target.value })}
                        />
                        <span>⊕</span>
                    </label>
                </div>
            </div>

            {/* ===== Drag hint ===== */}
            <div className="editor-hint">
                💡 Перетаскивайте текст прямо на карточке
            </div>
        </div>
    );
}

/* ===== Reusable Field Block with inline color picker + size slider ===== */

interface FieldBlockProps {
    label: string;
    value: string;
    color: string;
    fontSize: number;
    onText: (v: string) => void;
    onColor: (c: string) => void;
    onFontSize: (s: number) => void;
    placeholder: string;
    maxLength: number;
    multiline?: boolean;
    sizeMin: number;
    sizeMax: number;
}

function FieldBlock({ label, value, color, fontSize, onText, onColor, onFontSize, placeholder, maxLength, multiline, sizeMin, sizeMax }: FieldBlockProps) {
    const [showColor, setShowColor] = useState(false);

    return (
        <div className="editor-field">
            <div className="field-header">
                <label>{label}</label>
                <div className="field-controls">
                    <input
                        className="size-slider"
                        type="range"
                        min={sizeMin}
                        max={sizeMax}
                        value={fontSize}
                        onChange={(e) => onFontSize(Number(e.target.value))}
                        title={`${fontSize}px`}
                    />
                    <span className="size-label">{fontSize}</span>
                    <button
                        className="color-dot"
                        style={{ background: color }}
                        onClick={() => setShowColor(!showColor)}
                        title="Изменить цвет"
                    />
                </div>
            </div>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onText(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    rows={3}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onText(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
            )}
            {showColor && (
                <div className="inline-color-picker">
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => onColor(e.target.value)}
                    />
                    <div className="quick-colors">
                        {['#1A1A1A', '#FFFFFF', '#D4836D', '#C55A11', '#2D6A4F', '#1A5276', '#6C3483', '#333333'].map((c) => (
                            <button
                                key={c}
                                className={`color-swatch small ${color === c ? 'active' : ''}`}
                                style={{ background: c }}
                                onClick={() => onColor(c)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
