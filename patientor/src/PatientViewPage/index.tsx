/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import axios from "axios";
import { Entry, Gender, Patient, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry} from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import Fireplace from '@material-ui/icons/Fireplace';
import Flag from '@material-ui/icons/Flag';

const PatientViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientPage}, dispatch] = useStateValue();
    
    const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };

    if (!patientPage || patientPage.id != id) {
        void fetchPatient();
    }

    return (
        <div>
            <h2>{patientPage?.name} {patientPage?.gender == Gender.Male ? <Flag/> : <Fireplace/>}</h2>

            <br>
            </br>
            ssn: {patientPage?.ssn}<br>
            </br>
            occupation: {patientPage?.occupation}
            <br></br>
            <h2>entries</h2>
            {patientPage?.entries.map(e => {
              return (
                <>
                 <EntryPatient key={e.id} entry={e}/>
                 <br></br>
                </>

              );
            }
           )}
             
        </div>
    );
    

};


interface EntryPatientProp {
  entry: Entry;
}

interface HospitalProp {
  entry: HospitalEntry;
}

interface OccupationProp {
  entry: OccupationalHealthcareEntry;
}

interface HealthCheckProp {
  entry: HealthCheckEntry;
}

interface DiagnoseCodeProp {
  diagnoseCode: string;
}

const EntryPatient = (props: EntryPatientProp) => {
  const entry = props.entry;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


  switch(entry.type) {
    case "Hospital":
      return <HospitalPEntry entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationEntry entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckPEntry entry={entry}/>;
      default:
        return assertNever(entry);
      

  }


};

const HospitalPEntry = (props: HospitalProp) => {
const entry = props.entry;
const style = {
  borderStyle: "solid",
  borderRadius: 5,
  borderWidth: "thin",
};
return (
  <div style={style}>
    {entry.date} type: {entry.type}<br></br>
    <em>{entry.description}</em>
    <br></br>
    <ul>
      {entry.diagnosisCodes?.map(d => <DiagnoseCode key={d} diagnoseCode={d}/>)}
    </ul>
    discharge at {entry.discharge.date} after {entry.discharge.criteria}<br></br>
    diagnose by {entry.specialist}
  </div>
);

};

const OccupationEntry = (props: OccupationProp) => {
  const entry = props.entry;
  const style = {
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: "thin",
  };
return (
  <div style={style}>
    {entry.date} type: {entry.type}<br></br>
    <em>{entry.description}</em>
    <br></br>
    <ul>
      {entry.diagnosisCodes?.map(d => <DiagnoseCode key={d} diagnoseCode={d}/>)}
    </ul>
    employee: {entry.employerName} sick leave started {entry.sickLeave.startDate} and ends at {entry.sickLeave.endDate}<br></br>
    diagnose by {entry.specialist}
  </div>
);
};

const HealthCheckPEntry = (props: HealthCheckProp) => {
  const entry = props.entry;
  const style = {
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: "thin",
  };
return (
  <div style={style}>
    {entry.date} type: {entry.type}<br></br>
     <em>{entry.description}</em>
    <br></br>
    <ul>
      {entry.diagnosisCodes?.map(d => <DiagnoseCode key={d} diagnoseCode={d}/>)}
    </ul>
    health rating: {entry.healthCheckRating} <br></br>
    diagnose by {entry.specialist}
  </div>
);
};



const DiagnoseCode = (props: DiagnoseCodeProp) => {
  const [{diagnoses}] = useStateValue();
  const diagnose = diagnoses[props.diagnoseCode];
  if (!diagnose) {
    return (
      <li>
      {props.diagnoseCode} 
    </li>
      );
  }
  return (
    <li>
      {props.diagnoseCode} {diagnose.name}
    </li>
  );
};



export default PatientViewPage;