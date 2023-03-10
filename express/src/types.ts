export interface Diagnose {
    code: string;
    name: string;
    latin?: string;

}
//export type Gender = 'male' | 'female' | 'other';
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string,
    endDate: string,
}

export interface OccupationalHealthcareEntry  extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string,
    criteria: string,
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;

}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]

}

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id' >;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id' >;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id' >;
export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;