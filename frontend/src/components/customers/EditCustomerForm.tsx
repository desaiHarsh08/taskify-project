import { Customer } from "@/lib/customer";
import Button from "../ui/Button";
import React, { useState } from "react";
import { editCustomer } from "@/services/customer-apis";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";

type EditCustomerFormProps = {
  customer: Customer;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditCustomerForm({
  customer,
  setOpenModal,
}: EditCustomerFormProps) {
  const dispatch = useDispatch();

  const [tmpCustomer, setTmpCustomer] = useState({ ...customer });

  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTmpCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const dateFormat = (date: string | Date | null) => {
    let tmpDate = new Date();
    if (date) {
      tmpDate = new Date(date);
    }
    const formattedDate = `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDate.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  const handleEditCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customerEdt = { ...tmpCustomer };
    if (!customerEdt.birthDate?.toString().includes("T00:00:00")) {
      customerEdt.birthDate = customerEdt.birthDate + "T00:00:00";
    }

    if (!customerEdt.anniversary?.toString().includes("T00:00:00")) {
      customerEdt.anniversary = customerEdt.anniversary + "T00:00:00";
    }


    dispatch(toggleLoading());
    try {
      const response = await editCustomer(customerEdt);
      console.log(response);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
    }
  };

  return (
    <form onSubmit={handleEditCustomer}>
      <div style={{ height: "400px", overflow: "auto" }}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            name="customerName"
            value={tmpCustomer.customerName}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={tmpCustomer.email != null ? tmpCustomer.email : ""}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="personOfContact" className="form-label">
            Person Of Contact
          </label>
          <input
            type="text"
            className="form-control"
            name="personOfContact"
            value={tmpCustomer.personOfContact}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={tmpCustomer.phone}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={tmpCustomer.state}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            rows={3}
            name="address"
            value={tmpCustomer.address}
            onChange={handleCustomerChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={tmpCustomer.city}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            value={tmpCustomer.pincode}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Birthdate
          </label>
          <input
            type="date"
            className="form-control"
            name="birthDate"
            value={dateFormat(tmpCustomer.birthDate as string)}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anniversary" className="form-label">
            Anniversary
          </label>
          <input
            type="date"
            className="form-control"
            name="anniversary"
            value={dateFormat(tmpCustomer.anniversary as string)}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="residenceAddress" className="form-label">
            Residence Address
          </label>
          <textarea
            className="form-control"
            rows={3}
            value={tmpCustomer.residenceAddress}
            onChange={handleCustomerChange}
            name="residenceAddress"
          ></textarea>
        </div>
      </div>
      <div className="my-3 mt-4 d-flex justify-content-end">
        <Button variant={"success"}>Edit</Button>
      </div>
    </form>
  );
}
