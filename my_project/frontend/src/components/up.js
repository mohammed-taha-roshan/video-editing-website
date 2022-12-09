import { useEffect, useState } from "react"
import "./navbar.css"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { saveAs } from "file-saver";
import * as React from 'react';
import { useNavigate } from "react-router-dom";

const ffmpeg = createFFmpeg({ log: true });
var st = 0;
var en = 0;

function Upp() {

  const navigate=useNavigate();
  const [video, setVideo] = useState();
  const [name, setName] = useState()
  const [start,setStart]=useState()
  const [end,setEnd]=useState()
  const [filter, setFilter] = React.useState('filter');

  const init = async () => {
    await ffmpeg.load();
  };
  
  const setVid = (e) => {
    setVideo(e.target.files?.item(0))
    setName(e.target.files[0].name)
  }

  const getStart = (st) => {
    setStart(st.target.value)
  }

  const getEnd = (en) => {
    setStart(en.target.value)
  }

  const handleFilterChange = (event) => {

   setFilter(event.target.value);

 };

  const convertToGif = async () => {
    await ffmpeg.FS('writeFile', name, await fetchFile(video));
    await ffmpeg.run('-i', name, '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'output.gif');
    const datagif = ffmpeg.FS('readFile', 'output.gif');
    const url = URL.createObjectURL(
      new Blob([datagif.buffer], { type: 'image/gif' }),
    );
    saveAs(url, "output.gif");
  };

  const trimVideo = async () => {
    await ffmpeg.FS('writeFile', name, await fetchFile(video));
    await ffmpeg.run('-i', name,'-ss', "00:00:01", '-to', "00:00:02", 'output.mkv');
    const datatrim = ffmpeg.FS('readFile', 'output.mkv');
    const url = URL.createObjectURL(
      new Blob([datatrim.buffer], { type: 'video/mkv' }),
    );
    saveAs(url, "output.mkv");
  };

  const bwFilter = async () => {
    await ffmpeg.FS('writeFile', name, await fetchFile(video));
    await ffmpeg.run('-i', name, "-vf", "hue=s=0", 'output.mkv');
    const datatrim = ffmpeg.FS('readFile', 'output.mkv');
    const url = URL.createObjectURL(
      new Blob([datatrim.buffer], { type: 'video/mkv' }),
    );
    saveAs(url, "output.mkv");
  };

  const grayscaleFilter = async () => {
    await ffmpeg.FS('writeFile', name, await fetchFile(video));
    await ffmpeg.run('-i', name, "-vf", "format=gray", 'output.mkv');
    const datatrim = ffmpeg.FS('readFile', 'output.mkv');
    const url = URL.createObjectURL(
      new Blob([datatrim.buffer], { type: 'video/mkv' }),
    );
    saveAs(url, "output.mkv");
  };

  const sepiaFilter = async () => {
    await ffmpeg.FS('writeFile', name, await fetchFile(video));
    await ffmpeg.run('-i', name, "-filter_complex", "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131", "-pix_fmt", "yuv420p", 'output.mkv');
    const datatrim = ffmpeg.FS('readFile', 'output.mkv');
    const url = URL.createObjectURL(
      new Blob([datatrim.buffer], { type: 'video/mkv' }),
    );
    saveAs(url, "output.mkv");
  };


useEffect(() => {
  init();
}, []);

return (
  <div className="first">
    <nav>
           <img
            src={require("./images/video_edit2.png")}
            alt=""
            className="vid1"
          />
          <p>FileName:{name}</p>
          <button
            className="logot"
             onClick={() => {
              navigate("/");
            }}
          >Logout
          </button>
          {/* <p></p> */}
          <button className="logot" onClick={() => {
              navigate("/chat");
            }} >Chat Box</button>
          {/* <img src={require('./images/profile.png')} alt="" className="prof" /><h2>Profile</h2> */}
        </nav>
  <div className="app-window">
    <header className="App-header">
    <div className="input-window">
      <input type="file" onChange={(e) => setVid(e)} className="input-video" />
      {video && (
        <video controls width="750" src={URL.createObjectURL(video)} className="play-video"></video>
      )}
      </div>
    {/* ------ */}

      <div className="controls">
      <div className="trim">
      <div className="trim-time">
      <input type="text" id="starttime" placeholder="start_time" onChange={(st) => getStart(st)} /><p></p>
      <input type="text" id="starttime" placeholder="end_time" onChange={(en) => getEnd(en)} />
      </div>
      <div className="trim-button">
      <button onClick={trimVideo} className="trim-button1">Trim Video</button>
      </div>
      </div>
      
      <div >
      <button className="gif" onClick={convertToGif}>Convert to GIF</button>
      </div>

      <div className="filter">
      <div > 
      <button className="filter-button" onClick={bwFilter}>Apply Black & White Filter </button>
      </div>
      <div >
      <button className="filter-button" onClick={grayscaleFilter}>Apply Grayscale Filter</button>
      </div>
      <div >
      <button className="filter-button" onClick={sepiaFilter}>Apply Sepia Filter</button>
      </div>
      </div>
      
      </div>
    </header>
  </div>
  </div>
)
}
export default Upp;