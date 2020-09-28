import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../datalayer/StateProvider";
import "./TableEdit.css";
import _ from "lodash";

function TableEdit() {
  const [{ data, record, storeType }, dispatch] = useStateValue();
  console.log(record);
  const [dataEntried, setDataEntried] = useState({});
  const history = useHistory();

  useEffect(() => {
    setDataEntried(_.omit(record, ["id"]));
  }, [record]);

  const changeHandler = (event, key) => {
    setDataEntried({ ...dataEntried, [key]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const objIndex = data.findIndex((obj) => obj.id == record.id);
    const newData = [...data];
    newData[objIndex] = { ...record, ...dataEntried };
    console.log(newData);
    dispatch({
      type: "MODIFY_DATA",
      data: newData,
    });
    history.push("/");
  };

  const findSchema = (record, key) => {
    return typeof record[key];
  };

  return (
    <div className="container mt-5">
      <form className="formClass">
        <h2>
          Edit {storeType} {record?.id}
        </h2>
        {Object.keys(record).map(
          (key) =>
            key !== "id" && (
              <input
                key={key}
                type={findSchema(record, key)}
                onChange={(event) => changeHandler(event, key)}
                value={dataEntried[key] || ""}
                placeholder={`${_.capitalize(key)}`}
              />
            )
        )}
        <button className="button" type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default TableEdit;
