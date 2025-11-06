import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";

import Inquiry from "../pages/Inquiry/Inquiry";
import Area from "../pages/Area/Area";
import Building from "../pages/Building/Building";
import Property from "../pages/Property/Property";
import PropertySpecificType from "../pages/Settings/PropertySpecificType";
import Propertysource from "../pages/Settings/PropertySource";
import PropertyType from "../pages/Settings/PropertyType";
import { Navigate } from "react-router-dom";
import Buildingconfiguration from "../pages/BuildingConfiguration/Buildingconfiguration";

export const appRoutes = [
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/dashboard", label: "Dashboard", element: <Dashboard /> },
  { path: "/inquiry", label: "Inquiry", element: <Inquiry /> },
  { path: "/area", label: "Area", element: <Area /> },
  { path: "/building", label: "Building", element: <Building /> },
  { path: "/property", label: "Property", element: <Property /> },
  { path: "/settings/users", label: "Users", element: <Users /> },
  {
    path: "/settings/propertyType",
    label: "Property plantype",
    element: <PropertyType />,
  },
  {
    path: "/settings/propertySource",
    label: "Property source",
    element: <Propertysource />,
  },
  {
    path: "/settings/propertySpecificType",
    label: "Property specific type",
    element: <PropertySpecificType />,
  },
  {
    path: "/settings/buildingconfiguration",
    label: "Building configuration",
    element: <Buildingconfiguration />,
  },
];
