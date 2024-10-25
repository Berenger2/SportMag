import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import AuthContext from "../../Context/AuthContext";

export default function ProfilNav() {
  const { user } = useContext(AuthContext); 

  return (
    <>
      <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
        <div className="sidebar sticky-bar p-4 rounded shadow">
          <div className="widget mt-4">
            <ul className="list-unstyled sidebar-nav mb-0" id="navmenu-nav">
              
            {user && (user.role === "admin" || user.role === "adherent") && (
                <li className="navbar-item account-menu px-0 mt-2">
                  <Link
                    to="/dashboard"
                    className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                  >
                    <span className="h4 mb-0">
                      <i className="uil uil-dashboard"></i>
                    </span>
                    <h6 className="mb-0 ms-2">Dashboard</h6>
                  </Link>
                </li>
              )}

              <li className="navbar-item account-menu px-0 mt-2">
                <Link
                  to="/products"
                  className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                >
                  <span className="h4 mb-0">
                    <i className="uil uil-document-info"></i>
                  </span>
                  <h6 className="mb-0 ms-2">Mes Produits</h6>
                </Link>
              </li>
              <li className="navbar-item account-menu px-0 mt-2">
                <Link
                  to="/category"
                  className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                >
                  <span className="h4 mb-0">
                    <i className="uil uil-document-info"></i>
                  </span>
                  <h6 className="mb-0 ms-2">Mes Categories</h6>
                </Link>
              </li>
              <li className="navbar-item account-menu px-0 mt-2">
                  <Link
                    to="/userlist"
                    className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                  >
                    <span className="h4 mb-0">
                      <i className="uil uil-users-alt"></i>
                    </span>
                    <h6 className="mb-0 ms-2">Liste des utilisateurs</h6>
                  </Link>
                </li>
             

              <li className="navbar-item account-menu px-0 mt-2">
                <Link
                  to="/settings"
                  className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                >
                  <span className="h4 mb-0">
                    <i className="uil uil-setting"></i>
                  </span>
                  <h6 className="mb-0 ms-2">Paramètres</h6>
                </Link>
              </li>

              <Logout />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
