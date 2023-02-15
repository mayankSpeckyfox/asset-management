import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Stack } from "@mui/material";
import "./Editdepartment.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Editdepartment = (props) => {
  const { closeEdit, data } = props;

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      admin: data.admin.email,
      hr: data.hr.email,
      it: data.it.email,
      account: data.account.email,
    },
  });

  const onSubmit = (d) => {
    const updateDepartment = async () => {
      await axios
        .patch(`api/department/update/${data._id}`, {
          admin: { email: d.admin },
          hr: { email: d.hr },
          it: { email: d.it },
          account: { email: d.account },
        })
        .then((res) => {
          alert(res.data.message);

          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    };
    updateDepartment();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 pt-4 border border-1 mt-5 form-class">
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <CancelIcon
            className="close-icon mb-3"
            onClick={closeEdit}
            sx={{ cursor: "pointer", color: "brown", fontSize: "xx-large" }}
          />
        </Stack>
        <label className="form-label">ADMIN</label>
        <input
          placeholder="Email"
          className="form-control"
          type="email"
          {...register("admin", { required: true })}
        />

        {errors.admin && (
          <span className="department-validation-error">
            *This field is required
          </span>
        )}
        <hr />
        <label className="form-label">HR</label>
        <input
          placeholder="Email"
          className="form-control"
          type="email"
          {...register("hr", { required: true })}
        />

        {errors.hr && (
          <span className="department-validation-error">
            *This field is required
          </span>
        )}
        <hr />
        <label className="form-label">IT</label>
        <input
          placeholder="Email"
          className="form-control"
          type="email"
          {...register("it", { required: true })}
        />

        {errors.it && (
          <span className="department-validation-error">
            *This field is required
          </span>
        )}
        <hr />
        <label className="form-label">ACCOUNTS</label>
        <input
          placeholder="Email"
          className="form-control"
          type="email"
          {...register("account", { required: true })}
        />

        {errors.account && (
          <span className="department-validation-error">
            *This field is required
          </span>
        )}
        <hr />

        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </>
  );
};
export default Editdepartment;
