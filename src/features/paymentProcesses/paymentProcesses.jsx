import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Stack,
} from "@mui/material";
import { Info, DeleteForever } from "@mui/icons-material";
import { baseUrl, accessToken } from "../../core/constants/constants";
import UserCustomModal from "./components/edit_payment_process_custom_modal";

const PaymentProcesses = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usersData, setUsersData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userDataForModal, setUserDataForModal] = useState({});
  const columns = [
    { id: "payment_method_id", label: "Method" },
    { id: "payment_time_example", label: "Time" },
    { id: "flag_time", label: "Total time" },
    { id: "action", label: "Action" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl + "/auth/paymentMethodProcess", {
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken,
        },
      });
      if (response.data) {
        console.log("response", response.data.data);
        // Thực hiện map trực tiếp và lưu vào biến userData
        setUsersData(response.data.data.map((data) => ({ ...data })));
      } else {
        // Xử lý khi response không có dữ liệu
        setUsersData([]); // Đảm bảo userData không bao giờ là null
      }
    } catch (error) {
      // Xử lý lỗi trong quá trình gửi request
      setUsersData([]); // Đảm bảo userData không bao giờ là null
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (userData) => {
    setUserDataForModal(userData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    fetchData();
    setOpenModal(false);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box pt={3}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={usersData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell key={index}>
                              {`${row["payment_method_id"]}`}
                            </TableCell>
                            <TableCell key={index}>
                              {row["payment_time_example"]}
                            </TableCell>
                            <TableCell key={index}>
                              {row["flag_time"]}
                            </TableCell>
                            <TableCell key={index}>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  variant="text"
                                  size="large"
                                  onClick={() => handleOpenModal(row)}
                                >
                                  <Info style={{ color: "#616161" }} />
                                </Button>
                                <Button
                                  variant="text"
                                  size="large"
                                  onClick={() => {
                                    alert("clicked");
                                  }}
                                >
                                  <DeleteForever style={{ color: "#f44336" }} />
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={usersData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
      <UserCustomModal
        data={userDataForModal}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default PaymentProcesses;
