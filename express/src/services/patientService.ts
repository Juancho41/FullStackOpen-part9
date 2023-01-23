import patientData from '../data/patients';
import { v4 as uuid } from 'uuid';
import { NonSensitivePatientEntry, Patient, NewPatient, NewEntry, Entry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getSingleEntrie = (id:string): Patient | undefined => {
  return patients.find(patient => patient.id == id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      }));
};

const addPatient = (entry: NewPatient): NewPatient => {

  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry
  };


  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (entry: NewEntry, id: string): Entry => {

  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  const patient: Patient | undefined = patients.find(patient => patient.id == id);

  if (patient !== undefined) {
    patient.entries.push(newPatientEntry);
    return newPatientEntry;
  } else {
    throw new Error("Incorrect or missing Entry");
  }

};



export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getSingleEntrie,
  addPatientEntry
};