import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { updateUser, getSingleUser } from "../../store/users/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
      display: "flex",
      flexDirection: "column",
    },
  },
  formContainer: {
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const defaultFormFields = {
  name: "",
  email: "",
  contact: "",
  address: "",
};

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.users);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { name, email, contact, address } = formFields;

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setFormFields({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !address) {
      setError("Please fill all input field");
    } else {
      dispatch(updateUser(formFields, id));
      navigate("/");
      setError("");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        style={{ width: "100px", marginTop: "10px" }}
        variant="contained"
        color="secondary"
        onClick={goToHome}
      >
        Go Back
      </Button>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <div className={classes.formContainer}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            value={name || ""}
            name="name"
            variant="filled"
            type="text"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            value={email || ""}
            variant="filled"
            name="email"
            type="text"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Contact"
            name="contact"
            value={contact || ""}
            variant="filled"
            type="text"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            name="address"
            value={address || ""}
            variant="filled"
            type="text"
            onChange={handleChange}
          />
          <Button
            style={{ width: "150px", marginLeft: "130px", marginTop: "30px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
