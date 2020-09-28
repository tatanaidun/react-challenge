import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../datalayer/StateProvider";
import _ from "lodash";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import "./TableView.css";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "5% auto",
  },
  container: {
    maxHeight: 440,
  },
});

// const dummyData = [
//   { id: 1, product: "Sofa", price: 8000 },
//   { id: 2, product: "Desktop", price: 15000 },
//   { id: 3, product: "Watch", price: 5000 },
//   { id: 4, product: "Chair", price: 7000 },
//   { id: 5, product: "Laptop", price: 25000 },
//   { id: 6, product: "Washing Machine", price: 18000 },
//   { id: 7, product: "AC", price: 45000 },
//   { id: 8, product: "Bike", price: 75000 },
//   { id: 9, product: "Phone", price: 12000 },
//   { id: 10, product: "Fan", price: 800 },
//   { id: 11, product: "Refridgerator", price: 10000 },
//   { id: 12, product: "Macbook", price: 100000 },
// ];

export default function StickyHeadTable() {
  const [{ data, role }, dispatch] = useStateValue();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [currentState, setCurrentState] = useState("default");

  useEffect(() => {
    console.log("I am in data fetching useEffect");
    async function asyncDataFetching() {
      const url = process.env.API_URL;
      await fetch(url + "/api/data")
        .then((response) => response.json())
        .then((dataFromApi) => {
          const newData = dataFromApi.map((obj) => _.omit(obj, ["_id"]));
          dispatch({ type: "SET_DATA", data: newData });
        });
    }
    data.length == 0 && asyncDataFetching();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editClickHandler = (row) => {
    dispatch({ type: "SET_RECORD", record: row });
    history.push("/edit");
  };

  const ascdCompareBy = (key) => {
    return (a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };

  const descdCompareBy = (key) => {
    return (a, b) => {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    };
  };

  const sortBy = (key) => {
    let dataCopy = [...data];
    if (currentState === "default") {
      dataCopy.sort(ascdCompareBy(key));
      setCurrentState("ascd");
    } else if (currentState === "ascd") {
      dataCopy.sort(descdCompareBy(key));
      setCurrentState("default");
    }
    dispatch({ type: "SET_DATA", data: dataCopy });
  };

  return (
    <>
      {!data.length > 0 ? (
        <div />
      ) : (
        <div className="table">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className="tableHead">
                  <TableRow>
                    {data &&
                      Object.keys(data?.[0]).map((key, index) => (
                        <TableCell key={index} align="left">
                          {_.capitalize(key)}
                          <Tooltip
                            title="Filter list"
                            onClick={() => sortBy(key)}
                          >
                            <IconButton aria-label="filter list">
                              <FilterListIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {Object.keys(row).map((key, index) => {
                            const value = row[key];

                            return (
                              <TableCell
                                key={index}
                                align="left"
                                onClick={
                                  role === "admin"
                                    ? () => editClickHandler(row)
                                    : undefined
                                }
                              >
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {role === "admin" && (
              <p className="note">Please click on the row to edit</p>
            )}
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </>
  );
}
