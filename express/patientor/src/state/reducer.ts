import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "INDIVIDUAL";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "INDIVIDUAL":
      return {
        ...state,
        individuals: {
          ...state.individuals,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const setIndividual = (newPatient:Patient):Action => {
  return {
    type: "INDIVIDUAL",
    payload: newPatient
  };
};

export const setPatientList = (patientListFromApi:Patient[]):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setDiagnoseList = (diagnoseListFromApi:Diagnosis[]):Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoseListFromApi
  };
};

export const addPatient = (newPatient:Patient):Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

