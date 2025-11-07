import React, { useState, useEffect } from 'react'
import axios from "../Utills/AxiosWithJWT.js"
import { useBankingSystem } from '../Context/UserContext.js'
import NavbarDashboard from './NavbarDashboard.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const DashboardTransferMoney = () => {
    const { BASE_URL, userDetails } = useBankingSystem();
    const [selectedBeneficiary, setSelectedbeneficiary] = useState();
    const [benefeciaryOption, setBenefeciaryOption] = useState([]);
    const [accountNo, setAccountNo] = useState();
    const [toAccount, setToAccount] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const navigateTo = useNavigate();

    const getUserBeneficiaries = async () => {
        const resp = await axios.get(`${BASE_URL}/beneficiaries/user/${userDetails?.userId}`)
        setBenefeciaryOption(resp.data);
    }

    useEffect(() => {
        if (!sessionStorage.getItem("jwtToken")) {
            navigateTo("/")
        }
        getUserBeneficiaries();
    }, [userDetails])

    const handleFundTransferSubmit = async (e) => {
        e.preventDefault();
        const data = { accountno: userDetails?.accounts[0]?.accountno }
        const resp = await axios.post(`${BASE_URL}/fund/transfer`, data, {
            params: {
                toAccount: selectedBeneficiary,
                amount,
                description
            }
        })
        if (resp.status === 200) {
            toast.success("Transaction Successfully Done!");
        }
    }

    return (
        <div>
            <NavbarDashboard />
            <section className='min-h-[80vh] bg-gradient-to-r from-blue-500 to-indigo-600 pt-8'>
                <h2 className='text-2xl text-white font-bold text-center mb-6'>Dashboard</h2>
                <div className='flex flex-col md:flex-row justify-around items-start gap-6 px-4 md:px-20'>
                    <div className='flex flex-col justify-center items-center gap-4 bg-white rounded-lg shadow-lg p-6 w-full md:w-64'>
                        <h3 className='text-xl text-gray-800 font-semibold'>Operations</h3>
                        <NavLink to={"/dashboard/balance"} >
                            <button className='w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition'>Check Balance</button>
                        </NavLink>
                        <NavLink to={"/dashboard/trx"} >
                            <button className='w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition'>Transfer Amount</button>
                        </NavLink>
                        <NavLink to={"/dashboard/Stmt"} >
                            <button className='w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition'>Statements</button>
                        </NavLink>
                    </div>

                    <div className='flex-1 bg-white rounded-lg shadow-lg p-6'>
                        <h2 className='text-gray-800 text-xl font-semibold mb-4'>Amount Transfer</h2>
                        <div className='flex flex-col md:flex-row justify-start gap-4 mb-4'>
                            <button onClick={() => navigateTo("/dashboard/trx/addbene")} className='bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition'>Add Beneficiaries</button>
                            <button onClick={() => navigateTo("/dashboard/trx/seebene")} className='bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition'>View/Update Beneficiaries</button>
                        </div>

                        <select onChange={(event) => setSelectedbeneficiary(event.target.value)} className='w-full p-2 border border-gray-300 rounded-lg mb-4'>
                            <option>Select Beneficiary</option>
                            {benefeciaryOption && benefeciaryOption.map((options) => (
                                <option key={options.beneficiaryid} value={options.beneaccountno}>{options.beneficiaryname}</option>
                            ))}
                        </select>

                        <form onSubmit={handleFundTransferSubmit}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                <label className='flex flex-col text-gray-700'>
                                    From Account
                                    <input
                                        required
                                        value={userDetails?.accounts[0]?.accountno}
                                        onChange={(e) => setAccountNo(e.target.value)}
                                        className='mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                                        type="number"
                                    />
                                </label>
                                <label className='flex flex-col text-gray-700'>
                                    To Account
                                    <input
                                        required
                                        value={selectedBeneficiary}
                                        onChange={(e) => setToAccount(e.target.value)}
                                        className='mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                                        type="number"
                                    />
                                </label>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                                <label className='flex flex-col text-gray-700'>
                                    Amount
                                    <input
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="number"
                                        className='mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    />
                                </label>
                                <label className='flex flex-col text-gray-700'>
                                    Remark
                                    <input
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        className='mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    />
                                </label>
                            </div>

                            <div className='flex justify-center'>
                                <button type='submit' className='bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashboardTransferMoney
