
import { NewPatient, Gender, NewEntry, HealthCheckRating } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
  
    return newPatient;
  };

  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

  const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      throw new Error('Incorrect or missing dateOfBirth');
    }
  
    return dateOfBirth;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
  };


  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

  const isType = (param: string): boolean => {
    return param === "Hospital" || param === "HealthCheck" || param === "OccupationalHealthcare";
  };


  const parseType = (type: unknown): string => {
    if (!type  || !isString(type) || !isType(type)) {
        throw new Error('Incorrect or missing type: ');
    }
    return type;
  };

  const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description');
    }
  
    return description;
  };

  const parseDate = (date: unknown): string => {
    if (!date || !isString(date)) {
      throw new Error('Incorrect or missing date');
    }
  
    return date;
  };

  const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist');
    }
  
    return specialist;
  };

  const isStringArray = (param: any[]): param is string[] => {
    for (const obj of param) {
      if (!(isString(obj))) {
        return false;
      }
    }
    return true;
  };

  const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
      throw new Error('Incorrect or missing diagnosisCodes');
    }
  
    return diagnosisCodes;
  };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

  const parseRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error('Incorrect or missing rating: ' + rating);
    }
    return rating;
  };


  const parseEmplyoyerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
      throw new Error('Incorrect or missing employerName');
    }
  
    return employerName;
  };

  const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing criteria');
    }
  
    return criteria;
  };

  const parseDischarge = (discharge: any): {
    date: string,
    criteria: string
  } => {

    if (!discharge || typeof discharge !== 'object') {
      throw new Error('Incorrect or missing discharge');
    }

    const newDischarge= {
      date: parseDate(discharge.date),
      criteria: parseCriteria(discharge.criteria),
    };
  
    return newDischarge;
  };

  const parseStartDate = (startDate: unknown): string => {
    if (!startDate || !isString(startDate)) {
      throw new Error('Incorrect or missing startDate');
    }
  
    return startDate;
  };

  const parseEndDate = (endDate: unknown): string => {
    if (!endDate || !isString(endDate)) {
      throw new Error('Incorrect or missing endDate');
    }
  
    return endDate;
  };

  const parseSickLeave = (sickLeave: any): {
    startDate: string,
    endDate: string
  } => {

    if (!sickLeave || typeof sickLeave !== 'object') {
      throw new Error('Incorrect or missing sickleave');
    }

    const newSickLeave = {
      startDate: parseStartDate(sickLeave.startDate),
      endDate: parseEndDate(sickLeave.endDate),
    };
  
    return newSickLeave;
  };



  export const toNewEntry = (object: any): NewEntry => {
    const type = parseType(object.type);
    let newEntry: NewEntry;
    if (type === "Hospital") {
      newEntry = {
        type: "Hospital",
        specialist: parseSpecialist(object.specialist),
        date: parseDate(object.date),
        description: parseDescription(object.description),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
      };
    } else if (type === "OccupationalHealthcare") {
      newEntry = {
        type: "OccupationalHealthcare",
        specialist: parseSpecialist(object.specialist),
        date: parseDate(object.date),
        description: parseDescription(object.description),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseEmplyoyerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    } else { //type is healthcheck
      newEntry = {
        type: "HealthCheck",
        specialist: parseSpecialist(object.specialist),
        date: parseDate(object.date),
        description: parseDescription(object.description),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseRating(object.healthCheckRating),
      };

    }
  
    return newEntry;
  };
