import React, { useEffect, useState } from 'react'
import axios from "../api/BdnApi";

export default function BdnCategoryForm({ oncloseForm, onCategorySubmit, renderBdnCategory }) {
    //state 
    const [BdnId, setBdnId] = useState(0);
    const [BdnCategoryName, setBdnCategoryName] = useState("");
    const [BdnCategoryStatus, setBdnCategoryStatus] = useState(true);

    useEffect(() => {
        setBdnId(renderBdnCategory.BdnId);
        setBdnCategoryName(renderBdnCategory.BdnCategoryName);
        setBdnId(renderBdnCategory.BdnCategoryStatus);
    });
    const BdnHandleClose = () => {
        oncloseForm(false);
    }
    const BdnHandleSubmit = async (event) => {
        event.preventDefault();
        if (BdnId === 0) { //thêm
            let BdnCategory = {
                BdnId: 0,
                BdnCategoryName: BdnCategoryName,
                BdnCategoryStatus: BdnCategoryStatus
            }
            await axios.post("BdnCategory", BdnCategory);
            onCategorySubmit(BdnCategory);
        } else {//sửa
            let BdnCategory = {
                BdnId: BdnId,
                BdnCategoryName: BdnCategoryName,
                BdnCategoryStatus: BdnCategoryStatus
            }
            await axios.put("BdnCategory", BdnCategory);
            onCategorySubmit(BdnCategory);
        }
    }
    return (
        <div>
            <form>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" class="form-control" name='BdnCategoryName'
                        value={BdnCategoryName}
                        onChange={(ev) => setBdnCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Status</span>
                    <select className='form-control'
                        name='BdnCategoryStatus'
                        value={BdnCategoryStatus}
                        onChange={(ev) => setBdnCategoryStatus(ev.target.value)}>
                        <option value={true}>Hiển Thị</option>
                        <option value={false}>Tạm Khóa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={BdnHandleSubmit}>Ghi Lại</button>
                <button className='btn btn-danger' onClick={BdnHandleClose}>Đóng</button>
            </form>
        </div>
    )
}