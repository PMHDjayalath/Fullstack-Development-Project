import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Reviews() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const [reviews, setreviews] = useState([])
    let navigate = useNavigate()
    const loadReviews = async () => {
        let response = await fetch("https://foodconeback.onrender.com/api/reviewDetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json()
        setreviews(response[0])
    }

    useEffect(() => {
        loadReviews()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }));
        const response = await fetch("https://foodconeback.onrender.com/api/givereviews", {
         
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: credentials.message, name: credentials.name, jobrole: credentials.jobrole, city: credentials.city })
    
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
         
          alert("Feedback Added! Thank You!")
          navigate("/reviews")
    
        }
        else {
          alert("Enter Valid Details")
        }
      }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container' id='reviewbody'>
                <div className="mgb-40 padb-30 auto-invert line-b-4 mt-5">
                    <center>
                        <h2 className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg align-center" contenteditable="false">Read Customer Reviews</h2>
                    </center>
                </div>
                {
                    reviews.length !== 0
                        ? reviews.map((data) => {
                            return (

                                <div className="hash-list cols-3 cols-1-xs pad-30-all align-center text-sm">
                                    
                                        <center>
                                            <p className="fs-110 font-cond-l" contenteditable="false">"{data.message}"</p>
                                            <h5 className="font-cond mgb-5 fg-text-d fs-130" contenteditable="false">{data.name}</h5>
                                            <small className="font-cond case-u lts-sm fs-80 fg-text-l" contenteditable="false">{data.jobrole} - {data.city}</small>
                                            <div class="ratings-icons">
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                            <hr></hr>
                                        </center>
                                   

                                </div>
                            )
                        })
                        : <div>""""""</div>
                }
                <div className="mgb-40 padb-30 auto-invert line-b-4 mt-5">
                    <center>
                        <h2 className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg align-center" contenteditable="false">Give A Feedback</h2>
                    </center>
                </div>
                <form className='w-50 m-auto mt-5 border bg-white border-warning rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label ">Name</label>
                        <input type="text" className="form-control" name='name' onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label ">Job Role</label>
                        <input type="text" className="form-control" name='jobrole' onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label ">City</label>
                        <input type="text" className="form-control" name='city' onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label ">Message</label>
                        <fieldset>
                            <input type="text" className="form-control" name='message' onChange={onChange} aria-describedby="emailHelp" />
                        </fieldset>
                    </div>
                    <button type="submit" className="m-3 btn btn-warning">Submit Feedback</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}




