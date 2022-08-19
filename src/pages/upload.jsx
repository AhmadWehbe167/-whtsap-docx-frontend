import React, { Component } from "react";
import logo from "../assets/logo.jpg";
import axios from "axios";
import Download from "./download";

class Upload extends Component {
  state = {
    file: "",
    reveal: false,
    dates: [],
    text: [],
    upload: "Upload",
  };

  uploadFile = async () => {
    var formData = new FormData();
    formData.append("file", this.state.file);
    this.setState({ upload: "uploading..." });
    await axios
      .post("https://whtsap-docx.herokuapp.com/uploadfile", formData)
      .then((val) => {
        var dates = val.data.matches;
        const text = val.data.text;
        dates = dates.map((val) => {
          return val.split("-")[0];
        });
        const reveal = true;
        this.setState({ dates, reveal, text, upload:"Upload" });
      });
  };

  handleReset = () => {
    const file = "";
    const reveal = false;
    this.setState({ file, reveal });
  };

  render() {
    return !this.state.reveal ? (
      <div className="App-header">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <div className="col-md-4 text-center">
            <img src={logo} className="w-75 h-75" alt="logo" />
            <input
              className="form-control"
              accept=".txt"
              onChange={async (e) => {
                if (e.target.files[0]) {
                  this.setState({ file: e.target.files[0] });
                }
              }}
              type="file"
              id="formFile"
            />
            <button
              className="btn w-100 mt-3"
              onClick={async () => {
                await this.uploadFile();
              }}
              disabled={this.state.file === ""}
            >
              {this.state.upload}
            </button>
          </div>
        </div>
      </div>
    ) : (
      <Download
        dates={this.state.dates}
        text={this.state.text}
        reset={this.handleReset}
      />
    );
  }
}

export default Upload;
