import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllNews } from '../service/news';
import { getAdminNews } from '../service/news';

const Home = ({user}) => {

    const navigate = useNavigate();
    const [news,setNews] = useState([]);

    useEffect(()=>{
        getNews();
    },[])

    const getNews = () => {
        if(user === 'ADMIN'){
            const token = localStorage.getItem('token');
            const res = getAdminNews(token);
            res.then((data)=>{
                setNews(data.data);
                console.log(data.data);
            })
        }
        else{
            const res = getAllNews();
            res.then((data)=>{
                setNews(data.data);
                console.log(data.data);
            })
        }


        console.log(news);
    }
    
  return (
    <>
        <div className='container'>
            {
                user == "ADMIN" 
                    ?<>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-primary mt-3' onClick={()=>{navigate('/add-news');}}>Add a NEWS</button>
                        </div>
                        <h3>Your News</h3>
                    </> 
                    : <></>
            }
            {
                news.length != 0 ? (news.map((data)=>{
                    return (
                        <>
                            <div className='card mt-3'>
                                <h3 className='mt-3 ms-3'>{data.title}</h3>
                                <p className='d-flex justify-content-end me-3'><span className='bg-warning text-dark p-1'>{ new Date(data.created_at).toLocaleString() }</span> <span className='bg-success text-white p-1'>{data.editor_name}</span> </p>
                                <div className="d-flex justify-content-center mt-3">
                                    <img className='img-fluid fixed-size-img' src={data.unique_name} alt="" />
                                </div>
                                <span className='bg-dark p-1 mt-3'></span>
                                <div className='ms-3 mt-3'>
                                    <p className='p-3'>
                                        {/* {data.discription} */}

                                        <div dangerouslySetInnerHTML={{ __html: data.discription }} />
                                    </p>
                                </div>
                            </div>
                        </>
                    )
                })) : <> <div className='card p-3 mt-3'>no news</div> </>
            }
        </div>
    </>
  )
}

export default Home