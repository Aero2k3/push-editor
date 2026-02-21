import type { Format, Platform } from '../types';
import { platformFormats, formatSizes } from '../templates';
import './FormatTabs.css';

interface Props {
    platform: Platform;
    format: Format;
    onPlatformChange: (p: Platform) => void;
    onFormatChange: (f: Format) => void;
}

export default function FormatTabs({ platform, format, onPlatformChange, onFormatChange }: Props) {
    const formats = platformFormats[platform];

    return (
        <div className="format-tabs">
            {/* Platform selector */}
            <div className="platform-row">
                <button
                    className={`platform-btn ${platform === 'threads' ? 'active' : ''}`}
                    onClick={() => {
                        onPlatformChange('threads');
                        onFormatChange(platformFormats.threads[0]);
                    }}
                >
                    Threads
                </button>
                <button
                    className={`platform-btn ${platform === 'x' ? 'active' : ''}`}
                    onClick={() => {
                        onPlatformChange('x');
                        onFormatChange(platformFormats.x[0]);
                    }}
                >
                    X
                </button>
            </div>

            {/* Format selector */}
            <div className="format-row">
                {formats.map((f) => (
                    <button
                        key={f}
                        className={`format-btn ${format === f ? 'active' : ''}`}
                        onClick={() => onFormatChange(f)}
                    >
                        <span className="format-ratio">{f}</span>
                        <span className="format-label">{formatSizes[f].label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
