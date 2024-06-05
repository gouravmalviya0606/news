import React, { useEffect, useState } from 'react'
import { getDetailsForAddNews,addNewNews } from '../service/news';
import { useNavigate } from 'react-router-dom';

const AddNewsPage = () => {

  const navigate = useNavigate();
  const [editors,setEditors] = useState([{
    'title':'',
    'category':'',
    'editor_id':'',
    'discription':'',
  }]);
  const [newsDetail,setNewsDetail] = useState({
    'token':''
  });
  const [file,setFile] = useState(null);

  useEffect(()=>{
    // getDetails();
    setNewsDetail((prov)=>{
      return {
        ...prov,
        'token':localStorage.getItem('token')
      }
    });
  },[])

  // const getDetails = () => {
  //   const res = getDetailsForAddNews();
  //   res.then((data)=>{
  //     setEditors(data['editors']);
  //   })
  // }

  const handleChange = (e) => {
    setNewsDetail((prov)=>{
      return {
        ...prov,
        [e.target.name] : e.target.value
      }
    })
  }

  const addNews = () =>{
    if(editors['title'] != '' && editors['editor_id'] != '' && editors['category'] != '' && editors['discription'] != ''){

      const formData = new FormData();
      formData.append('details', JSON.stringify(newsDetail));
      formData.append('file', file);

      console.log(formData);

      let res = addNewNews(formData);
      res.then((data)=>{
        if(data['status'] === 200){
          navigate('/admin-home');
        }
      });
    }
    else{
    }
  }

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <>
        <div className='container'>
            <h3 className='mt-3'>Add a news</h3>
            <div className='card mt-3'>
                <input type="text" className="mx-3 mt-3" name="title" onChange={(e)=>{ handleChange(e); }} id="news-title" placeholder='News Title'/>
                <input type="file" className="mx-3 mt-3" onChange={onFileChange} name="news-img" id="news-img" />
                <select name="category" onChange={(e)=>{ handleChange(e); }} className="mx-3 mt-3" id="news-category">
                    <option value="education">Categories</option>
                    <option value="education">Education</option>
                    <option value="politics">Politics</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="crime">Crime</option>
                    <option value="sport">Sport</option>
                </select>
                {/* <select name="editor_id" onChange={(e)=>{ handleChange(e); }} className="mx-3 mt-3" id="news-editors">
                  <option value="">Editor</option>
                  {
                    editors.map((data)=>{
                      return (
                        <>
                          <option value={data.id}>{data.name}</option>
                        </>
                      )
                    })
                  }
                </select> */}
                <textarea name="discription" onChange={(e)=>{ handleChange(e); }} id="discription" className="mx-3 mt-3" placeholder='News Discription'></textarea>
                <button className='btn btn-primary mx-3 my-3' onClick={()=>{ addNews() }}> submit </button>
            </div>
        </div>
    </>
  )
}

export default AddNewsPage