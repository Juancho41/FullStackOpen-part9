/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../util';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getSingleEntrie(id));
});

router.post('/', (req, res) => {
  try{
    const newPacientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPacientEntry);
    res.json(addedEntry);

  } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        console.log(errorMessage);
      }
      res.status(400).send(errorMessage);
  }
});

  /*const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPacientEntry = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPacientEntry);
}); */

export default router;