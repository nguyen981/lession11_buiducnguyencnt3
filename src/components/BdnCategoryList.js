import React from 'react'

export default function BdnCategory({ renderBdnCategories, onAddNew, onBdnDelete, onBdnEdit }) {
    console.log("renderBdnCategories: ", renderBdnCategories);
    let BdnCategoriesElement = renderBdnCategories.map((BdnCategory, index) => {
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{BdnCategory.BdnId}</td>
                <td>{BdnCategory.BdnCategoryName}</td>
                <td>{BdnCategory.BdnCategoryStatus === true ? "Hiển Thị" : "Tạm Khóa"}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => BdnhandleDelete(BdnCategory.BdnId)}>Delete</button>
                    <button className='btn btn-success' onClick={() => BdnhandleEdit(BdnCategory)}>Edit</button>
                </td>
            </tr>
        )
    })
    const BdnhandleDelete = (BdnId) => {
        if (window.confirm('Bạn Có Muốn Xóa ['+BdnId+'] Không?')) {
            console.log("Delete:", BdnId);
            onBdnDelete(BdnId);
        } else {

        }
    }
    const BdnhandleEdit = (BdnCategory)=>{
        onBdnEdit(BdnCategory);
    }

    const BdnHandleAdd = () => {
        onAddNew(true);
    }
    return (
        <div className='container m-2'>
            <h2>Danh Sách Loại Sản Phẩm</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {BdnCategoriesElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={BdnHandleAdd}>Thêm Mới</button>
        </div>
    )
}