/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import axios from "axios";
import { Entry, Gender, Patient, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry} from "../types";
import { apiBaseUrl } from "../constants";
import { Button} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue,  addEntry } from "../state";
import AddHospitalEntryModal from "../AddPatientModal/AddHospitalEntryModal";
import AddOccupationEntryModal from "../AddPatientModal/AddOccupationEntryModal";
import Fireplace from '@material-ui/icons/Fireplace';
import Flag from '@material-ui/icons/Flag';
import { HospitalEntryFormValues } from "../AddPatientModal/AddHospitalEntryForm";
import { OccupationEntryFormValues } from "../AddPatientModal/AddOccupationEntryForm";
import AddHealthCheckEntryModal from "../AddPatientModal/AddHealthCheckEntryModal";
import { HealthCheckEntryFormValues } from "../AddPatientModal/AddHealthCheckEntryForm";

const PatientViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientPage}, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [modalOccOpen, setModalOccOpen] = React.useState<boolean>(false);
    const [modalHealthOpen, setModalHealthOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const openModalOcc = (): void => setModalOccOpen(true);

    const openModalHealth = (): void => setModalHealthOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const closeModalOcc = (): void => {
      setModalOccOpen(false);
      setError(undefined);
    };
    const closeModalHealth = (): void => {
      setModalHealthOpen(false);
      setError(undefined);
    };
    
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

    const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
      try {
        if (!patientPage) {
          throw new Error("Patient not defined");
        }
        console.log(values, "Values for posting");
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientPage.id}/entries`,
          values
        );
        dispatch(addEntry(newEntry, patientPage.id));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

    const submitNewOccupationEntry = async (values: OccupationEntryFormValues) => {
      try {
        if (!patientPage) {
          throw new Error("Patient not defined");
        }
        console.log(values, "Values for posting");
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientPage.id}/entries`,
          values
        );
        dispatch(addEntry(newEntry, patientPage.id));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

    const submitNewHealthEntry = async (values: HealthCheckEntryFormValues) => {
      try {
        if (!patientPage) {
          throw new Error("Patient not defined");
        }
        console.log(values, "Values for posting");
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientPage.id}/entries`,
          values
        );
        dispatch(addEntry(newEntry, patientPage.id));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

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

<AddHospitalEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewHospitalEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Hospital Entry
      </Button>

      <AddOccupationEntryModal
        modalOpen={modalOccOpen}
        onSubmit={submitNewOccupationEntry}
        error={error}
        onClose={closeModalOcc}
      />
      <Button variant="contained" onClick={() => openModalOcc()}>
        Add New Occupation Entry
      </Button>

      <AddHealthCheckEntryModal
        modalOpen={modalHealthOpen}
        onSubmit={submitNewHealthEntry}
        error={error}
        onClose={closeModalHealth}
      />
      <Button variant="contained" onClick={() => openModalHealth()}>
        Add New HealthCheck Entry
      </Button>
             
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