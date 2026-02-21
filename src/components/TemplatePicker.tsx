import { layoutMetas } from '../templates';
import type { CardLayout } from '../types';
import './TemplatePicker.css';

interface Props {
    current: CardLayout;
    onChange: (layout: CardLayout) => void;
}

export default function TemplatePicker({ current, onChange }: Props) {
    return (
        <div className="template-picker">
            <div className="picker-label">РАСПОЛОЖЕНИЕ</div>
            <div className="layout-grid">
                {layoutMetas.map((meta) => (
                    <button
                        key={meta.id}
                        className={`layout-card ${current === meta.id ? 'active' : ''}`}
                        onClick={() => onChange(meta.id)}
                    >
                        <div className="layout-mini">
                            {renderMini(meta.id)}
                        </div>
                        <span className="layout-name">{meta.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

function renderMini(layout: CardLayout) {
    switch (layout) {
        case 'cover':
            return (
                <div className="mini-card">
                    <div className="mini-brand" />
                    <div className="mini-spacer" />
                    <div className="mini-line wide thick" />
                    <div className="mini-line wide thick" />
                    <div className="mini-gap" />
                    <div className="mini-line medium" />
                    <div className="mini-spacer" />
                    <div className="mini-line short accent" />
                </div>
            );
        case 'step-left':
            return (
                <div className="mini-card">
                    <div className="mini-brand" />
                    <div className="mini-spacer" />
                    <div className="mini-line short accent" />
                    <div className="mini-line wide thick" />
                    <div className="mini-gap" />
                    <div className="mini-line medium" />
                    <div className="mini-line medium" />
                    <div className="mini-spacer" />
                    <div className="mini-line short accent" />
                </div>
            );
        case 'step-center':
            return (
                <div className="mini-card align-c">
                    <div className="mini-brand" style={{ alignSelf: 'flex-start' }} />
                    <div className="mini-spacer" />
                    <div className="mini-line short accent centered" />
                    <div className="mini-line wide thick centered" />
                    <div className="mini-gap" />
                    <div className="mini-line medium centered" />
                    <div className="mini-spacer" />
                    <div className="mini-line short accent centered" />
                </div>
            );
        case 'center':
            return (
                <div className="mini-card align-c">
                    <div className="mini-brand" style={{ alignSelf: 'flex-start' }} />
                    <div className="mini-spacer" />
                    <div className="mini-line wide thick centered" />
                    <div className="mini-line wide thick centered" />
                    <div className="mini-gap" />
                    <div className="mini-line medium centered" />
                    <div className="mini-spacer" />
                    <div className="mini-line short accent centered" />
                </div>
            );
        case 'closing':
            return (
                <div className="mini-card">
                    <div className="mini-line short accent" style={{ alignSelf: 'flex-end' }} />
                    <div className="mini-spacer" />
                    <div className="mini-line wide thick" />
                    <div className="mini-line wide thick" />
                    <div className="mini-gap" />
                    <div className="mini-line medium" />
                    <div className="mini-spacer" />
                    <div className="mini-brand" />
                </div>
            );
    }
}
