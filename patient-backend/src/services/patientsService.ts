import patientsData from '../../data/patients.json';

import { Patient, NonSensitivePatient } from '../types';

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


export default {
  getEntries, getNonSensitiveEntries
};