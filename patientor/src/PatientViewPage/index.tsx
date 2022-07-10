/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import axios from "axios";
import { Entry, Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import Fireplace from '@material-ui/icons/Fireplace';
import Flag from '@material-ui/icons/Flag';

const PatientViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientPage }, dispatch] = useStateValue();
    
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
            {patientPage?.entries.map(e => <EntryPatient key={e.id} entry={e}/>)}
             
        </div>
    );
    

};


interface EntryPatientProp {
  entry: Entry;
}

interface DiagnoseCodeProp {
  diagnoseCode: string;
}

const EntryPatient = (props: EntryPatientProp) => {
  const entry = props.entry;

  return (
    <div>
      {entry.date} {entry.description}
      <br></br>
      <ul>
        {entry.diagnosisCodes?.map(d => <DiagnoseCode key={d} diagnoseCode={d}/>)}
      </ul>
    </div>
  );

};

const DiagnoseCode = (props: DiagnoseCodeProp) => {
  return (
    <li>
      {props.diagnoseCode}
    </li>
  );
};

export default PatientViewPage;