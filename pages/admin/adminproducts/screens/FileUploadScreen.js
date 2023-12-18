import React, { useState, useEffect } from "react";
import { singleFileUpload, multipleFilesUpload } from "../data/api.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from 'axios';
import { URL } from './../../../../URL';
//const apiUrl = 'http://45.150.131.95:4000/api/';

const FileUploadScreen = (props) => {
  const [singleFile, setSingleFile] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [title, setTitle] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);


  const FileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append("title", title);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await axios.post( `${URL}images` +'/multipleFiles', formData, mulitpleFileOptions);
    // await multipleFilesUpload(formData,mulitpleFileOptions);
    // await axios.post(apiUrl + 'multipleFiles', data, options);
    props.getMultiple();
  };
  return (
    <div className="mt-3 row">
      <div className="col-6">
        <div className="row">
          <div className="col-6">
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title for your gallery"
              className="form-control"
            />
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Select Multiple Files</label>
              <input
                type="file"
                onChange={(e) => FileChange(e)}
                className="form-control"
                multiple
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <button
              type="button"
              onClick={() => UploadMultipleFiles()}
              className="btn btn-danger"
            >
              Upload
            </button>
          </div>
          <div className="w-32">
            <CircularProgressbar
              value={multipleProgress}
              text={`${multipleProgress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                textColor: "#f88",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadScreen;
