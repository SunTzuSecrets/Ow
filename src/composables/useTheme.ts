import { useAppStore } from '@/stores/app';
import type { CSSProperties } from 'vue';
import type { Faction } from '@/types';

const fallbackFactions: Record<Faction, { name: string; color: string }> = {
  FORCES_OF_FANTASY: { name: 'Forces of Fantasy', color: '#2f6fdd' },
  RAVAGING_HORDES: { name: 'Ravaging Hordes', color: '#b3181f' },
  UNDEAD: { name: 'Undead', color: '#777777' },
};

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;

  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;

  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function relativeLuminance([red, green, blue]: [number, number, number]) {
  const channel = (value: number) => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

// Faction colours are tuned for map fills; for text on the dark panels we
// lighten them just enough to reach a 4.5:1 contrast ratio.
const PANEL_LUMINANCE = relativeLuminance([21, 18, 18]);

function readableOnDark(hex: string) {
  const [red, green, blue] = hexToRgb(hex);

  for (let mix = 0; mix <= 1; mix += 0.05) {
    const candidate: [number, number, number] = [
      Math.round(red + (255 - red) * mix),
      Math.round(green + (255 - green) * mix),
      Math.round(blue + (255 - blue) * mix),
    ];
    const contrast = (relativeLuminance(candidate) + 0.05) / (PANEL_LUMINANCE + 0.05);

    if (contrast >= 4.5) {
      return `rgb(${candidate[0]}, ${candidate[1]}, ${candidate[2]})`;
    }
  }

  return '#F2EEEA';
}

export function useTheme() {
  const appStore = useAppStore();

  const factionMeta = (faction: Faction) =>
    appStore.factionByCode(faction) ?? { code: faction, ...fallbackFactions[faction] };

  const factionLabel = (faction: Faction) => factionMeta(faction).name;
  const factionColor = (faction: Faction) => factionMeta(faction).color;
  const factionTextColor = (faction: Faction) => readableOnDark(factionColor(faction));
  const factionBadgeStyle = (faction: Faction): CSSProperties => {
    return {
      color: factionTextColor(faction),
    };
  };
  const factionSurfaceStyle = (faction: Faction): CSSProperties => {
    const color = factionColor(faction);

    return {
      color: factionTextColor(faction),
      borderColor: hexToRgba(color, 0.45),
      background: 'rgba(0, 0, 0, 0.24)',
      boxShadow: 'none',
    };
  };
  const factionFillStyle = (faction: Faction): CSSProperties => {
    const color = factionColor(faction);
    return {
      background: `linear-gradient(90deg, ${hexToRgba(color, 0.86)}, ${color})`,
    };
  };

  return {
    factionMeta,
    factionLabel,
    factionColor,
    factionTextColor,
    factionBadgeStyle,
    factionSurfaceStyle,
    factionFillStyle,
  };
}
