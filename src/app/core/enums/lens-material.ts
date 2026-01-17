export enum LensMaterial {
    CR39 = 'CR39',
    POLYCARBONATE = 'POLYCARBONATE',
    TRIVEX = 'TRIVEX',
    HIGH_INDEX = 'HIGH_INDEX'
}

export const LensMaterialLabels: Record<LensMaterial, string> = {
  [LensMaterial.CR39]: 'CR39',
  [LensMaterial.POLYCARBONATE]: 'Policarbonato',
  [LensMaterial.TRIVEX]: 'Trivex',
  [LensMaterial.HIGH_INDEX]: 'High Index'
};
