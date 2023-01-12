import React from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
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
      </div>
    );
  }


  const fetchIndividualPacient = async () => {
    try {

      const { data: newPatient }  = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "INDIVIDUAL", payload: newPatient });

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
