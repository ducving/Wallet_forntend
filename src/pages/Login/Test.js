import "../Wallet/Wallet.css";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Detail from '../Detail/Detail';

export default function Wallet() {
    const [currentView, setCurrentView] = useState('overview');
    const [icon, setIcon] = useState([]);
    const [wallet, setWallet] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null); // State to store the selected wallet
    const token = localStorage.getItem("token");
    const [show, setShow] = useState(false);
    const [activeButton, setActiveButton] = useState('addIncome');

    const handleButtonClick = (type) => {
        setActiveButton(type);
    };

    const getAllIcon = async () => {
        try {
            const response = await axios.get('http://localhost:8081/wallet/icon', {
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

    const getWallet = async () => {
        try {
            const response = await axios.get('http://localhost:8081/wallet', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setWallet(response.data.result);
        } catch (error) {
            console.error('Error fetching wallet:', error);
        }
    };

    useEffect(() => {
        getWallet();
    }, []);

    const colors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#FF677D", "#D4A5A5", "#392F5A", "#31A2AC", "#61C0BF", "#6B4226", "#D9BF77"];

    const handleShow = () => setShow(true);

    // Function to handle wallet detail view
    const handleWalletDetail = (wallet) => {
        console.log("Selected Wallet:", wallet);
        setSelectedWallet(wallet); // Set the selected wallet
        setCurrentView('wallet-update'); // Set the current view to 'wallet-update'
    };

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
                                    <div key={index} className="wallet-details" style={{ backgroundColor: colors[index % colors.length] }}>
                                        <a href="#" onClick={() => handleWalletDetail(wallet)}>
                                            <img src={`/img/icon_${wallet.iconId}.png`} alt={wallet.name} />
                                            <p>{wallet.name}</p>
                                            <p>{wallet.price} <span className="currency-symbol">đ</span></p>
                                        </a>
                                        <Button onClick={handleShow} className="wallet-button">
                                            Thu +
                                        </Button>
                                        <Button variant="primary" onClick={handleShow} className="wallet-button">
                                            Chi +
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p>Đang tải danh sách ví...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'wallet-update' && selectedWallet && (
                <div>
                    <Detail walletId={selectedWallet.id} />
                </div>
            )}
        </>
    );
}
