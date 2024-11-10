import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from "axios";
import '../Category/Category.css';
import { Link } from 'react-router-dom';
export default function Category() {
    const [currentView, setCurrentView] = useState('overview'); // Quản lý view hiện tại
    const [icon, setIcon] = useState([]);
    const [selectedIconId, setSelectedIconId] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Trạng thái kiểm tra khi form đã được gửi
    const token = localStorage.getItem("token");

    const [classify, setClassify] = useState([])
    const handleIconClick = (iconId) => {
        setSelectedIconId(iconId);
        formAdd.setFieldValue("iconId", iconId);
    };

    const getAllIcon = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error('Token is missing. Please log in again.');
                return;
            }

            const response = await axios.get('http://localhost:8082/wallet/icon', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIcon(response.data);
        } catch (error) {
            console.error('Error fetching icons:', error);
        }
    };

    useEffect(() => {
        getAllIcon();
    }, []);

    const formAdd = useFormik({
        initialValues: {
            name: '',
            description: '',
            iconId: selectedIconId,
            transaction: ""
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("iconId", values.iconId);
            formData.append("transaction", values.transaction);

            await axios.post("http://localhost:8082/classify", formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            setIsFormSubmitted(true); // Đánh dấu là form đã được gửi
            window.location.href = '/home'; // Quay lại trang chủ sau khi tạo thành công
        }
    });

    const getClassify = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error('Token is missing. Please log in again.');
                return;
            }

            const response = await axios.get('http://localhost:8082/classify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setClassify(response.data.result);
        } catch (error) {
            console.error('Error fetching icons:', error);
        }
    };
    useEffect(() => {
        getClassify();
    }, []);



    async function handleDelete(idClassify) {
        if (window.confirm("Bạn có muốn xóa không")) {
            try {
                await axios.delete(`http://localhost:8082/classify/${idClassify}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                window.location.reload();
                console.log(token);
                
                
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    }

    const handleEdit = (id) => {
        console.log(`Edit category with ID: ${id}`);
        setCurrentView('edit-category');
    };

    return (
        <>
            <div className='category'>
                <div className='category-top'>
                    {currentView === 'overview' && !isFormSubmitted && (
                        <button className="wallet-create" onClick={() => setCurrentView('classify-create')}>
                            Tạo phân loại mới +
                        </button>
                    )}
                </div>

                {currentView === 'overview' && (
                    <div className='category-bottom'>
                        {classify.length > 0 ? (
                            classify.map((classifyItem) => (
                                <div key={classifyItem.id} className='classify-item'>
                                    <p className="classify-name">{classifyItem.name}</p>
                                    <p className="classify-id">ID: {classifyItem.id}</p>
                                    <img
                                        src={`https://app.qnsk.site/images/icons/icon_${classifyItem.iconId}.png`}
                                        alt={classifyItem.name}
                                        className="classify-icon"
                                    />
                                    <p className="classify-type">{classifyItem.transaction}</p>
                                    <p className="classify-description">{classifyItem.description}</p>
                                    <Link
                                        key={classify.id}
                                        className="ax"
                                        onClick={() => handleDelete(classifyItem.id)}
                                    >
                                        Xóa
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Không có phân loại nào.</p>
                        )}

                    </div>
                )}
            </div>

            {currentView === 'classify-create' && !isFormSubmitted && (
                <div className="create-wallet">
                    <form onSubmit={formAdd.handleSubmit}>
                        <div className="create-wallet-container">
                            <div className="create-wallet-left">
                                <label className="form-label">Loại tiền tệ:</label>
                                <select className="form-input" name="transaction" onChange={formAdd.handleChange}>
                                    <option value="khoản thu">Khoản thu</option>
                                    <option value="khoản chi">Khoản chi</option>
                                </select>
                                <label className="form-label">Tên phân loại:</label>
                                <input type="text" placeholder="Tên phân loại" className="form-input" name="name" onChange={formAdd.handleChange} />
                                <label className="form-label">Ghi chú:</label>
                                <textarea placeholder="Nhập mô tả" className="form-input" rows="3" name="description" onChange={formAdd.handleChange}></textarea>
                            </div>
                            <div className="wallet-icon">
                                {icon.length > 0 ? (
                                    icon.map((iconItem) => (
                                        <div key={iconItem.id} onClick={() => handleIconClick(iconItem.id)} style={{ cursor: 'pointer' }}>
                                            <img src={`/img/icon_${iconItem.id}.png`} alt={iconItem.name} />
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có biểu tượng nào.</p>
                                )}
                            </div>
                        </div>
                        <div className="wallet-add-button">
                            <button type="submit" className="wallet-submit-button">Lưu</button>
                            <button type="button" className="wallet-back-button" onClick={() => setCurrentView('overview')}>Quay lại</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
