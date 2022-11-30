import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const AllCourses = () => {

    const [user, token] = useAuth();
    const [items, setItems] = useState([]);
// ${searchTerm}
    useEffect(() => {
        const fetchItems = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/courses/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in AllCourses', items)
                setItems(response.data);
            } catch (error) {
                console.log('Error in AllCourses', error);
            }
        };
        fetchItems();
    }, [token]);
    return (
        <><h2>Current Available Courses</h2><><><div>
            {   items.map((item) => (
                    <p key={item.id}>
                    {item.name}, POSS CR {item.credit_value}
                    {/* {items.student.first_name} {items.student.last_name}, {items.course.year_semester} SEM,  {items.course.name}, GPA {persons.student.gpa}, {persons.student.credits_earned} CR ACCUM */}
                    </p>
                    ))}
            
            {console.log('Return in AllCourses', items)}
        </div>
        </></></>
    );
};

export default AllCourses;


