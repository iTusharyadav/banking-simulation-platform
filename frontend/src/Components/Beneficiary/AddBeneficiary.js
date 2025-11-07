import React, { useEffect, useState } from "react";
import axios from "../Utills/AxiosWithJWT.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext.js";

const AddBeneficiary = () => {
  const { BASE_URL, userDetails } = useBankingSystem();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) navigateTo("/");
  }, []);

  const [userBeneficiary, setUserBeneficiary] = useState({
    beneaccountno: "",
    beneficiaryname: "",
    relation: "",
  });

  const handleBeneficiaryDetails = (e) => {
    const { name, value } = e.target;
    setUserBeneficiary((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBeneficiarySubmit = async (e) => {
    e.preventDefault();
    const { beneaccountno, beneficiaryname, relation } = userBeneficiary;

    if (!beneaccountno || !beneficiaryname || !relation) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const userId = userDetails.userId;
      const resp = await axios.post(`${BASE_URL}/beneficiaries/create/${userId}`, {
        beneaccountno,
        beneficiaryname,
        relation,
      });

      if (resp.data === "This account cannot be added") {
        toast.error("You can't add yourself as a beneficiary");
        return;
      }

      if (resp.data === "Already Exists") {
        toast.error("Beneficiary already added");
        return;
      }

      if (resp.status === 200) {
        toast.success("Beneficiary added successfully!");
        navigateTo("/dashboard/trx");
      } else {
        toast.error("Something went wrong while adding!");
      }
    } catch {
      toast.error("Error connecting to server!");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleAddBeneficiarySubmit}
        className="bg-white shadow-lg p-8 rounded-2xl flex flex-col gap-6 border w-[90%] sm:w-[35rem]"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Add New Beneficiary
        </h2>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Beneficiary Account Number
          </label>
          <input
            type="number"
            name="beneaccountno"
            value={userBeneficiary.beneaccountno}
            onChange={handleBeneficiaryDetails}
            className="bg-gray-100 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter account number"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Beneficiary Name
          </label>
          <input
            type="text"
            name="beneficiaryname"
            value={userBeneficiary.beneficiaryname}
            onChange={handleBeneficiaryDetails}
            className="bg-gray-100 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Relation
          </label>
          <input
            type="text"
            name="relation"
            value={userBeneficiary.relation}
            onChange={handleBeneficiaryDetails}
            className="bg-gray-100 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter relation"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-5 rounded-lg font-semibold transition-all duration-300"
        >
          Add Beneficiary
        </button>
      </form>
    </section>
  );
};

export default AddBeneficiary;
