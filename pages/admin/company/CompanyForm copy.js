import React from "react";


const CompanyForm = ({
  company,
  companyImage,
  imagePreview,
  handleInputChange,
  handleImageChange,
  saveCompany,
}) => {
  return (
    <div className="container w-full mx-16 ">

      xx =>{JSON.stringify(company)}


      <h1 className="text-xl">รายละเอียดร้านค้า</h1>
      <div className="flex">
        <form onSubmit={saveCompany}>
          <label>ชื่อร้านค้า</label>
          <input
            type="text"
            placeholder="ชื่อร้านค้า"
            name="name"
            className="flex p-1 mb-2 border border-gray-400 w-96"
            value={company.name}
            onChange={()=>{alert("ch")}}
          />
        <label>ที่อยู่:</label>
          <input
            type="text"
            placeholder="ที่อยู่"
            name="address"
            className="flex p-1 mb-2 border border-gray-400 w-96"
            value={company?.address}
            onChange={handleInputChange}
          />
        <label>เบอร์โทร:</label>
          <input
            type="text"
            placeholder="เบอร์โทร"
            name="phone"
            className="flex p-1 mb-2 border border-gray-400 w-96"
            value={company?.phone}
            onChange={handleInputChange}
          />
                <label>คำอธิบาย:</label>
          <input
            type="text"
            placeholder="คำอธิบาย"
            name="description"
            className="flex p-1 mb-2 border border-gray-400 w-96"
            value={company?.description}
            onChange={handleInputChange}
          />
          <div className="">
            <div className="mt-5">ชนิดรูปภาพที่ใช้ได้: jpg, jpeg, png</div>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="my-2 ">
                <img
                  src={imagePreview}
                  alt="company"
                  className="cover-fill max-w-[100px] max-h-[100px] "
                />
              </div>
            ) : (
              <p className="my-10">No image set for this company.</p>
            )}
          </div>

          <div className="mt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 rounded-md "
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
