import {useEffect, useState} from "react";
import "./style.css";
import {Modal} from "../Modal";

export const EmployeeList = (props) => {
  const { items, addEmployee, updateEmployee } = props;

  // an input boiler template
  const INITIAL_EMPLOYEE = {
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    company: ""
  }

  const [modal, setModal] = useState({
    isActive: false,
    mode: "update"
  });

  const [currentState, setCurrentState] = useState(INITIAL_EMPLOYEE);

  const [isValid, setIsValid] = useState(false);

  /**
   * an useEffect used to validate the input entered to create or update an employee
   * <x>.trim() : to remove all the leading and trailling space from a string
   */
  useEffect(() => {
    const {name, username, email, phone, address, company} = currentState;

    if (name.trim() === "" || username.trim() === "" || email.trim() === "" ||
        !(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) ||
          phone.trim() === "" || address.trim() === "" || company.trim() === "")
    {
      setIsValid(false);
    } else setIsValid(true);

  }, [currentState]);

  /**
   * @param mode is a string which is mainly used to determine if the modal is actually
   * an update modal or an add (one)
   * @param id is the clicked employee line, that will be updated
   */
  const modalHandler = (mode, id) => {
    setModal({
      isActive: !modal.isActive,
      mode: mode || null
    })

    if (mode === "update" && id) {
      const emp = items.find(item => item.id === id);
      setCurrentState({...emp, address: emp.address.street, company: emp.company.name})
      return ;
    }

    setCurrentState(INITIAL_EMPLOYEE);
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setCurrentState(() => {
      return {...currentState, [name]: value};
    })
  }

  /**
   *
   * @returns object which is a more structured version of the employee, according to the real company obj
   */
  const parseEmployeeInfo = () => {
    const {address, company} = currentState;
    return {...currentState, address: { street: address }, company: { name: company }};
  }

  const handleOnAdd = () => {
    addEmployee(parseEmployeeInfo());
    modalHandler();
  }

  const handleOnUpdate = (id) => {
    updateEmployee(id, parseEmployeeInfo());
    modalHandler();
  }

  return (
    <>
      <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
        <div className="dataTable-top">
          <div className="dataTable-dropdown">
            <label>
              <select className="dataTable-selector" defaultValue={5}>
                <option value="5">5</option>
                <option value="10">
                  10
                </option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>{" "}
            </label>
          </div>
          <div className="dataTable-search">
            <button className="btn btn-outline-primary" onClick={() => modalHandler("add")}>Add</button>
          </div>
        </div>
        <div className="dataTable-container">
          <table className="table-bordered">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>username</th>
                <th>email</th>
                <th>Phone</th>
                <th>address</th>
                <th>company</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>username</th>
                <th>email</th>
                <th>Phone</th>
                <th>address</th>
                <th>company</th>
              </tr>
            </tfoot>
            <tbody>
              {
                (items || []).map((employee, index) => {
                  const { id, name, username, email, address, company, phone } = employee;

                  return (
                    <tr key={index} onClick={() => modalHandler("update", id)} >
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{address["street"]}</td>
                      <td>{company["name"]}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="dataTable-bottom">
          <nav className="dataTable-pagination">
            <ul className="dataTable-pagination-list">
              {
                Array(7).fill("").map((el, index) => {
                  return (
                    <li className={`${index === 0 && "active"}`} key={index}>
                      <a href="#" data-page={`index`}>
                        {index === 6 ? (
                          "›"
                        ) : index + 1}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
      </div>

      {modal.isActive &&
        <Modal
            header={modal.mode}
            footer={modal.mode}
            canSave={isValid}
            hide={modalHandler}
            onSave={() => (modal.mode && modal.mode.toString() === "update") ? handleOnUpdate(currentState.id) : handleOnAdd()}
        >
          <form>
            {
              Object.keys(currentState).map((attr, index) => (
                  !(attr === "id") && (
                      <div className="pt-2 pb-3" key={index}>
                        <label htmlFor={attr}>{attr}</label>
                        <input type="text"
                               name={attr}
                               className="form-control"
                               value={currentState[attr] || ""}
                               onChange={handleChange}
                        />
                      </div>
                  )
              ))
            }
          </form>
        </Modal>
      }
    </>
  )
}
