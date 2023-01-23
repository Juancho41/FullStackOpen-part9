
import { NewPatient, Diagnose, Discharge, Gender, HealthCheckRating, NewHospitalEntry, NewEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringsArray = (arr: any): arr is string[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (arr.every((i:string) => typeof i === "string")) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return arr;
  } else {
    throw new Error("Incorrect or missing Entry");
  }
};

const parseArray = (diagnosisCodes: unknown): Array<Diagnose['code']> => {
  if (!diagnosisCodes || !isStringsArray(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosisCodes");
  }
  return diagnosisCodes;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};


const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error("Incorrect or missing occupation");
    }

    return occupation;
};

const parseVariable = (variable: unknown): string => {
  if (!variable || !isString(variable)) {
    throw new Error("Incorrect or missing string in parsevariable");
  }

  return variable;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.keys(param).includes('date' && 'criteria');

};

const parseDischarge = (variable: unknown): Discharge => {
  if (!variable || !isDischarge(variable)) {
    throw new Error("Incorrect or missing string in parse discharge");
  }

  return variable;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(param).includes('startDate' && 'endDate');

};

const parseSickLeave = (variable: unknown): SickLeave => {
  if (!variable || !isSickLeave(variable)) {
    throw new Error("Incorrect or missing string");
  }

  return variable;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ishealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !ishealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating: " + healthCheckRating);
  }
  return healthCheckRating;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {

  switch (object.type) {
    case "Hospital":
      const newHospitalEntry: NewHospitalEntry = {
        description: parseVariable(object.description),
        type: 'Hospital',
        date: parseDate(object.date),
        specialist: parseVariable(object.specialist),
        diagnosisCodes: parseArray(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
      };
      return newHospitalEntry;

    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        description: parseVariable(object.description),
        type: 'OccupationalHealthcare',
        date: parseDate(object.date),
        specialist: parseVariable(object.specialist),
        diagnosisCodes: parseArray(object.diagnosisCodes),
        employerName: parseVariable(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
      return newOccupationalHealthcareEntry;

    case "HealthCheck":
      const newHealthCheckEntry: NewHealthCheckEntry = {
        description: parseVariable(object.description),
        type: 'HealthCheck',
        date: parseDate(object.date),
        specialist: parseVariable(object.specialist),
        diagnosisCodes: parseArray(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newHealthCheckEntry;

    default:
      throw new Error("Incorrect or missing Entry");
  }

};



