import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiUser, FiLock, FiUserCheck } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import backgroundImg from "../assets/is01.jpg"; // Adjust the path based on your project structure

const SignUpLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false); // true for sign-up, false for login
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    firstName: "",
    lastName: "",
    facultyPosition: "",
    gender: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const facultyPositions = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Other",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmailOrPhone = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmailOrPhone(formData.emailOrPhone)) {
      newErrors.emailOrPhone = "Invalid email or phone number";
    }
    if (isSignUp) {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.facultyPosition) {
        newErrors.facultyPosition = "Faculty position is required";
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      }
      if (!formData.birthday) {
        newErrors.birthday = "Birthday is required";
      }
      if (!validatePassword(formData.password)) {
        newErrors.password =
          "Password must be at least 6 characters long and contain at least one number";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      // Additional logic to handle form submission can go here, such as an API call
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-300 p-4 md:p-0">
      <div className="container mx-auto">
        <div
          className="flex flex-col md:flex-row w-full md:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden"
          data-aos="fade-right"
        >
          <div
            className="w-full md:w-1/2 flex flex-col items-center p-8 md:p-12 bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${backgroundImg})` }}
          >
            <h1
              className="text-white text-3xl mb-3 font-bold mt-5"
              data-aos="fade-down"
            >
              Welcome to IntraChat
            </h1>
            <div className="hidden md:block">
              <p
                className="text-white font-sans text-center md:text-left mt-2"
                data-aos="fade-down"
              >
                Your gateway to seamless communication across all university
                departments. Designed for students and faculty, IntraChat
                fosters collaboration and real-time interactions, enhancing your
                academic experience.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 py-8 md:py-16 px-8 md:px-12">
            <form onSubmit={handleSubmit}>
              {!isSignUp && (
                <>
                  <div
                    className="mb-5 flex items-center border border-gray-400 p-2 rounded"
                    data-aos="fade-left"
                  >
                    <input
                      type="text"
                      name="emailOrPhone"
                      placeholder="Email or Phone No"
                      className="w-full outline-none"
                      value={formData.emailOrPhone}
                      onChange={handleChange}
                      required
                    />
                    <FiMail className="ml-2" />
                    {errors.emailOrPhone && (
                      <p className="text-red-600">{errors.emailOrPhone}</p>
                    )}
                  </div>
                  <div
                    className="mt-5 flex items-center border border-gray-400 p-2 rounded"
                    data-aos="fade-left"
                  >
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full outline-none"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <FiLock className="ml-2" />
                    {errors.password && (
                      <p className="text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <Link to="chat/">
                    <div className="mt-5" data-aos="fade-left">
                      <button
                        className="w-full bg-blue-300 py-3 text-center text-white font-semibold rounded"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </Link>
                </>
              )}
              {isSignUp && (
                <>
                  <div
                    className="mb-5 flex items-center border border-gray-400 p-2 rounded"
                    data-aos="fade-right"
                  >
                    <input
                      type="text"
                      name="emailOrPhone"
                      placeholder="Email or Phone No"
                      className="w-full outline-none"
                      value={formData.emailOrPhone}
                      onChange={handleChange}
                      required
                    />
                    <FiMail className="ml-2" />
                    {errors.emailOrPhone && (
                      <p className="text-red-600">{errors.emailOrPhone}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div
                      className="flex items-center border border-gray-400 p-2 rounded"
                      data-aos="fade-right"
                    >
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full outline-none"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                      <FiUser className="ml-2" />
                      {errors.firstName && (
                        <p className="text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div
                      className="flex items-center border border-gray-400 p-2 rounded"
                      data-aos="fade-right"
                    >
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full outline-none"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                      <FiUserCheck className="ml-2" />
                      {errors.lastName && (
                        <p className="text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
                    data-aos="fade-right"
                  >
                    <label className="p-2">Faculty Position</label>
                    <select
                      name="facultyPosition"
                      className="rounded bg-white border border-gray-400 p-2"
                      value={formData.facultyPosition}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Position</option>
                      {facultyPositions.map((position, index) => (
                        <option key={index} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                    {errors.facultyPosition && (
                      <p className="text-red-600">{errors.facultyPosition}</p>
                    )}
                  </div>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
                    data-aos="fade-right"
                  >
                    <label className="p-2">Gender</label>
                    <select
                      name="gender"
                      className="bg-white rounded border border-gray-400 p-2"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-600">{errors.gender}</p>
                    )}
                  </div>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
                    data-aos="fade-right"
                  >
                    <label className="p-2">Birthday</label>
                    <div className="flex items-center border border-gray-400 p-2 rounded">
                      <input
                        type="date"
                        name="birthday"
                        className="w-full outline-none"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                      />
                      {errors.birthday && (
                        <p className="text-red-600">{errors.birthday}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className="mt-5 flex items-center border border-gray-400 p-2 rounded"
                    data-aos="fade-right"
                  >
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full outline-none"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <FiLock className="ml-2" />
                    {errors.password && (
                      <p className="text-red-600">{errors.password}</p>
                    )}
                  </div>
                  <div
                    className="mt-5 flex items-center border border-gray-400 p-2 rounded"
                    data-aos="fade-right"
                  >
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full outline-none"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <FiLock className="ml-2" />
                    {errors.confirmPassword && (
                      <p className="text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div className="mt-5" data-aos="fade-right">
                    <button
                      className="w-full bg-blue-300 py-3 text-center text-white font-semibold rounded"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </>
              )}

              <div className="mt-5">
                <button
                  className=" w-full bg-blue-300 py-3 text-center text-white font-semibold rounded"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Login Instead" : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogin;
