import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { URL } from "../../../URL";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      // setLoading(true);

      let fileUpload = values.images; //[]
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${URL}images`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                // alert(JSON.stringify(allfileUpload ))
                // setLoading(false);
                fileUpload.push(res.data);
                // console.log("allfileupload in then", allfileUpload);
                setValues({ ...values, images: fileUpload });
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    // alert("remove" + public_id);

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(public_id);
        const { images } = values;
        axios
          .post(
            `${URL}images` + "/removeimages",
            { public_id },
            {
              headers: {
                authtoken: user.token,
              },
            }
          )
          .then((res) => {
            let filterImages = images.filter((item) => {
              return item.public_id !== public_id;
            });
            setValues({ ...values, images: filterImages });
            // setLoading(false);
          })
          .catch((err) => {
            // setLoading(false);
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <br />
      {/* images: {JSON.stringify(values)} */}
      <div className="grid gap-6 px-2 py-2 pt-2 md:grid-cols-5 lg:grid-cols-5">
        {values?.images
          ? values.images.map((c) => (
              <div
                onClick={() => handleRemove(c.public_id)}
                style={{ cursor: "pointer" }}
                count="X"
              >
                {/* img: {c.public_id} */}
                <img src={c.url} shape="square" className="h-32" />
              </div>
            ))
          : null}
      </div>
      <hr />
      <div className="mx-5 mt-5">
        <div className="my-2 text-gray-500"> ภาพที่ใช้ได้ png jpg jpeg </div>
        <label className="px-5 py-2 text-xl text-white bg-green-500 rounded-md">
          เลือกภาพ...
          <input
            onChange={handleChangeFile}
            type="file"
            hidden
            multiple
            accept="images/*"
            name="file"
          />
        </label>
      </div>
      <br />
    </div>
  );
};

export default FileUpload;
