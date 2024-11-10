import "../Wallet/Wallet.css";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from "axios";

export default function Wallet() {
    const [currentView, setCurrentView] = useState('overview');
    const [icon, setIcon] = useState([]);
    const [wallet, setWallet] = useState([]);

    const [selectedIconId, setSelectedIconId] = useState("");
    
    const token = localStorage.getItem("token");

    const [show, setShow] = useState(false);
    const [activeButton, setActiveButton] = useState('addIncome');



    const handleButtonClick = (type) => {
        setActiveButton(type);
    };

    //hiển thị danh sách icon
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

    //thêm một ví mới
    const formAdd = useFormik({
        initialValues: {
            name: "",
            price: "",
            description: "",
            iconId: selectedIconId // Bind the selected icon ID
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("iconId", values.iconId);

            await axios.post("http://localhost:8082/wallet", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            window.location.href = '/home';
        }
    });
    const handleIconClick = (iconId) => {
        setSelectedIconId(iconId);
        formAdd.setFieldValue("iconId", iconId);
    };
    //thêm khoản thu
    const formAddIncome=useFormik({
        initialValues: {
            amount: "",
            description: "",
            id_wallet: wallet.id
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("amount", values.amount);
            formData.append("description", values.description);
            formData.append("id_wallet", values.id_wallet);

            await axios.post("http://localhost:8082/transaction/income", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            window.location.href = '/home';
        }
    });
//hiển thị danh sách vi
    const getWllet = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error('Token is missing. Please log in again.');
                return;
            }
            const response = await axios.get('http://localhost:8082/wallet', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setWallet(response.data.result);
            console.log(response)
        } catch (error) {
            console.error('Error fetching icons:', error);
        }
    };


    useEffect(() => {
        getWllet();
    }, []);
    const colors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#FF677D", "#D4A5A5", "#392F5A", "#31A2AC", "#61C0BF", "#6B4226", "#D9BF77"];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {currentView === 'overview' && (
                <div className="card-home">
                    <div className="cartd-home-1">
                        <button className="wallet-create" onClick={() => setCurrentView('wallet-create')}>
                            Tạo ví mới +
                        </button>
                    </div>

                    <div className="cart-home-2">

                        <div className="wallets-container">
                            {wallet.length > 0 ? (
                                wallet.map((wallet, index) => (

                                    <div
                                        key={index}
                                        className="wallet-details"
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    >
                                        <a href={`/detail/${wallet.id}`}>
                                            <img src={`/img/icon_${wallet.iconId}.png`} alt={wallet.name} />

                                            <p>{wallet.name}</p>
                                            <p>{wallet.price} <span className="currency-symbol">đ</span></p>
                                        </a>
                                        <Button onClick={() => handleShow(wallet)} className="wallet-button">
                                            Thu +
                                        </Button>
                                        <Button variant="primary" onClick={() => handleShow(wallet)} className="wallet-button">
                                            Chi +
                                        </Button>
                                    </div>

                                ))
                            ) : (
                                <p>Đang tải danh sách ví...</p>
                            )}
                        </div>

                        <Modal size="lg" show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                        <div className="wallet-modal-button">
                                            <button
                                                className={`wallet-modal-button-item ${activeButton === 'addIncome' ? 'active' : ''}`}
                                                onClick={() => handleButtonClick('addIncome')}
                                            >
                                                Thêm khoản thu
                                            </button>
                                            <button
                                                className={`wallet-modal-button-item ${activeButton === 'addExpense' ? 'active' : ''}`}
                                                onClick={() => handleButtonClick('addExpense')}
                                            >
                                                Thêm khoản chi
                                            </button>
                                            <button
                                                className={`wallet-modal-button-item ${activeButton === 'transfer' ? 'active' : ''}`}
                                                onClick={() => handleButtonClick('transfer')}
                                            >
                                                Chuyển tiền
                                            </button>
                                        </div>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {activeButton === 'addIncome' && (
                                    <form className="transaction-form">
                                        <div class="form-container">
                                            <form onSubmit={formAddIncome.handleSubmit}>
                                                <div class="form-group">
                                                    <label for="amount">Số tiền</label>
                                                    <input type="number" id="amount" placeholder="0" name="amount"   onChange={formAdd.handleChange} />
                                                </div>

                                                <div class="form-group">
                                                    <label for="transaction-type">Loại giao dịch</label>
                                                    <select id="transaction-type">
                                                        <option>Select...</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="note">Ghi chú</label>
                                                    <input type="text" id="note" placeholder="Ghi chú" name="description"   onChange={formAdd.handleChange} />
                                                </div>

                                                <div class="form-group">
                                                    <label for="wallet">Ví tiền</label>
                                                    <div class="wallet-dropdown">
                                                        <select id="wallet">
                                                            <option>vinh</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="button-group">
                                                    <button type="button" class="cancel-button">Hủy</button>
                                                    <button type="submit" class="submit-button">Thêm</button>
                                                </div>
                                            </form>
                                        </div>

                                    </form>
                                )}
                                {activeButton === 'addExpense' && (
                                    <form className="transaction-form">
                                        <div class="form-container">
                                            <form>
                                                <div class="form-group">
                                                    <label for="amount">Số tiền</label>
                                                    <input type="number" id="amount" placeholder="0" />
                                                </div>

                                                <div class="form-group">
                                                    <label for="transaction-type">Loại giao dịch</label>
                                                    <select id="transaction-type">
                                                        <option>Select...</option>

                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="note">Ghi chú</label>
                                                    <input type="text" id="note" placeholder="Ghi chú" />
                                                </div>

                                                <div class="form-group">
                                                    <label for="wallet">Ví tiền</label>
                                                    <div class="wallet-dropdown">
                                                        <select id="wallet">
                                                            <option>vinh</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="date">Ngày thu</label>
                                                    <input type="date" id="date" />
                                                </div>

                                                <div class="button-group">
                                                    <button type="button" class="cancel-button">Hủy</button>
                                                    <button type="submit" class="submit-button">Thêm</button>
                                                </div>
                                            </form>
                                        </div>
                                    </form>
                                )}
                                {activeButton === 'transfer' && (
                                    <form className="transaction-form">
                                        <form className="transaction-form">
                                            <div className="form-container-thu">
                                                <div className="form-group">
                                                    <label htmlFor="amount">Số tiền chuyển</label>
                                                    <input type="number" id="amount" placeholder="0" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="from-wallet">Từ ví</label>
                                                    <select id="from-wallet">
                                                        <option>vinh</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="to-wallet">Đến ví</label>
                                                    <select id="to-wallet">
                                                        <option>Chọn ví đích</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="date">Ngày chuyển</label>
                                                    <input type="date" id="date" />
                                                </div>
                                                <div className="button-group">
                                                    <button type="button" className="cancel-button">Hủy</button>
                                                    <button type="submit" className="submit-button">Chuyển</button>
                                                </div>
                                            </div>
                                        </form>
                                    </form>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Bỏ
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Lưu
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            )}
            {currentView === 'wallet-create' && (
                <div className="create-wallet">
                    <form onSubmit={formAdd.handleSubmit}>
                        <div className="create-wallet-container">
                            <div className="create-wallet-left">
                                <label className="form-label">Tên ví:</label>
                                <input type="text" placeholder="Nhập tên ví" className="form-input" name="name" onChange={formAdd.handleChange} />
                                <label className="form-label">Số tiền:</label>
                                <input type="number" placeholder="Nhập số tiền" className="form-input" name="price" onChange={formAdd.handleChange} />
                                <label className="form-label">Loại tiền tệ:</label>
                                <select className="form-input" name="currency" onChange={formAdd.handleChange}>
                                    <option value="vnd">VND</option>
                                    <option value="usd">USD</option>
                                    <option value="eur">EUR</option>
                                </select>
                                <label className="form-label">Mô tả:</label>
                                <textarea placeholder="Nhập mô tả" className="form-input" rows="3" name="description" onChange={formAdd.handleChange}></textarea>
                            </div>
                            <div className="wallet-icon">
                                {icon.length > 0 ? (
                                    icon.map((iconItem) => (
                                        <div key={iconItem.id} onClick={() => handleIconClick(iconItem.id)} style={{ cursor: 'pointer' }}>
                                            <img src={`/img/icon_${iconItem.id}.png`} alt={iconItem.name} />
                                            <img src="" />
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có biểu tượng nào.</p>
                                )}
                            </div>
                        </div>
                        <div className="wallet-add-buuton">
                            <button type="submit" className="wallet-submit-button">Lưu</button>
                            <button type="button" className="wallet-back-button" onClick={() => setCurrentView('overview')}>Quay lại</button>
                        </div>
                    </form>
                </div>
            )}
            {currentView === 'wallet-update' && (
                <div></div>
            )}
        </>
    );
}
