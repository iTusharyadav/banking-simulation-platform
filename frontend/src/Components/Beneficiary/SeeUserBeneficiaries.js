import React, { useState, useEffect } from "react";
import { useBankingSystem } from "../Context/UserContext.js";
import axios from "../Utills/AxiosWithJWT.js";
import { toast } from "react-hot-toast";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";

const SeeUserBeneficiaries = () => {
  const navigateTo = useNavigate();
  const [userBeneficiaries, setUserBeneficiaries] = useState([]);
  const [currentBeneficiary, setCurrentBeneficiary] = useState(null);
  const { BASE_URL, userDetails } = useBankingSystem();

  const getUserBeneficiaries = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/beneficiaries/user/${userDetails?.userId}`);
      setUserBeneficiaries(resp?.data || []);
    } catch {
      toast.error("Unable to fetch beneficiaries");
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
    getUserBeneficiaries();
  }, [userDetails]);

  const handleDeleteBeneficiary = async (beneId) => {
    try {
      const resp = await axios.delete(`${BASE_URL}/beneficiaries/deleteabn/${beneId}`);
      if ([200, 201, 204].includes(resp.status)) {
        toast.success("Beneficiary deleted!");
        getUserBeneficiaries();
      } else toast.error("Failed to delete beneficiary!");
    } catch {
      toast.error("Error deleting beneficiary!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        `${BASE_URL}/beneficiaries/updateabn/${userDetails.userId}`,
        currentBeneficiary
      );
      if (resp.status === 200) {
        toast.success("Beneficiary updated successfully!");
        getUserBeneficiaries();
      } else toast.error("Update failed!");
    } catch {
      toast.error("Error updating beneficiary!");
    }
  };

  return (
    <section className="text-gray-700 body-font bg-gray-50 min-h-[90vh] py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-center mb-10 text-gray-900">
          My Beneficiaries
        </h1>

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="table-auto w-full border-collapse text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Account No</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Relation</th>
                <th className="px-4 py-3 font-medium">Update</th>
                <th className="px-4 py-3 font-medium">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userBeneficiaries.length ? (
                userBeneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.beneficiaryid} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{beneficiary.beneficiaryid}</td>
                    <td className="px-4 py-3">{beneficiary.beneaccountno}</td>
                    <td className="px-4 py-3">{beneficiary.beneficiaryname}</td>
                    <td className="px-4 py-3">{beneficiary.relation}</td>
                    <td className="px-4 py-3 text-indigo-600 font-semibold cursor-pointer">
                      <Popup
                        trigger={
                          <button
                            onClick={() => setCurrentBeneficiary(beneficiary)}
                            className="hover:text-indigo-800"
                          >
                            Update
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto mt-24">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                              Update Beneficiary
                            </h2>
                            <form onSubmit={handleUpdate} className="space-y-4">
                              <input
                                type="text"
                                name="beneaccountno"
                                value={currentBeneficiary?.beneaccountno || ""}
                                onChange={(e) =>
                                  setCurrentBeneficiary({
                                    ...currentBeneficiary,
                                    beneaccountno: e.target.value,
                                  })
                                }
                                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400"
                                placeholder="Account Number"
                              />
                              <input
                                type="text"
                                name="beneficiaryname"
                                value={currentBeneficiary?.beneficiaryname || ""}
                                onChange={(e) =>
                                  setCurrentBeneficiary({
                                    ...currentBeneficiary,
                                    beneficiaryname: e.target.value,
                                  })
                                }
                                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400"
                                placeholder="Full Name"
                              />
                              <input
                                type="text"
                                name="relation"
                                value={currentBeneficiary?.relation || ""}
                                onChange={(e) =>
                                  setCurrentBeneficiary({
                                    ...currentBeneficiary,
                                    relation: e.target.value,
                                  })
                                }
                                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400"
                                placeholder="Relation"
                              />
                              <div className="flex justify-between items-center mt-6">
                                <button
                                  type="submit"
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={close}
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </Popup>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteBeneficiary(beneficiary.beneficiaryid)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No beneficiaries added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SeeUserBeneficiaries;
