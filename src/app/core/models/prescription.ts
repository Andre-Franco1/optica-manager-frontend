export interface Prescription {
  id: number;
  date: Date;

  odSphere: number;
  odCylinder: number | null;
  odAxis: number | null;

  osSphere: number;
  osCylinder: number | null;
  osAxis: number | null;

  addition: number | null;
  notes: string;

  clientId: number;
}
