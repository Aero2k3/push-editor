import { useRef, useCallback, useState } from 'react';
import type { CardData, StyleConfig, Format, FieldPositions } from '../types';
import { formatSizes } from '../templates';
import './CardPreview.css';

interface Props {
    card: CardData;
    style: StyleConfig;
    format: Format;
    cardRef: React.Ref<HTMLDivElement>;
    onPositionChange?: (positions: Partial<FieldPositions>) => void;
}

type FieldKey = keyof FieldPositions;

export default function CardPreview({ card, style, format, cardRef, onPositionChange }: Props) {
    const size = formatSizes[format];
    const containerMaxWidth = 420;
    const scale = Math.min(containerMaxWidth / size.width, 1);

    // Background style
    const bgStyle: React.CSSProperties = {
        width: size.width,
        height: size.height,
        background: card.bgColor,
        fontFamily: style.fontBody,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
    };

    if (card.bgImage) {
        bgStyle.backgroundImage = `url(${card.bgImage})`;
        bgStyle.backgroundSize = 'cover';
        bgStyle.backgroundPosition = 'center';
    }

    return (
        <div className="card-preview-wrapper">
            <div
                className="card-scale-container"
                style={{ width: size.width * scale, height: size.height * scale }}
            >
                <div
                    ref={cardRef}
                    className="card-root"
                    style={bgStyle}
                >
                    {/* Draggable fields */}
                    <DraggableField
                        fieldKey="brand"
                        card={card}
                        scale={scale}
                        cardWidth={size.width}
                        cardHeight={size.height}
                        onPositionChange={onPositionChange}
                    >
                        <div className="field-brand" style={{ color: card.brandColor, fontFamily: style.fontTitle, fontSize: card.brandSize }}>
                            {card.brand}
                        </div>
                    </DraggableField>

                    {(card.layout === 'step-left' || card.layout === 'step-center') && card.slideNumber && (
                        <DraggableField
                            fieldKey="slideNumber"
                            card={card}
                            scale={scale}
                            cardWidth={size.width}
                            cardHeight={size.height}
                            onPositionChange={onPositionChange}
                        >
                            <div className="field-slide-number" style={{ color: card.brandColor, fontFamily: style.fontTitle }}>
                                {card.slideNumber}
                            </div>
                        </DraggableField>
                    )}

                    <DraggableField
                        fieldKey="title"
                        card={card}
                        scale={scale}
                        cardWidth={size.width}
                        cardHeight={size.height}
                        onPositionChange={onPositionChange}
                    >
                        <h1
                            className="field-title"
                            style={{ color: card.titleColor, fontFamily: style.fontTitle, fontSize: card.titleSize }}
                        >
                            {card.title || <span className="placeholder">Заголовок</span>}
                        </h1>
                    </DraggableField>

                    {card.subtitle && (
                        <DraggableField
                            fieldKey="subtitle"
                            card={card}
                            scale={scale}
                            cardWidth={size.width}
                            cardHeight={size.height}
                            onPositionChange={onPositionChange}
                        >
                            <p className="field-subtitle" style={{ color: card.subtitleColor, fontSize: card.subtitleSize }}>
                                {card.subtitle}
                            </p>
                        </DraggableField>
                    )}

                    {card.text && (
                        <DraggableField
                            fieldKey="text"
                            card={card}
                            scale={scale}
                            cardWidth={size.width}
                            cardHeight={size.height}
                            onPositionChange={onPositionChange}
                        >
                            <p className="field-text" style={{ color: card.textColor, fontSize: card.textSize }}>
                                {card.text}
                            </p>
                        </DraggableField>
                    )}

                    {card.website && (
                        <DraggableField
                            fieldKey="website"
                            card={card}
                            scale={scale}
                            cardWidth={size.width}
                            cardHeight={size.height}
                            onPositionChange={onPositionChange}
                        >
                            <div className="field-website" style={{ color: card.websiteColor, fontSize: card.websiteSize }}>
                                {card.website}
                            </div>
                        </DraggableField>
                    )}
                </div>
            </div>
        </div>
    );
}


/* ===== Draggable Field Component ===== */

interface DragProps {
    fieldKey: FieldKey;
    card: CardData;
    scale: number;
    cardWidth: number;
    cardHeight: number;
    onPositionChange?: (positions: Partial<FieldPositions>) => void;
    children: React.ReactNode;
}

function DraggableField({ fieldKey, card, scale, cardWidth, cardHeight, onPositionChange, children }: DragProps) {
    const pos = card.positions[fieldKey];
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef({ mouseX: 0, mouseY: 0, startX: pos.x, startY: pos.y });

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!onPositionChange) return;
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
        dragStart.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            startX: pos.x,
            startY: pos.y,
        };

        const handleMouseMove = (ev: MouseEvent) => {
            const dx = (ev.clientX - dragStart.current.mouseX) / scale;
            const dy = (ev.clientY - dragStart.current.mouseY) / scale;
            const newX = Math.max(0, Math.min(95, dragStart.current.startX + (dx / cardWidth) * 100));
            const newY = Math.max(0, Math.min(95, dragStart.current.startY + (dy / cardHeight) * 100));
            onPositionChange({ [fieldKey]: { x: newX, y: newY } });
        };

        const handleMouseUp = () => {
            setDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [fieldKey, pos, scale, cardWidth, cardHeight, onPositionChange]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!onPositionChange) return;
        const touch = e.touches[0];
        setDragging(true);
        dragStart.current = {
            mouseX: touch.clientX,
            mouseY: touch.clientY,
            startX: pos.x,
            startY: pos.y,
        };

        const handleTouchMove = (ev: TouchEvent) => {
            ev.preventDefault();
            const t = ev.touches[0];
            const dx = (t.clientX - dragStart.current.mouseX) / scale;
            const dy = (t.clientY - dragStart.current.mouseY) / scale;
            const newX = Math.max(0, Math.min(95, dragStart.current.startX + (dx / cardWidth) * 100));
            const newY = Math.max(0, Math.min(95, dragStart.current.startY + (dy / cardHeight) * 100));
            onPositionChange({ [fieldKey]: { x: newX, y: newY } });
        };

        const handleTouchEnd = () => {
            setDragging(false);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };

        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
    }, [fieldKey, pos, scale, cardWidth, cardHeight, onPositionChange]);

    return (
        <div
            className={`draggable-field ${dragging ? 'dragging' : ''}`}
            style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {children}
        </div>
    );
}
