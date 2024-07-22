import React, { Component } from "react";
import ReactQuill,{Quill} from "react-quill";
import ImageUploader from "quill-image-uploader";
import './index.css';



Quill.register("modules/imageUploader", ImageUploader);

class Editor extends Component {

  modules = {
   
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ],
    
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "http://localhost:3001/upload",
            {
              method: "POST",
              body: formData
            }
          )
            .then((response) => response.json())
            .then((result) => {
              resolve(result.url);
            })
            .catch((error) => {
              reject("Upload failed");
            });
        });
      }
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot" 
  ];

  shouldComponentUpdate(nextProps,nextState) {
    if (this.props.value !== nextProps.value) {
        return true;
    }
    return false;
}
  
  render() {
    const { onChange,value } = this.props;  
    return (
      <>
          <ReactQuill
          className="react-quill"
          theme="snow"
          style={{
              minHeight: "20vh",
              backgroundColor: "white"
          }}
          modules={this.modules}
          formats={this.formats}
            value={value}
          onChange={onChange}
        />     
      </>
    );
  }
}

export default Editor;
