import patientsData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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


export default {
  getEntries, getNonSensitiveEntries, addPatient
};