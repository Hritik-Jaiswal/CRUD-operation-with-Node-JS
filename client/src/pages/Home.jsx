import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Home = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchAllStud = async () => {
            try{
                const res = await axios.get('http://localhost:8800/students')
                setStudents(res.data)
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllStud()
    },[])

    const handleClick = async (id) => {
        try {
            await axios.delete('http://localhost:8800/students/'+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div>
            <h1>Student Informataion Database</h1>
            <div className="students-container">
                {students.map(student => (
                    <div className="student-container" key={student.id}>
                        { student.picture && <img src={student.picture} alt=''/> }
                        <h2>{student.first_name} {student.surname}</h2>
                        <p>Class:-{student.class}</p>
                        <p>D.O.B:- {student.dob}</p>
                        <p>{student.gender}</p>
                        <button className="delete" onClick={() => handleClick(student.id)}>Delete</button>
                        <button className="update"><Link className='link' to={`/update/${student.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className='form-btn'>
                <Link className='link-add' to={'/add'}>Add a student info</Link>
            </button>
        </div>
    )
}

export default Home