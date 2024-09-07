import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "../logics/login/inputSlice";
import checkRouteSlice from "../logics/check_route/checkRouteSlice";
import logoutPopupSlice from "../logics/logout_popup/logoutPopupSlice";
import vehicleDetailsSlice from "../logics/vehicle/vehicleDetailsSlice";
import editvehicleSlice from "../logics/vehicle/editvehicleSlice";
import universalCheckOLS from "../logics/universal_check_ol_status/universalCheckOLS";
import customerSlice from "../logics/user/customerSlice";
import userAdminSlice from "../logics/user/userAdminSlice";
import customerCareSlice from "../logics/user/customerCareSlice";
import driverSlice from "../logics/user/driverSlice";
import financeSlice from "../logics/user/financeSlice";
import mechanicSlice from "../logics/user/mechanicSlice";
import operationalHeadSlice from "../logics/user/operationalHeadSlice";
import terminalManagerSlice from "../logics/user/terminalManagerSlice";
import ticketerSlice from "../logics/user/ticketerSlice";
import pmSlice from "../logics/popupModal/pmSlice";
import terminalsSlice from "../logics/terminals/terminalsSlice";
import editTerminalSlice from "../logics/terminals/editTerminalSlice";
import terminalsDetailSlice from "../logics/terminals/terminalsDetailSlice";
import tripsSlice from "../logics/trips/tripsSlice";
import tripDetailsSlice from "../logics/trips/tripDetailsSlice";
import editTripSlice from "../logics/trips/editTripSlice";
import bookingSlice from "../logics/booking/bookingSlice";
import dispatchSlice from "../logics/dispatch/dispatchSlice";
import erpSlice from "../logics/erp/erpSlice";
import trigerAsyncSlice from "../logics/triggerAsyncEvent/trigerAsyncSlice";
import vehicleSlice from "../logics/vehicle/vehicleSlice";
import driverStaffSlice from "../logics/driver/driverStaffSlice";
import mechanicStaffSlice from "../logics/mechanicStaff/mechanicStaffSlice";
import allticketsReducer from "../logics/alltickets/AllTicketsSlicer";
import SingleTicketSlice from "../logics/alltickets/SingleTicketSlicer";
import SingleTerminalSlice from "../logics/terminals/SingleTerminal";
import deleteTicketerPopupSlice from "../logics/user/deleteTicketerPopupSlice";
import deleteTerminalPopupSlice from "../logics/user/deleteTerminalSlice";
import deleteTerminalSlice from "../logics/terminals/deleteTerminalSlice";

// VEHICLES
import vehicleReducer from "../logics/vehicle/reducer";
import loadingSlice from "../logics/vehicle/addVehicle/loadingSlice";
import uploadedVehicle from "../logics/vehicle/addVehicle/uploadedVehicle";
import singleVehicle from "../logics/vehicle/singleVehicle/singleVehicle";

// TRIPS
import tripReducer from "../logics/trips/reducer";
import loadingTripSlice from "../logics/trips/addTrip/loadingTripSlice";
import uploadedTrip from "../logics/trips/addTrip/uploadedTrip";
import singleTrip from "../logics/trips/singleTrip/singleTrip";
import ticketReducer from "../screens/booking/bookedTicket";
import MPSingleTrip from "../logics/dispatch/MPSingleTrip";
import MPSeatNumber from "../logics/dispatch/MPSeatNumber";
import MovePassengerID from "../logics/dispatch/MovePassengerID";
import revenueSlice from "../logics/revenue/revenueSlice";
import deleteCustomerCareSlice from "../logics/user/deleteCustomerCareSlice";
import deleteFinanceSlice from "../logics/user/deleteFinanceSlice";
import deleteMechanicSlice from "../logics/user/deleteMechanicSlice";
import deleteDriverSlice from "../logics/user/deleteDriverSlice";
import deleteTicketerSlice from "../logics/user/deleteTicketerSlice";
import deleteTerminalManagerSlice from "../logics/user/deleteTerminalManagerSlice";
import deleteOperationalManagerSlice from "../logics/user/deleteOperationalManagerSlice";
import deleteAdminSlice from "../logics/user/deleteAdminSlice";
import deleteCustomerSlice from "../logics/user/deleteCustomerSlice";
import driverAlarmSlice from "../logics/driver/driverAlarmSlice";
import SingleItemSlice from "../logics/erp/SingleItemSlice";

export const store = configureStore({
  reducer: {
    driverStaffSlice,
    mechanicStaffSlice,
    login_inputs: inputSlice,
    current_routes: checkRouteSlice,
    vehicleSlice,
    edit_vehicle: editvehicleSlice,
    logout_popup: logoutPopupSlice,
    vehicleDetail: vehicleDetailsSlice,
    tripsDetail: tripDetailsSlice,
    terminalsDetail: terminalsDetailSlice,
    universal_check_ols: universalCheckOLS,
    customer_slice: customerSlice,
    user_admin_slice: userAdminSlice,
    customer_care_slice: customerCareSlice,
    driver_slice: driverSlice,
    finance_slice: financeSlice,
    mechanic_slice: mechanicSlice,
    operational_head_slice: operationalHeadSlice,
    terminal_manager_slice: terminalManagerSlice,
    ticketer_slice: ticketerSlice,
    popup_modal_slice: pmSlice,
    terminals_slice: terminalsSlice,
    trips_slice: tripsSlice,
    edit_terminals_slice: editTerminalSlice,
    edit_trips_slice: editTripSlice,
    bookingSlice,
    dispatchSlice,
    erpSlice,
    trigerAsyncSlice,
    allticketsReducer,
    SingleTicketSlice,
    SingleTerminalSlice,
    deleteTicketerPopup: deleteTicketerPopupSlice,
    deleteTerminalPopup: deleteTerminalPopupSlice,
    deleteTerminal: deleteTerminalSlice,

    vehicleReducer,
    loading: loadingSlice,
    uploadedVehicle,
    singleVehicle,

    tripReducer,
    loadingTripSlice: loadingTripSlice,
    uploadedTrip,
    singleTrip,

    ticket: ticketReducer,
    MPSingleTrip: MPSingleTrip,
    MPSeatNumber: MPSeatNumber,
    MovePassengerID: MovePassengerID,

    revenueSlice,
    deleteCustomerCare: deleteCustomerCareSlice,
    deleteFinance: deleteFinanceSlice,
    deleteMechanic: deleteMechanicSlice,
    deleteDriver: deleteDriverSlice,
    deleteTicketer: deleteTicketerSlice,
    deleteTerminalManager: deleteTerminalManagerSlice,
    deleteOperationalManager: deleteOperationalManagerSlice,
    deleteAdmin: deleteAdminSlice,
    deleteCustomer: deleteCustomerSlice,
    
    alarmModal: driverAlarmSlice,
    SingleItemSlice: SingleItemSlice,
  },
});
