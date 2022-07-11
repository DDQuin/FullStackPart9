import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatient,  NonSensitivePatient, Entry, NewEntry } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find(p => p.id == id);
  if (!patient) {
    return undefined;
  }
  return patient;
  
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

const newPatient = {
  id,
  ...entry,
};



patients.push(newPatient);
return newPatient;
};

const addEntry = (idPatient: string, entry: NewEntry ): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const patientToAddEntryTo = patients.find(p => p.id === idPatient);
  if (!patientToAddEntryTo) {
    throw new Error("Patient doesnt exist, id is wwrong " + idPatient);
  }
  const newEntry: Entry = {
    id,
    ...entry,
  };
  patientToAddEntryTo.entries.push(newEntry);


return patientToAddEntryTo; 
};



export default {
  getEntries, getNonSensitiveEntries, addPatient, getPatient, addEntry
};