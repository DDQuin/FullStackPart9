import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField,  DiagnosisSelection } from "./FormField";
import { HospitalEntry,  } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}


export const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{diagnoses}] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.discharge.criteria) {
          errors["discharge.criteria"]= requiredError;
        }
        
        if (!values.discharge.date) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection setFieldValue={setFieldValue}
            
            setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnoses)} />
            <Field
              label="Date Discharge"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
