import React, { Component } from "react";
import "../css/download.css";
import axios from "axios";

class Download extends Component {
  state = {
    dates: [...this.props.dates],
    text: [...this.props.text],
    start: 0,
    end: this.props.dates.length,
    process: "Process",
    processColor: "",
    download: "Download"
  };

  createFile = async () => {
    const data = {
      start: this.state.start,
      end: this.state.end,
      text: this.state.text,
    };
    this.setState({ process: "processing..." });
    await axios.post("http://localhost:8000/create_file", data).then(() => {
      console.log("processing completed!");
      this.setState({ process: "Done!", processColor: "bg-success" });
    });
  };

  downloadFile = async () => {
    this.setState({download:"Downloading..."});
    await axios
      .get("http://localhost:8000/generated_file", {
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "generated.docx");
        link.click();
      })
      .finally(() => {
        this.props.reset();
      });
  };

  render() {
    return (
      <div className="App-header">
        <div className="container">
          <div className="col text-center main-container">
            <div className="d-flex">
              <div className="d-flex flex-column col w-50">
                <select
                  className="form-select mt-2 mr-2 mb-2 bg-primary text-light"
                  aria-label="Default select example"
                  onChange={(e) => {
                    this.setState({ start: e.target.value, process:"Process", processColor: "" });
                  }}
                >
                  <option>Start</option>
                  {this.state.dates.map((val, index) => {
                    return (
                      <option key={index} value={index + 1}>
                        {val}
                      </option>
                    );
                  })}
                </select>
                <div className="text-container w-100">
                  {this.state.text[this.state.start]}
                </div>
              </div>
              <div className="d-flex flex-column col w-50">
                <select
                  className="form-select mt-2 mr-2 mb-2 bg-primary text-light"
                  aria-label="Default select example"
                  onChange={(e) => {
                    this.setState({ end: e.target.value, process:"Process", processColor: "" });
                  }}
                >
                  <option>End</option>
                  {this.state.dates.map((val, index) => {
                    return (
                      <option key={index} value={index + 1}>
                        {val}
                      </option>
                    );
                  })}
                </select>
                <div className="text-container w-100">
                  {this.state.text[this.state.end]}
                </div>
              </div>
            </div>
            <button
              className={"btn w-100 mt-3 " + this.state.processColor}
              onClick={async () => {
                await this.createFile();
              }}
              disabled={
                (this.state.file === "") | (this.state.process === "Done!")
              }
            >
              {this.state.process}
            </button>
            <button
              className="btn w-100 mt-3"
              onClick={async () => {
                await this.downloadFile();
              }}
              disabled={this.state.process === "Process"}
            >
              {this.state.download}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
