export interface Diagnose {
    code: string;
    name: string;
    latin?: string;

}
export type Gender = 'male' | 'female' | 'other';

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;

}

export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;