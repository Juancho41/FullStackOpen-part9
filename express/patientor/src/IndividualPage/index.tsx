import React from "react";
import axios from "axios";
import { Patient, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setIndividual, setDiagnoseList } from "../state";
import { useParams } from "react-router-dom";

const HospitalEntryComp = ( { elem }: { elem: HospitalEntry } ) => {

  const [{ diagnosis }] = useStateValue();
  if (elem.diagnosisCodes == undefined) {
    return(
      <div key={elem.id}>
        <div>{elem.type}</div>
        <div>{elem.date} - {elem.description}</div>
        <div>Discharge Criteria{elem.discharge.criteria}</div>
        <div>Discharge Date{elem.discharge.date}</div>
        <div>{elem.specialist}</div>
        <hr />
      </div>

    );
  } else if (diagnosis !== undefined) {
      console.log(diagnosis);
      return(
        <div key={elem.id}>
          <div>{elem.type}</div>
          <div>{elem.date} - {elem.description}</div>
          <div>Discharge Criteria: {elem.discharge.criteria}</div>
          <div>Discharge Date: {elem.discharge.date}</div>
          <ul>{elem.diagnosisCodes.map(code => {
            return(

              <li key={code}>{code} - {diagnosis[code].name}</li>

            );
          })}</ul>
          <div>{elem.specialist}</div>
          <hr />
        </div>

      );
  } else {
    return(
      <div>cargando</div>
    );

  }


};

const OccupationalHealthcareEntryComp = ( { elem }: { elem: OccupationalHealthcareEntry } ) => {

  const [{ diagnosis }] = useStateValue();
  if (elem.diagnosisCodes == undefined) {
    if (elem.sickLeave == undefined) {
      return(
        <div key={elem.id}>
          <div>{elem.type}</div>
          <div>{elem.date} - {elem.description}</div>
          <div>{elem.employerName}</div>
          <div>{elem.specialist}</div>
          <hr />
        </div>

      );
    }
    return(
      <div key={elem.id}>
        <div>{elem.type}</div>
        <div>{elem.date} - {elem.description}</div>
        <div>{elem.employerName}</div>
        <div>Starts: {elem.sickLeave?.startDate}</div>
        <div>Ends: {elem.sickLeave?.endDate}</div>
        <div>{elem.specialist}</div>
        <hr />
      </div>

    );
  } else if (diagnosis !== undefined) {
      if (elem.sickLeave == undefined) {
        return(
          <div key={elem.id}>
            <div>{elem.type}</div>
            <div>{elem.date} - {elem.description}</div>
            <div>Employer: {elem.employerName}</div>
            <ul>{elem.diagnosisCodes.map(code => {
              return(

                <li key={code}>{code} - {diagnosis[code].name}</li>

              );
            })}</ul>
            <div>{elem.specialist}</div>
            <hr />
          </div>

        );
      }
      return(
        <div key={elem.id}>
          <div>{elem.type}</div>
          <div>{elem.date} - {elem.description}</div>
          <div>Employer: {elem.employerName}</div>
          <div>Starts: {elem.sickLeave?.startDate}</div>
          <div>Ends: {elem.sickLeave?.endDate}</div>
          <ul>{elem.diagnosisCodes.map(code => {
            return(

              <li key={code}>{code} - {diagnosis[code].name}</li>

            );
          })}</ul>
          <div>{elem.specialist}</div>
          <hr />
        </div>

      );
  } else {
    return(
      <div>cargando</div>
    );

  }


};

const HealthCheckEntryComp = ( { elem }: { elem: HealthCheckEntry } ) => {

  const [{ diagnosis }] = useStateValue();
  if (elem.diagnosisCodes == undefined) {
    return(
      <div key={elem.id}>
        <div>{elem.type}</div>
        <div>{elem.date} - {elem.description}</div>
        <div>healthCheckRating: {elem.healthCheckRating}</div>
        <div>{elem.specialist}</div>
        <hr />
      </div>

    );
  } else if (diagnosis !== undefined) {


      return(
        <div key={elem.id}>
          <div>{elem.type}</div>
          <div>{elem.date} - {elem.description}</div>
          <div>healthCheckRating: {elem.healthCheckRating}</div>
          <ul>{elem.diagnosisCodes.map(code => {
            return(

              <li key={code}>{code} - {diagnosis[code].name}</li>

            );
          })}</ul>
          <div>{elem.specialist}</div>
          <hr />
        </div>

      );
  } else {
    return(
      <div>cargando</div>
    );

  }


};

const IndividualPage = () => {

  const [{ individuals }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();



  //console.log(Object.values(individuals));

  const ind = Object.values(individuals).find(element => element.id == id);

  if (ind !== undefined) {

    console.log('YEEP, found in state!!!!');

    return(
      <div>
        <h2>{ind.name}</h2>
        <p>{ind.gender}</p>
        <p>{ind.ssn}</p>
        <p>{ind.occupation}</p>
        <div>
          <h3>Entries</h3>
          <div>{ind.entries.map(elem => {

            switch (elem.type) {
              case "Hospital":
                return <HospitalEntryComp elem={elem} />;

                break;
              case "OccupationalHealthcare":
                return <OccupationalHealthcareEntryComp elem={elem} />;

                break;
              case "HealthCheck":
                return <HealthCheckEntryComp elem={elem} />;

                break;
              default:
                break;
            }



          })}</div>
        </div>
      </div>
    );
  }


  const fetchIndividualPacient = async () => {
    try {

      const { data: newPatient }  = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setIndividual(newPatient));

    } catch (e) {
      console.error(e);
    }

  };

  const fetchDiagnosis = async () => {
    try {

      const { data: diagnosisList }  = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses/`
      );
      dispatch(setDiagnoseList(diagnosisList));

    } catch (e) {
      console.error(e);
    }

  };
  void fetchDiagnosis();
  void fetchIndividualPacient();


  console.log('not found in state');

  return(
    <div>cargando</div>
  );


};

export default IndividualPage;