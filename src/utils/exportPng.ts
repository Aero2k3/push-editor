import html2canvas from 'html2canvas';

export async function exportPng(
    cardRef: React.RefObject<HTMLDivElement | null>,
    filename?: string
): Promise<void> {
    const card = cardRef.current;
    if (!card) return;

    // Wait for fonts to load
    await document.fonts.ready;

    const canvas = await html2canvas(card, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,
        logging: false,
    });

    const link = document.createElement('a');
    link.download = filename || `card-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
