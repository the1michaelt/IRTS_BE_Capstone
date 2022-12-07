import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const EnrolledStudentsPage = () => {

    const [user, token] = useAuth();
    const [persons, setPersons] = useState([]);

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
            <br /><><><div className="container">
                {persons.map((person) => (
                    <div key={person.id}>
                        <hr />
                        <span>{person.first_name} {person.last_name} | </span>
                        <span>LAST SEM: {person.semester} | </span>
                        <span>GPA: {person.gpa} |</span>
                        <span>CR EARNED: {person.credits_earned} | </span>
                       <div className="schedule-button">
                            <button type='submit'>Select</button>
                        </div>  
                    </div>
                ))}

                {console.log('Return in Grad_ready', persons)}
            </div>
            </></></>
    );
};

export default EnrolledStudentsPage;

