import React, { component } from "react";
import Demo from "./demo/Demo";
import Home from "./pages/Home";
import Myfeed from "./pages/Myfeed";
import Upload from "./pages/Upload";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Photo from "./pages/EditAvater";
import Editbakcground from "./pages/EditBack";
import Wallet from "./pages/wallet";
import Contactinfo from "./pages/Contactinfo";
import Password from "./pages/Password";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Registercomponent from "./pages/Register";
import Forgot from "./pages/Forgot";
import Changepass from "./pages/Changepass";
import Profile from "./pages/Profile";
import Save from "./pages/Save";
import Viewpost from "./pages/Viewpost";
import Event from "./pages/Event";
import UserProfile from "./pages/UserProfile";
import Videos from "./pages/Videos";
import Notfound from "./pages/Notfound";
import Send from "./pages/Send";
import Swap from "./pages/Swap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./protectedroute";
const Routes = () => {
  return (
    <BrowserRouter basename={"/"}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Demo} />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/login`}
          component={() => <Login />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/register`}
          component={() => <Registercomponent />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/forgot`}
          component={Forgot}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/changepass`}
          component={Changepass}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/home`}
          component={Home}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/myfeed`}
          component={Myfeed}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/upload`}
          component={Upload}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/settings`}
          component={Settings}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/bookmark`}
          component={Videos}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/editprofile`}
          component={Account}
        />
        {/* kch */}
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/editphoto`}
          component={Photo}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/editbackground`}
          component={Editbakcground}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/wallet`}
          component={Wallet}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/send`}
          component={Send}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/swap`}
          component={Swap}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/contactinformation`}
          component={Contactinfo}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/password`}
          component={Password}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/payment`}
          component={Payment}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/mapping`}
          component={Event}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/mapping/:b_id`}
          component={Event}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/profile`}
          component={Profile}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/profile/:username`}
          component={UserProfile}
        />
        <ProtectedRoute
          exact
          path={`${process.env.PUBLIC_URL}/save`}
          component={Save}
        />
        <ProtectedRoute
          path={`${process.env.PUBLIC_URL}/view:blogid`}
          component={Viewpost}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/*`}
          component={Notfound}
        />

        {/* <<Route  exact path={`${process.env.PUBLIC_URL}/defaultgroup`} component={Group} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/helpbox`} component={Helpbox} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/notfound`} component={Notfound} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/shop1`} component={ShopOne} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/shop3`} component={ShopThree} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/singleproduct`} component={Singleproduct} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/defaultlive`} component={Live} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/defaultjob`} component={Job} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/defaulthotel`} component={Hotel} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/grouppage`} component={Grouppage} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/authorpage`} component={Authorpage} /> */}
        {/* <Route exact path={`${process.env.PUBLIC_URL}/comingsoon`} component={Comingsoon} />
            <Route exact path={`${process.env.PUBLIC_URL}/defaulthoteldetails`} component={Hotelsingle} /> */}
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
