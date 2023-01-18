import React from "react";
import axios from "axios";
import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setIndividual, setDiagnoseList } from "../state";
import { useParams } from "react-router-dom";

const IndividualPage = () => {

  const [{ diagnosis, individuals }, dispatch] = useStateValue();

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
            if (elem.diagnosisCodes == undefined) {
              return(
                <div key={elem.id}>
                  <div>{elem.date} - {elem.description}</div>

                </div>

              );
            } else if (diagnosis !== undefined) {
                console.log('SSSSSSSSSSSSSSSSSSSSSSSSS');
                console.log(diagnosis);
                return(
                  <div key={elem.id}>
                    <div>{elem.date} - {elem.description}</div>
                    <ul>{elem.diagnosisCodes.map(code => {
                      return(

                        <li key={code}>{code} - {diagnosis[code].name}</li>

                      );
                    })}</ul>
                  </div>

                );
            } else {
              return(
                <div>cargando</div>
              );

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