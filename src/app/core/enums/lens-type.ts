export enum LensType {
    MONOFOCAL = 'MONOFOCAL',
    BIFOCAL = 'BIFOCAL',
    PROGRESSIVE = 'PROGRESSIVE'
}

export const LensTypeLabels: Record<LensType, string> = {
  [LensType.MONOFOCAL]: 'Monofocal',
  [LensType.BIFOCAL]: 'Bifocal',
  [LensType.PROGRESSIVE]: 'Progressiva'
};
