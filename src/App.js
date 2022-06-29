import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Breadcrumb } from "./components/Breadcrumb";
import { EmployeeList } from "./components/List";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import axios from "axios";
import {ThrobberLoader} from "./components/Loader";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [sideBarStatus, setSideBarStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
        setEmployees(data);

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  const addEmployee = (newEmployee) => {
    (async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.post("https://jsonplaceholder.typicode.com/users", newEmployee);
        setEmployees([...employees, data]);

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }

  const updateEmployee = (id, updatedEmployee) => {
    (async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedEmployee);

        const tmp = employees.map((v) => {
          if (v.id === id) {
            v = data;
          }
          return v;
        })

        setEmployees(tmp);

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }

  return (
    <>
      {isLoading && <ThrobberLoader/>}
      <div className={`sb-nav-fixed ${sideBarStatus && "sb-sidenav-toggled"}`}>
        <Navbar toggleSidebarClass={() => setSideBarStatus(!sideBarStatus)} />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Tables</h1>
                <Breadcrumb />
                <Card>
                  DataTables is a third party plugin that is used to generate the
                  demo table below. For more information about DataTables, please
                  visit the
                  <a target="_blank" href="https://datatables.net/">
                    official DataTables documentation
                  </a>
                  .
                </Card>
                <Card title="DataTable Example">
                  <EmployeeList items={employees}
                                addEmployee={addEmployee}
                                updateEmployee={updateEmployee}
                  />
                </Card>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
