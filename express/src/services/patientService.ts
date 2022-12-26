import patientData from '../data/patients.json';
import { v4 as uuid } from 'uuid';
import { NonSensitivePatientEntry, Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return patients;
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
    ...entry
  };


  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};