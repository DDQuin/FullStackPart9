
import express from 'express';
import patientsService from '../services/patientsService';
import {toNewEntry, toNewPatient} from '../utils';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (_req, res) => {
  res.send(patientsService.getPatient(_req.params.id));
});

router.post('/:id/entries', (_req, res) => {
  try {
    const newEntry = toNewEntry(_req.body);

    const patientUpdated: Patient = patientsService.addEntry(_req.params.id, newEntry);
    return res.json(patientUpdated);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;