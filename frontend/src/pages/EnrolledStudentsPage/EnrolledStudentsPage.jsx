import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//EMPLOYEES ONLY
const EnrolledStudentsPage = () => {

    const [user, token] = useAuth();
    const [persons, setPersons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/auth/enrolled/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in all students', persons)
                setPersons(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchPersons();
    }, [token]);
    return (
        <><h1>Enrolled Students</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>THIS SEMESTER: AUG 1 - NOV 30 </h2>
            <h2>NEXT SEMESTER: DEC 1 - FEB 28 </h2>
            <br /><><><div className="container">
                {persons.map((person) => (
                    <div key={person.id}>
                        <hr /><div>
                            {console.log('person', person)}
                            <span><Link to={`/scheduled/${person.id}/`}>{person.first_name} {person.last_name}</Link> | </span>
                        <span>SEM: {person.semester} | </span>
                        <span>ACTIVE | </span>
                        <span>FULL-TIME | </span>
                        <span>ADM DATE: AUG | </span>
                        <span><Link to="/enrolled">CONTACT INFO </Link> </span></div>
                        
                    </div>
                ))}

                {console.log('Return in Grad_ready', persons)}
            </div>
            </></></>
    );
};

export default EnrolledStudentsPage;


