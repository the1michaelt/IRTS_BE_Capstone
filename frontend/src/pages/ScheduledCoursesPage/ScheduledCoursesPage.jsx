import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';

const ScheduledCoursesPage = (props) => {

    const [user, token] = useAuth();
    const [availableCourses, setAvailableCourses] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/get_available_courses/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setAvailableCourses(response.data);
            } catch (error) {
                console.log('Error in AvailableCourses', error);
            }
        };
        fetchAvailableCourses();
    }, [token]);


    const selectCourse = async (courseId) => {
        let courseObject = {
            // "user_id": user.id,
            "course_id": courseId,
        }
        {console.log(courseObject)}
        try {
            let response = await axios.delete(`http://127.0.0.1:8000/api/student_courses/delete_courses/`,
                // courseObject,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    courseObject},
                    // data: {
                    //     source: courseObject
                    // }
                    // courseObject
                });
            console.log('disenroll', courseObject)
            setApplyCourse(response.data)
            navigate(`/course_schedule/`)
        } catch (error) {
            console.log('error in disenroll', error.response)
        }

    };

    return (
        <><h1>Your Course Schedule, <br />{user.first_name} {user.last_name}, ID# {user.id}</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>COURSES ENROLLED: TBD </h2>
            <h2>CREDITS ATTEMPTED THIS SEMESTER: TBD</h2>
            <h2><Link to={`/courses_available/`}>View Available Courses</Link></h2>
            <h2><Link to="/course_transcript">View Transcript</Link></h2>
            <br /><><><div>
                {availableCourses.map((course) => (
                    <div key={course.id} className="container">
                        {console.log('course', course)}
                        <hr />
                        <span className="schedule-button">
                            <button type='submit' onClick={() => selectCourse(course.id)}>Disenroll</button>
                        </span>
                        <span><Link to={`#`} className="dummy">| {course.name} |</Link> </span>
                        <span>DAYS: M, T, W |</span>
                        <span>CR VALUE: {course.credit_value} |</span>
                        <span>LOC: ONLN |</span>
                        <span>AUG - DEC </span>

                    </div>
                ))}
            </div><div className="page-bottom"></div>
            </></></>
    );
};

export default ScheduledCoursesPage;

