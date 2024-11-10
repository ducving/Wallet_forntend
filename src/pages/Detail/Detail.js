import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const WalletUpdate = () => {
    const { id } = useParams(); // Lấy ID của ví từ URL
    const [wallet, setWallet] = useState({
        name: '',
        price: 0,
        description: '',
        idIcon: null,
        id_user: [] // Danh sách ID người dùng liên quan đến ví
    });
    const [iconOptions, setIconOptions] = useState([]); // Lưu các lựa chọn Icon
    const [userOptions, setUserOptions] = useState([]); // Lưu các lựa chọn User
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchWallet = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/wallet/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setWallet(response.data);
        } catch (error) {
            console.error('Error fetching wallet:', error);
        }
    };

    const fetchOptions = async () => {
        try {
            const [iconResponse, userResponse] = await Promise.all([
                axios.get('http://localhost:8081/icons', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                axios.get('http://localhost:8081/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);
            setIconOptions(iconResponse.data);
            setUserOptions(userResponse.data);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    useEffect(() => {
        fetchWallet();
        fetchOptions();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWallet({ ...wallet, [name]: value });
    };

    const handleUserChange = (e) => {
        const { options } = e.target;
        const selectedUsers = Array.from(options).filter(option => option.selected).map(option => option.value);
        setWallet({ ...wallet, id_user: selectedUsers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/wallet/${id}`, wallet, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Cập nhật ví thành công!');
            navigate(`/wallet/${id}`); // Điều hướng về trang chi tiết sau khi cập nhật
        } catch (error) {
            console.error('Error updating wallet:', error);
            alert('Có lỗi xảy ra khi cập nhật ví');
        }
    };

    return (
        <div className="wallet-update">
            <h2>Cập nhật thông tin ví</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tên ví:
                    <input
                        type="text"
                        name="name"
                        value={wallet.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Số tiền:
                    <input
                        type="number"
                        name="price"
                        value={wallet.price}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Mô tả:
                    <textarea
                        name="description"
                        value={wallet.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Icon:
                    <select
                        name="idIcon"
                        value={wallet.idIcon || ''}
                        onChange={handleChange}
                    >
                        <option value="">Chọn icon</option>
                        {iconOptions.map(icon => (
                            <option key={icon.id} value={icon.id}>
                                {icon.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Người dùng:
                    <select
                        multiple
                        name="id_user"
                        value={wallet.id_user}
                        onChange={handleUserChange}
                    >
                        {userOptions.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Cập nhật ví</button>
            </form>
        </div>
    );
};

export default WalletUpdate;
