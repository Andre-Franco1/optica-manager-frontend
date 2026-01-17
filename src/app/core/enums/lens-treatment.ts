export enum LensTreatment {
    ANTI_REFLECTIVE = 'ANTI_REFLECTIVE',
    BLUE_FILTER = 'BLUE_FILTER',
    PHOTOCROMIC = 'PHOTOCROMIC',
    UV = 'UV'
}

export const LensTreatmentLabels: Record<LensTreatment, string> = {
  [LensTreatment.ANTI_REFLECTIVE]: 'Anti-reflexo',
  [LensTreatment.BLUE_FILTER]: 'Filtro azul',
  [LensTreatment.PHOTOCROMIC]: 'Fotocromática',
  [LensTreatment.UV]: 'UV'
};




