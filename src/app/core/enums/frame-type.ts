export enum FrameType {
    Sunglass = 'SUNGLASS',
    Prescription = 'PRESCRIPTION'
}

export const FrameTypeLabels: Record<FrameType, string> = {
  [FrameType.Sunglass]: 'Solar',
  [FrameType.Prescription]: 'Receituário'
};