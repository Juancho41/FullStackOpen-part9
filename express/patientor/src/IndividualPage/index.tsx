import React from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setIndividual } from "../state";
import { useParams } from "react-router-dom";

const IndividualPage = () => {

  const [{ individuals }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();



  console.log(Object.values(individuals));

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
            }

            return(
              <div key={elem.id}>
                <div>{elem.date} - {elem.description}</div>
                <ul>{elem.diagnosisCodes.map(code => {
                  return(

                    <li key={code}>{code}</li>

                  );
                })}</ul>
              </div>

            );
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
  void fetchIndividualPacient();
  console.log('not found in state');

  return(
    <div>cargando</div>
  );


};



export default IndividualPage;