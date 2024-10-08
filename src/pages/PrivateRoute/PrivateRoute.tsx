import React, {FC, useContext, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from "../../constants";
import {StoreContext} from "../../stores/root.store";

interface PrivateRouteProps {
    component: FC;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component }) => {
    const { usersStore } = useContext(StoreContext);

    return usersStore.login ? <Component /> : <Navigate to={ROUTES.AUTHORIZATION} replace />;
};
