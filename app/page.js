"use client";
import React from "react";
import { useState, useRef } from "react";
import ProceedConfirmation from "./components/ProceedConfirmation";

/**
 * HomePage Component
 *
 * @description This component displays the Application Form Checklist.
 * It manages form submission, user confirmation, and a reference for proceeding.
 *
 * @see {@link /info} - Navigate to the Info page.
 *
 * @state {Object} formData - Holds form data submitted by the user.
 * @state {Boolean} proceedConfirmation - Indicates whether the user has confirmed to proceed.
 * @ref {Object} proceedRef - Reference for proceeding action.
 *
 * @returns {JSX.Element} The HomePage component.
 */

const page = () => {
  const [formData, setFormData] = useState({});
  const [proceedConfirmation, setProceedConfirmation] = useState(false);
  const proceedRef = useRef(null);

  const checklistItems = [
    {
      category: "Copies of computerized NIC of",
      subItems: ["Father", "Mother", "Guardian"],
    },
    {
      category: "Salary Certificate of",
      subItems: ["Father Salary", "Mother Salary", "Guardian Salary"],
    },
    {
      category: "Copies of last six months utility bills",
      subItems: ["Electricity", "Gas", "Telephone", "Water"],
    },
    {
      category: "Attested copy of rent agreement (if applicable)",
      subItems: [],
    },
    {
      category: "Copies of last & latest fee receipts of self and siblings",
      subItems: [],
    },
    {
      category:
        "Copies of Medical bills/ expenditure related documents (if applicable)",
      subItems: [],
    },
    {
      category: "Copies of previous scholarship(s) attained (if applicable)",
      subItems: [],
    },
    { category: "Statement of Purpose", subItems: [] },
  ];

  const handleCategoryChange = (category, subItems = []) => {
    let updatedData = { ...formData };
    const isChecked = !formData[category]?.checked;
    updatedData[category] = { checked: isChecked };
    subItems.forEach((sub) => {
      updatedData[category][sub] = isChecked;
    });
    setFormData(updatedData);
  };

  const handleSubItemChange = (category, subItem) => {
    let updatedData = { ...formData };
    if (!updatedData[category]) updatedData[category] = { checked: false };
    updatedData[category][subItem] = !updatedData[category][subItem];

    const allChecked = checklistItems
      .find((item) => item.category === category)
      .subItems.every((sub) => updatedData[category][sub]);
    updatedData[category].checked = allChecked;

    setFormData(updatedData);
  };

  const handleSubmit = () => {
    setProceedConfirmation(true);
    console.log("Submitted Data:", JSON.stringify(formData, null, 2));

    setTimeout(() => {
      if (proceedRef.current) {
        proceedRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📋 Application Form Checklist
      </h2>
      <div className="border border-gray-300 rounded-lg p-4">
        {checklistItems.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="flex items-center font-semibold text-lg bg-gray-100 p-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={formData[item.category]?.checked || false}
                onChange={() =>
                  handleCategoryChange(item.category, item.subItems)
                }
                className="mr-2 w-5 h-5 accent-blue-500"
              />
              {item.category}
            </label>
            {item.subItems.length > 0 && (
              <div className="ml-6 mt-2 space-y-2">
                {item.subItems.map((sub, subIndex) => (
                  <label
                    key={subIndex}
                    className="flex items-center text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData[item.category]?.[sub] || false}
                      onChange={() => handleSubItemChange(item.category, sub)}
                      className="mr-2 w-4 h-4 accent-green-500"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {!proceedConfirmation && (
        <button
          onClick={handleSubmit}
          className="mx-[50%] p-3 cursor-pointer mt-6 w-auto bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Proceed
        </button>
      )}
      <div className="mt-6">
        <h2 className="font-semibold text-2xl mb-3">DO's:</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>
            Submit your application by hand to{" "}
            <span className="font-bold">STUDENT FINANCIAL AID OFFICE.</span>
          </li>
          <li>
            Place items in the right order as per above sections (1 to 8).
          </li>
          <li>Put all amounts in Pak Rs.</li>
          <li>
            Consult with parent(s)/guardian(s) for financial aid accuracy &
            reliability.
          </li>
          <li>
            For the information not present/relevant, write in capital letters{" "}
            <span className="font-bold">N/A</span>.
          </li>
        </ol>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-2xl mb-3">DO NOT:</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>
            Provide{" "}
            <span className="font-semibold">False/Vague/Incomplete </span>
            information.
          </li>
          <li>
            <span className="font-semibold">Overwrite/Scratch </span>on this
            form. Send scholarship form directly to HEC.
          </li>
        </ol>
      </div>
      {proceedConfirmation && (
        <div ref={proceedRef}>
          <ProceedConfirmation
            proceedConfirmation={proceedConfirmation}
            setProceedConfirmation={setProceedConfirmation}
          />
        </div>
      )}
    </div>
  );
};

export default page;
