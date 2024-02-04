import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Dropdown from "../utils/Dropdown";

const Navbar = (props) => {
  const s1 =
    "bg-white-900 drop-shadow-lg mx-3 px-7 py-2 rounded-md text-base font-medium hover:drop-shadow-xl hover:px-10 dark:hover:bg-midnight dark:hover:drop-shadow-dark-lg";

  return (
    <div>
      <nav className="p-3 bg-white-900 sticky top-0 z-10 dark:bg-gray-bg">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center justify-between">
              <img
                className="h-14 w-auto ml-6"
                src={logo}
                draggable={false}
                alt="Your Company"
              />
              <div className="text-2xl font-bold text-blood ml-2">
                BloodLink
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-between">
            <>
              <Dropdown
                title="About Us"
                children={["Home","About Bloodlink","Contact Us"]}
                links={["/","/about","/contactUs"]}
              ></Dropdown>
              {props.login ? (
                <>
                  <Link
                  to={`${props.user}/profile`}
                  className={s1}
                  >
                  <i className="fa-solid fa-user"></i>
                  </Link>
                  <Link to="/">
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <Dropdown
                    title="Looking for blood"
                    children={[
                      "Patient Login/Register",
                      "Blood Bank Directory",
                    ]}
                    links={["/register/patient","/bloodDirect"]}
                  ></Dropdown>
                  <Dropdown
                    title="Want to donate blood"
                    children={[
                      "Donar Login/Register",
                      "Blood Donation Camps",
                      "About Blood Donation",
                    ]}
                    links={[
                      "/register/donar",
                      "/bloodCamps",
                      "/aboutBloodDonation",
                    ]}>
                  </Dropdown>
                  <Dropdown
                    title="Blood Bank Login"
                    children={[
                      "Login",
                      "Add Your Bloodbank"
                    ]}
                    links={["/login/bank","/register/bank"]}>
                  </Dropdown>
                </>
              )}

              <button>
                
              </button>
            </>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
