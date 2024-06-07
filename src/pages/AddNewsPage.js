import React, { useEffect, useState } from 'react'
import { getDetailsForAddNews,addNewNews } from '../service/news';
import { useNavigate } from 'react-router-dom';
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

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
  
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
  };

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
    console.log(e);
    setNewsDetail((prov)=>{
      return {
        ...prov,
        [e.target.name] : e.target.value
      }
    })
  }

  const handleChangeTextEditor = (e) => {
    setNewsDetail((prov)=>{
      return {
        ...prov,
        ['discription']:e
      }
    });
    // console.log(e);
  }

  const addNews = () =>{
    if(editors['title'] != '' && editors['editor_id'] != '' && editors['category'] != '' && editors['discription'] != ''){

      const formData = new FormData();
      formData.append('details', JSON.stringify(newsDetail));
      formData.append('file', file);

      console.log(formData);
      console.log(newsDetail);

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
                {/* <textarea name="discription" onChange={(e)=>{ handleChangeTextEditor(e); }} id="discription" className="mx-3 mt-3" placeholder='News Discription'></textarea> */}
                <div >
                <div style={{ display: "grid", justifyContent: "center"}} className='mt-3 mb-5'>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="write your content ...."
                    onChange={(e)=>{ handleChangeTextEditor(e)}}
                    style={{ height: "220px" }}
                  >
                  </ReactQuill>
                </div>
              </div>
                <button className='btn btn-primary mx-3 my-3' onClick={()=>{ addNews() }}> submit </button>
            </div>
        </div>
    </>
  )
}

export default AddNewsPage