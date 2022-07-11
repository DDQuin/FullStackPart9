import { State } from "./state";
import { Diagnosis, Patient, EntryAction, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
    | {
      type: "SET_PATIENT";
      payload: Patient;
    }

    | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
    | {
      type: "ADD_ENTRY";
      payload: EntryAction;
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
          ...state.patients
        }
      };
      case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

      case "ADD_ENTRY":
        const newPatient = {...state.patients[action.payload.id]};
        newPatient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: newPatient
        }
      };
      case "SET_PATIENT":
      return {
        ...state,
        patientPage: action.payload
      };
    default:
      return state;
  }
};


export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi,
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses,
  };
};


export const addPatient = (patientFromApi: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patientFromApi,
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: {
      entry,
      id
    },
  };
};

export const setPatient = (patientFromApi: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patientFromApi,
  };
};