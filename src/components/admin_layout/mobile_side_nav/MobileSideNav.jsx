import React, { useEffect, useState } from "react";
import "./MobileSideNav.scss";
import Dashboard_svg, {
  ArrowDown_svg,
  Booking_svg,
  Dispatch_svg,
  Drive_svg,
  Logout_svg,
  Messages_svg,
  Revenue_svg,
  Settings_svg,
  Terminal_svg,
  Trips_svg,
  User_svg,
  Vehicle_svg,
} from "../../../svg_component/Svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_log_out_popup } from "../../../logics/logout_popup/logoutPopupSlice";


const MobileSideNav = () => {
  const dispatch = useDispatch();


  let userDetails =""
  if (localStorage.getItem("theUserDetails") ) {
    
    const theUserDetails = localStorage.getItem("theUserDetails");
    const userDetailsObject = JSON.parse(theUserDetails);
   
    userDetails = userDetailsObject.userDetails;
  }





  const navigate = useNavigate();
  // GETTING CURRENT ROUTE STARTS
  const selectCurrentRoute = (state) => state.current_routes.currentRoute;
  const the_route = useSelector(selectCurrentRoute);

  // GETTING REDIRECT STATUS
  const selectRedirectToDashboard = (state) =>
    state.login_inputs.redirectToAdminDashboard;
  const RedirectToDashboard = useSelector(selectRedirectToDashboard);

  // GETTING THE UNIVERSAL OVERLAY POPUP STATUS OVERLAY POPUP STATUS
  const selectIniversalPopup = (state) => state.universal_check_ols;
  const popupValue = useSelector(selectIniversalPopup);

  const showLogoutPopup = () => {
    dispatch(set_log_out_popup(true));
 
  };

  const sideMenuSection1 = [
    {
      url_param: "/dashboard",
      icon: (
        <Dashboard_svg
          color={the_route === "/dashboard" ? "#ffffff" : "#666666"}
        />
      ),
      title: "Dashboard",
    },
    {
      url_param: "/vehicle",
      icon: (
        <Vehicle_svg color={the_route === "/vehicle" ? "#ffffff" : "#666666"} />
      ),
      title: "Vehicle",
    },
    {
      url_param: "/trips",
      icon: (
        <Trips_svg color={the_route === "/trips" ? "#ffffff" : "#666666"} />
      ),
      title: "Trips",
    },
    {
      url_param: "/terminals",
      icon: (
        <Terminal_svg
          color={the_route === "/terminals" ? "#ffffff" : "#666666"}
          color2={the_route === "/terminals" ? "#ffffff" : "#333333"}
        />
      ),
      title: "Terminals",
    },
    {
      url_param: "/ticket",
      icon: (
        <Booking_svg color={the_route === "/ticket" ? "#ffffff" : "#666666"} />
      ),
      title: "Ticket",
    },
    {
      url_param: "/driver/upcoming-trips",
      url_param2: "/driver/ongoing-trips",
      url_param3: "/driver/completed-trips",


      icon: (
        <Drive_svg color={
          the_route === "/driver/upcoming-trips" ? "#ffffff" : 
          the_route === "/driver/ongoing-trips" ? "#ffffff" : 
          the_route === "/driver/completed-trips" ? "#ffffff" : 
          "#666666"} />
      ),
      title: "Driver",
    },
    {
      url_param: "/dispatch/upcoming-trips",
      url_param2: "/dispatch/ongoing-trips",
      url_param3: "/dispatch/completed-trips",
      icon: (
        <Dispatch_svg
          color={the_route === "/dispatch/upcoming-trips" ? "#ffffff" 
          : the_route === "/dispatch/ongoing-trips" ? "#ffffff" 
          : the_route === "/dispatch/completed-trips" ? "#ffffff" 
          : "#666666"}
          color2={the_route === "/dispatch/upcoming-trips" ? "#ffffff" 
          : the_route === "/dispatch/ongoing-trips" ? "#ffffff" 
          : the_route === "/dispatch/completed-trips" ? "#ffffff" 
          : "#333333"}
        />
      ),
      title: "Dispatch",
    },
  ];
  const sideMenuSection2 = [
    {
      url_param: "/user/customers",
      url_param2: "/user/admin",
      url_param3: "/user/operational-head",
      url_param4: "/user/terminal-manager",
      url_param5: "/user/ticketer",
      url_param6: "/user/driver",
      url_param7: "/user/finance",
      url_param8: "/user/mechanic",
      url_param9: "/user/customer-care",
      icon: (
        <User_svg
          color={
            the_route === "/user/customers"
              ? "#ffffff"
              : the_route === "/user/admin"
              ? "#ffffff"
              : the_route === "/user/operational-head"
              ? "#ffffff"
              : the_route === "/user/terminal-manager"
              ? "#ffffff"
              : the_route === "/user/ticketer"
              ? "#ffffff"
              : the_route === "/user/driver"
              ? "#ffffff"
              : the_route === "/user/finance"
              ? "#ffffff"
              : the_route === "/user/mechanic"
              ? "#ffffff"
              : the_route === "/user/customer-care"
              ? "#ffffff"
              : "#666666"
          }
          color2={
            the_route === "/user/customers"
              ? "#ffffff"
              : the_route === "/user/admin"
              ? "#ffffff"
              : the_route === "/user/operational-head"
              ? "#ffffff"
              : the_route === "/user/terminal-manager"
              ? "#ffffff"
              : the_route === "/user/ticketer"
              ? "#ffffff"
              : the_route === "/user/driver"
              ? "#ffffff"
              : the_route === "/user/finance"
              ? "#ffffff"
              : the_route === "/user/mechanic"
              ? "#ffffff"
              : the_route === "/user/customer-care"
              ? "#ffffff"
              : "#333333"
          }
        />
      ),
      icon2: (
        <ArrowDown_svg
          color={
            the_route === "/user/customers"
              ? "#ffffff"
              : the_route === "/user/admin"
              ? "#ffffff"
              : the_route === "/user/operational-head"
              ? "#ffffff"
              : the_route === "/user/terminal-manager"
              ? "#ffffff"
              : the_route === "/user/ticketer"
              ? "#ffffff"
              : the_route === "/user/driver"
              ? "#ffffff"
              : the_route === "/user/finance"
              ? "#ffffff"
              : the_route === "/user/mechanic"
              ? "#ffffff"
              : the_route === "/user/customer-care"
              ? "#ffffff"
              : "#666666"
          }
        />
      ),
      title: "User",
    },
    {
      url_param: "/messages",
      icon: (
        <Messages_svg
          color={the_route === "/messages" ? "#ffffff" : "#666666"}
        />
      ),
      icon2: (
        <ArrowDown_svg
          color={the_route === "/messages" ? "#ffffff" : "#666666"}
        />
      ),
      title: "Messages",
    },
    {
      url_param: "/revenue",
      icon: (
        <Revenue_svg
          color={the_route === "/revenue" ? "#ffffff" : "#666666"}
          color2={the_route === "/revenue" ? "#ffffff" : "#333333"}
        />
      ),
      icon2: (
        <ArrowDown_svg
          color={the_route === "/revenue" ? "#ffffff" : "#666666"}
        />
      ),
      title: "Revenue",
    },
    {
      url_param: "/erp/all-items",
      url_param2: "/erp/pending-requests",
      url_param3: "/erp/approved-requests",

      icon: (
        <User_svg
          color={
            the_route === "/erp/all-items"
              ? "#ffffff"
              : the_route === "/erp/pending-requests"
              ? "#ffffff"
              : the_route === "/erp/approved-requests"
              ? "#ffffff"
 
     
              : "#666666"
          }
          color2={
            the_route === "/erp/all-items"
            ? "#ffffff"
            : the_route === "/erp/pending-requests"
            ? "#ffffff"
            : the_route === "/erp/approved-requests"
            ? "#ffffff"
              : "#333333"
          }
        />
      ),
 
      title: "ERP",
    },
    {
      url_param: "/erp/all-items",
      url_param2: "/erp/pending-requests",
      url_param3: "/erp/approved-requests",

      icon: (
        <User_svg
          color={
            the_route === "/erp/all-items"
              ? "#ffffff"
              : the_route === "/erp/pending-requests"
              ? "#ffffff"
              : the_route === "/erp/approved-requests"
              ? "#ffffff"
 
     
              : "#666666"
          }
          color2={
            the_route === "/erp/all-items"
            ? "#ffffff"
            : the_route === "/erp/pending-requests"
            ? "#ffffff"
            : the_route === "/erp/approved-requests"
            ? "#ffffff"
              : "#333333"
          }
        />
      ),
 
      title: "Mechanic",
    },
  ];
  const sideMenuSection3 = [
    {
      url_param: "/settings",
      icon: (
        <Settings_svg
          color={the_route === "/settings" ? "#ffffff" : "#666666"}
        />
      ),
      title: "Settings",
    },
    {
      url_param: "",
      icon: <Logout_svg />,
      title: "Logout",
    },
  ];

  return (
    <div className="mobile-side-nav-container">
      <div className="mobile-snc-side">
        <div className="ss-logo-container">
          <img src="/login/gdm-logo.svg" alt="..." className="slc-logo" />
          <div className="slc-text">GREATDAY MOTORS</div>
        </div>
        <div className="snss-menu">
        {
          sideMenuSection1.map((menu, index) => (
            userDetails.role === "super-admin" && menu.title !== "Driver"   || userDetails.role === "admin" 
            || userDetails.role === "ticket-manager" 
            && menu.title === "Ticket" 
            || userDetails.role === "terminal-manager" 
            && menu.title === "Trips" 
            || userDetails.role === "terminal-manager" 
            && menu.title === "Ticket" 
            || userDetails.role === "terminal-manager" 
            && menu.title === "Dispatch" 
            || userDetails.role === "driver" 
            && menu.title === "Driver" 
            
            ?
            <div
              key={index.toString()}
              className={`${
                the_route === menu.url_param ? "dashboard-nav-button-active"
                :the_route === menu.url_param2 ? "dashboard-nav-button-active"
                :the_route === menu.url_param3 ? "dashboard-nav-button-active"
                  : "dashboard-nav-button "
              } ${popupValue === true ? "not-allowed" : ""}`}
              onClick={
                popupValue === false
                  ? () => navigate(`${menu.url_param}`)
                  : null
              }
            >
              <div className="dnb-icon">{menu.icon}</div>
              <div>{menu.title}</div>
            </div>:null
          ))
        }
          {/* SECTION TWO */}

          {sideMenuSection2.map((menu, index) => (
                        userDetails.role === "super-admin" &&  menu.title !== "Mechanic"  ||
                         userDetails.role === "admin"  &&  menu.title !== "Mechanic" ||
                         userDetails.role === "mechanic"  &&  menu.title === "Mechanic" ?
            <div
              key={index.toString()}
              className={`${
                the_route === menu.url_param
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param2
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param3
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param4
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param5
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param6
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param7
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param8
                  ? "dashboard-nav-button-active2"
                  : the_route === menu.url_param9
                  ? "dashboard-nav-button-active2"
                  : "dashboard-nav-button2 "
              } ${popupValue === true ? "not-allowed" : ""}`}
              onClick={
                popupValue === false
                  ? () => navigate(`${menu.url_param}`)
                  : null
              }
            >
              <div className="dnb-icon">{menu.icon}</div>
              <div>{menu.title}</div>

              <div
                className={`${
                  index == 0
                    ? "icon-down-margin2"
                    : index === 1
                    ? "icon-down-margin1"
                    : "icon-down-margin3"
                }`}
              >
                {menu.icon2}
              </div>
            </div>:null
          ))}
      

          {/* SECTION THREE */}
          <div style={{ marginTop: "150px", marginBottom: "70px" }}>
            {sideMenuSection3.map((menu, index) => (
                          userDetails.role === "super-admin" 
                          || userDetails.role === "ticket-manager" 
                          || userDetails.role === "admin" 
                          || userDetails.role === "terminal-manager" 
                          || userDetails.role === "driver" 
                          || userDetails.role === "mechanic" 
                     
                       
                        
                          
                          ?
              <div
                key={index.toString()}
                className={` ${
                  the_route === menu.url_param
                    ? "dashboard-nav-button-active2"
                    : "dashboard-nav-button2 "
                } ${popupValue === true ? "not-allowed" : ""}`}
                // onClick={ () => navigate(`${menu.url_param}`)}
                onClick={
                  index === 0 && popupValue === false
                    ? () => navigate(`${menu.url_param}`)
                    : index === 1 && popupValue === false
                    ? showLogoutPopup
                    : null
                }
              >
                <div className="dnb-icon">{menu.icon}</div>
                <div>{menu.title}</div>
              </div>
              :null
            ))}
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default MobileSideNav;
