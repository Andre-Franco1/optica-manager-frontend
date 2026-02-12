export interface Prescription {
  id: number;
  date: Date;

  distanceOdSpherical: number;
  distanceOdCylindrical: number;
  distanceOdAxis: number;
  distanceOdDnp: number;
  distanceOdAddition: number;

  distanceOsSpherical: number;
  distanceOsCylindrical: number;
  distanceOsAxis: number;
  distanceOsDnp: number;
  distanceOsAddition: number;
  
  distanceDp: number;

  nearOdSpherical: number;
  nearOdCylindrical: number;
  nearOdAxis: number;
  nearOdDnp: number;
  nearOdHeight: number;

  nearOsSpherical: number;
  nearOsCylindrical: number;
  nearOsAxis: number;
  nearOsDnp: number;
  nearOsHeight: number;
  
  nearDp: number;

  notes: string;

  clientId: number;
  ophthalmologistId: number;
  ophthalmologistName: string;
}
