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
import EditCustomerCustomModal from "./components/edit_customer_custom_modal";
import DeleteCustomerCustomModal from "./components/delete_customer_custom_modal";

const Customers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customersData, setCustomersData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [customerDataForModal, setCustomerDataForModal] = useState({});
  const columns = [
    { id: "name", label: "Name" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  useEffect(() => {
		fetchData();
	}, []);

    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + "/auth/customer/46", {
          headers: {
            "Content-Type": "application/json",
            access_token: accessToken,
          },
        });
        if (response.data) {
          // Thực hiện map trực tiếp và lưu vào biến CustomerData
          setCustomersData(response.data.data.data.map((data) => ({ ...data })));
        } else {
          // Xử lý khi response không có dữ liệu
          setCustomersData([]); // Đảm bảo CustomerData không bao giờ là null
        }
      } catch (error) {
        // Xử lý lỗi trong quá trình gửi request
        setCustomersData([]); // Đảm bảo CustomerData không bao giờ là null
      }
    };

    const setDeletedForCustomer = async (isDeleted, customerData) => {
      try {
        await axios.put(
          baseUrl + `/auth/account/${customerData["id"]}`,
          { ...customerData, deleted: isDeleted },
          {
            headers: {
              "Content-Type": "application/json",
              access_token: accessToken,
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (customerData) => {
    setCustomerDataForModal(customerData);
    setOpenModal(true);
  };

  const handleCloseEditModal = () => {
		fetchData();
		setOpenModal(false);
	};

  const handleOpenDeleteModal = async (customerData) => {
		await setDeletedForCustomer(true, customerData);
		setCustomerDataForModal(customerData);
		setOpenDeleteModal(true);
	};

  const handleCloseDeleteModal = async () => {
		fetchData();
		setOpenDeleteModal(false);
	};

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box pt={3}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={customersData.length}
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
                  {customersData
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
                              {`${row["first_name"]} ${row["last_name"]}`}
                            </TableCell>
                            <TableCell key={index}>{row["type"]}</TableCell>
                            <TableCell key={index}>
                              {row["activated"]}
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
																	onClick={() => handleOpenDeleteModal(row)}>
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
              count={customersData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
      <EditCustomerCustomModal
        data={customerDataForModal}
        openModal={openModal}
        handleCloseModal={handleCloseEditModal}
      />
      <DeleteCustomerCustomModal
				data={customerDataForModal}
				openModal={openDeleteModal}
				handleCloseModal={handleCloseDeleteModal}
			/>
    </>
  );
};

export default Customers;
