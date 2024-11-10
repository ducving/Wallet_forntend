import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Home/Home.css';
import Test from '../Login/Test';
import Wallet from '../Wallet/Wallet';
import Category from '../Category/Category';



export default function Home() {
    const token = localStorage.getItem("token");
    const [wallet, setWallet] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [price, setprice] = useState();

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
            const walletsData = response.data.result; // Lấy danh sách các ví
            setWallet(walletsData);
            const total = walletsData.reduce((sum, wallet) => sum + wallet.price, 0);
            setTotalPrice(total);

        } catch (error) {
            console.error('Error fetching icons:', error);
        }
    };


    useEffect(() => {
        getWllet();
    }, []);

    const [currentView, setCurrentView] = useState('overview');
    return (
        <>
            <div className='body'>
                <div className='home_left'>
                    <div className='hl_logo'>
                        <a>
                            <svg className="logo-abbr" width="50" height="50" viewBox="0 0 53 53">
                                <path d="M21.6348 8.04782C21.6348 5.1939 23.9566 2.87204 26.8105 2.87204H28.6018L28.0614 1.37003C27.7576 0.525342 26.9616 0 26.1132 0C25.8781 0 25.639 0.0403711 25.4052 0.125461L7.3052 6.7133C6.22916 7.105 5.67535 8.29574 6.06933 9.37096L7.02571 11.9814H21.6348V8.04782Z" fill="#759DD9"></path>
                                <path d="M26.8105 5.97754C25.6671 5.97754 24.7402 6.90442 24.7402 8.04786V11.9815H42.8555V8.04786C42.8555 6.90442 41.9286 5.97754 40.7852 5.97754H26.8105Z" fill="#F8A961"></path>
                                <path className="svg-logo-primary-path" d="M48.3418 41.8457H41.0957C36.8148 41.8457 33.332 38.3629 33.332 34.082C33.332 29.8011 36.8148 26.3184 41.0957 26.3184H48.3418V19.2275C48.3418 16.9408 46.4879 15.0869 44.2012 15.0869H4.14062C1.85386 15.0869 0 16.9408 0 19.2275V48.8594C0 51.1462 1.85386 53 4.14062 53H44.2012C46.4879 53 48.3418 51.1462 48.3418 48.8594V41.8457Z" fill="#5BCFC5"></path>
                                <path className="svg-logo-primary-path" d="M51.4473 29.4238H41.0957C38.5272 29.4238 36.4375 31.5135 36.4375 34.082C36.4375 36.6506 38.5272 38.7402 41.0957 38.7402H51.4473C52.3034 38.7402 53 38.0437 53 37.1875V30.9766C53 30.1204 52.3034 29.4238 51.4473 29.4238ZM41.0957 35.6348C40.2382 35.6348 39.543 34.9396 39.543 34.082C39.543 33.2245 40.2382 32.5293 41.0957 32.5293C41.9532 32.5293 42.6484 33.2245 42.6484 34.082C42.6484 34.9396 41.9532 35.6348 41.0957 35.6348Z" fill="#5BCFC5"></path>
                            </svg>
                        </a>
                        <h1>QNSK</h1>
                    </div>
                    <div className='hl_function'>
                        <ul className="metismenu" id="menu">
                            <li>
                                <button className="has-arrow ai-icon active" onClick={() => setCurrentView('overview')}>
                                    <i className="fa-solid fa-house" />
                                    <span className="nav-text">Tổng quan</span>
                                </button>
                            </li><br />
                            <li>
                                <button className="has-arrow ai-icon" onClick={() => setCurrentView('wallet')}>
                                    <i className="fa-solid fa-wallet" />
                                    <span className="nav-text">Ví tiền</span>
                                </button>
                            </li><br />
                            <li>
                                <button className="has-arrow ai-icon" onClick={() => setCurrentView('transaction')}>
                                    <i className="fa-solid fa-money-bill-transfer" />
                                    <span className="nav-text">Giao dịch</span>
                                </button>
                            </li><br />
                            <li>
                                <button className="has-arrow ai-icon" onClick={() => setCurrentView('budget')}>
                                    <i className="fa-solid fa-coins" />
                                    <span className="nav-text">Ngân sách</span>
                                </button>
                            </li><br />
                            <li>
                                <button className="has-arrow ai-icon" onClick={() => setCurrentView('category')}>
                                    <i className="fa-solid fa-layer-group" />
                                    <span className="nav-text">Phân loại</span>
                                </button>
                            </li><br />
                            <li>
                                <button className="has-arrow ai-icon" onClick={() => setCurrentView('report')}>
                                    <i className="fa-solid fa-chart-line" />
                                    <span className="nav-text">Báo cáo</span>
                                </button>
                            </li><br />
                            <li>
                                <button className="has-arrow ai-icon" onClick={() => setCurrentView('profile')}>
                                    <i className="fa-solid fa-user" />
                                    <span className="nav-text">Tài khoản</span>
                                </button>
                            </li><br />
                            <li>
                                <button className="has-arrow ai-icon" onClick={() => setCurrentView('setting')}>
                                    <i className="fa-solid fa-gear" />
                                    <span className="nav-text">Cài đặt</span>
                                </button>
                            </li><br />
                        </ul>
                        <div>
                            <b> Ứng dụng quản lý tài chính</b>
                            <p>© 2024 All Rights Reserved</p>
                            <b>Made with </b> <i class="fa-solid fa-heart"></i>
                            <b> by HN x ĐN</b>
                        </div>
                    </div>
                </div>
                <div className='home_right'>

                    <div className='home_right_navbar'>
                        <div className="hr_nabar">
                            <div>
                                <h1>{currentView === 'overview' ? 'Tổng quan' :
                                    currentView === 'wallet' ? 'Ví tiền' :
                                        currentView === 'transaction' ? 'Giao dịch' :
                                            currentView === 'budget' ? 'Ngân sách' :
                                                currentView === 'category' ? 'Phân loại' :
                                                    currentView === 'report' ? 'Báo cáo' :
                                                        currentView === 'profile' ? 'Tài khoản' :
                                                            currentView === 'setting' ? 'Cài đặt' : ''}</h1>
                            </div>
                            <div className='img'>
                                <ul className="hr_nabar1">
                                    <li className="nav-item">
                                        <div className="dropdown-center">
                                            <button
                                                type="button"
                                                id="react-aria7264822152-:r0:"
                                                aria-expanded="false"
                                                className="languageSwithcher dropdown-toggle"
                                            >
                                                <img src="https://app.qnsk.site/images/flag/vi.png" alt="" />
                                            </button>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="user-con">
                                            <img src="https://app.qnsk.site/images/avatar.png" alt="" />
                                            <div className="text">
                                                <h5 className="mb-0">Ving Đức</h5>
                                                <p className="mb-0">ducving68@gmail.com</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/" className="m ai-icon">
                                            <svg
                                                id="icon-logout"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-danger"
                                                width={28}
                                                height={28}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                <polyline points="16 17 21 12 16 7" />
                                                <line x1={21} y1={12} x2={9} y2={12} />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                    <div className='hr_body'>
                        {currentView === 'overview' && (
                            <div>
                                <div className='coler'></div>
                                <div className="all">
                                    <div className='hr_navbar'>
                                        <div className="image-container hr_a">
                                            <img
                                                src="https://app.qnsk.site/images/pattern/pattern6.png"
                                                alt="Pattern"
                                                className="image"
                                            />
                                            <div className="text-overlay">
                                                <div className='quantity'>
                                                    Tổng tiền hiện có
                                                    <h3>{totalPrice} VND</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tq'>
                                            <div>
                                                <h5>Tổng quan ví tiền</h5>
                                                <b>Tiền không phải là tất cả, nhưng nó là một phần<br />
                                                    quan trọng trong cuộc sống của chúng ta.</b>
                                                <div style={{ display: "flex" }}>
                                                    <div className="circle-icon-container">
                                                        <div className="circle-icon"></div>
                                                    </div>
                                                    <h4 style={{ marginTop: "9%" }}>Vinh</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="circle-icon-container1">
                                            <div className="circle-icon1">
                                            </div>
                                        </div>
                                    </div>
                                    <div className='home-spending'>
                                        <div className='home-amount-spending'>
                                            Số lượng giao dịch
                                            <p>1</p>
                                        </div>
                                        <div className='home-spending-icome'>
                                            <h5>Tổng thu</h5>
                                            <p>trong tháng này</p>
                                            <p>1000 vnd</p>
                                        </div>
                                        <div className='home-spending-expence'>
                                            <h5>Tổng chi</h5>
                                            <p>trong tháng này</p>
                                            <p>1000 vnd</p>
                                        </div>
                                    </div>
                                    <div className='home-transaction'>
                                        <h3>Giao dịch</h3>
                                        <table>
                                            <tr>
                                                <td>
                                                    <svg class="bgl-danger tr-icon" width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z" fill="#FF2E2E"></path><path d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z" fill="#FF2E2E"></path></g></svg>
                                                    <p>  tên giao dịch</p>
                                                </td>
                                                <td> <h3>Mô tả</h3></td>
                                                <td>
                                                <h3>100000 </h3>
                                                </td>
                                                <td><h3>vinh</h3></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentView === 'wallet' && (
                            <div className='home-cart'>
                                <Wallet></Wallet>
                            </div>
                        )}
                        {currentView === 'transaction' && (
                           <></>
                        )}
                        {currentView === 'budget' && (
                            <div>
                                <h2>Nội dung Ngân sách</h2>
                                {/* Thêm nội dung và style của trang Ngân sách */}
                            </div>
                        )}
                        {currentView === 'category' && (
                           <div>
                           <Category></Category>
                       </div>
                        )}
                        {currentView === 'report' && (
                            <div>
                                <h2>Nội dung Báo cáo</h2>
                                {/* Thêm nội dung và style của trang Báo cáo */}
                            </div>
                        )}
                        {currentView === 'profile' && (
                            <div>
                                <h2>Nội dung Tài khoản</h2>
                                {/* Thêm nội dung và style của trang Tài khoản */}
                            </div>
                        )}
                        {currentView === 'setting' && (
                            <div>
                                <h2>Nội dung Cài đặt</h2>
                                {/* Thêm nội dung và style của trang Cài đặt */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}
