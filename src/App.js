import { useEffect, useState } from 'react';
import './App.css';
import BdnCategory from './components/BdnCategoryList';
import axios from "./api/BdnApi";
import BdnCategoryForm from './components/BdnCategoryForm';


function BdnApp() {
  // lấy dữ liệu từ api
  const [BdnCategories, setBdnCategories] = useState([]);

  const getCategories = async () => {
    try {
      const BdnCateResponse = await axios.get("BdnCategory");
      setBdnCategories(BdnCateResponse.data);
    } catch (error) {
      console.log("lỗi:", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("BdnCategories:", BdnCategories);
  }, [])

  //trạng thái form
  const [BdnCategoryIsForm, setBdnCategoryIsForm] = useState(false);
  //dữ liệu form : Add/Edit
  let BdnCategoryInit = {
    BdnId: 0,
    BdnCategoryName: "",
    BdnCategoryStatus: true,
}
  const [BdnCategoryEdit, setBdnCategoryEdit] = useState(BdnCategoryInit);
  const BdnHandleAddNew = (param) => {
    setBdnCategoryIsForm(param);
  }
  const BdnHandleCategoryCloseForm = (param) => {
    setBdnCategoryIsForm(param);
  }
  const BdnHandleCategorySubmit = (param) => {
    let id = BdnCategories[BdnCategories.length - 1].BdnId;
    console.log("Mã:", id);
    param.BdnId = id + 1;
    BdnCategories.push(param);
    setBdnCategories((prev) => {
      return [...prev];
    })
    setBdnCategoryIsForm(false);
  }
  //hàm xử lý sự kiện xóa
  const BdnhandleDelete = (BdnId)=>{
    console.log("App-Delete-BdnId:",BdnId);
    // const BdnResponse = axios.delete(`https://666c2e2e49dbc5d7145cfd4f.mockapi.io/Bdnapi/Bdnv1/BdnCategory/${BdnId}`);
    const BdnResponse = axios.delete(`BdnCategory/${BdnId}`);
    console.log("BdnResponse-Delete",BdnResponse);
    let Bdndelete = BdnCategories.filter(x=>x.BdnId !== BdnId);
    setBdnCategories(Bdndelete);
    console.log("Deleted:",Bdndelete);
  }
  const BdnhandleEdit =(BdnCategory)=>{
    setBdnCategoryEdit(BdnCategory);
    setBdnCategoryIsForm(true);
  }
  return (
    <div className="container border my-3">
      <h1>bui duc nguyen - Call API</h1>

      <BdnCategory renderBdnCategories={BdnCategories}
        onAddNew={BdnHandleAddNew}
        onBdnDelete={BdnhandleDelete} 
        onBdnEdit={BdnhandleEdit}/>
      <hr />
      {
        BdnCategoryIsForm === true ? <BdnCategoryForm
          renderBdnCategory = {BdnCategoryEdit}
          oncloseForm={BdnHandleCategoryCloseForm}
          onCategorySubmit={BdnHandleCategorySubmit} /> : ""
      }

    </div>
  );
}
export default BdnApp;