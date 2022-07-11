export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

  export enum Gender {
    Other = 'other',
    Male = 'male',
    Female = 'female',
  }



  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
  }

  export type NonSensitivePatient = Omit<Patient, 'ssn'>;

  export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

  export type NewPatient = Omit<Patient, 'id'>;

  interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string,
      criteria: string,
    },
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string,
    sickLeave: {
      startDate: string,
      endDate: string
    }
  }

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  export type NewEntry =
  |  Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;

 
