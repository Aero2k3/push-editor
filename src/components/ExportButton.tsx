import { useState } from 'react';
import { exportPng } from '../utils/exportPng';
import './ExportButton.css';

interface Props {
    cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportButton({ cardRef }: Props) {
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        try {
            await exportPng(cardRef);
        } catch (err) {
            console.error('Export failed:', err);
        } finally {
            setExporting(false);
        }
    };

    return (
        <button
            className={`export-btn ${exporting ? 'exporting' : ''}`}
            onClick={handleExport}
            disabled={exporting}
        >
            {exporting ? (
                <>
                    <span className="spinner" />
                    Экспорт...
                </>
            ) : (
                <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Скачать PNG
                </>
            )}
        </button>
    );
}
