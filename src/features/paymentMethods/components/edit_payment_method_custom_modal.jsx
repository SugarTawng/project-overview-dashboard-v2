import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { ConvertDateTime } from "../../../core/utils/core_utils";
import { useState } from "react";
import axios from "axios";
import { accessToken, baseUrl } from "../../../core/constants/constants";

const EditPaymentMethodCustomModal = ({
  data,
  openModal,
  handleCloseModal,
}) => {
  const [methodName, setMethodName] = useState("");
  const [totalOfPaymentTime, setTotalOfPaymentTime] = useState("");
  const [percentDiscount, setPercentDiscount] = useState("");
  const [VAT, setVAT] = useState("");
  const [maintenanceFee, setMaintenanceFee] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleOnSave = async () => {
    const newPaymentMethodData = {
      ...data,
      method_name: methodName,
      total_of_payment_time: totalOfPaymentTime,
      percent_discount: percentDiscount,
      vat: VAT,
      maintenance_fee: maintenanceFee,
      total_price: totalPrice,
      updated_at: new Date().toLocaleString(),
    };

    try {
      await axios
        .put(
          baseUrl + `/auth/paymentMethod/${data["id"]}`,
          newPaymentMethodData,
          {
            headers: {
              "Content-Type": "application/json",
              access_token: accessToken,
            },
          }
        )
        .then((value) => {
          handleCloseModal();
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnCancel = () => {
    handleCloseModal();
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "max-width",
          bgcolor: "background.paper",
          boxShadow: 20,
          pt: 2,
          px: 2,
          pb: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component="h2">
            Payment Method Details
          </Typography>
          <Button variant="text" size="large" onClick={handleCloseModal}>
            <Clear style={{ color: "#616161" }} />
          </Button>
        </Stack>
        <Divider style={{ background: "black" }} />
        <Grid container spacing={1}>
          <Grid item spacing={3}>
            <TextField
              label="Method name"
              defaultValue={data["method_name"]}
              onChange={(event) => setMethodName(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Project id"
              defaultValue={data["project_id"]}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Total of payment time"
              defaultValue={data["total_of_payment_time"]}
              onChange={(event) => setTotalOfPaymentTime(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Percent discount"
              defaultValue={data["percent_discount"]}
              onChange={(event) => setPercentDiscount(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="VAT"
              defaultValue={data["vat"]}
              onChange={(event) => setVAT(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Maintenance fee"
              defaultValue={data["maintenance_fee"]}
              onChange={(event) => setMaintenanceFee(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Total price"
              defaultValue={data["total_price"]}
              onChange={(event) => setTotalPrice(event.target.value)}
            />
          </Grid>
        </Grid>
        <Divider style={{ background: "black" }} light />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <p>
            <b>Created At: </b> {ConvertDateTime(data["created_at"])}
          </p>

          <p>
            <b>Updated At: </b>
            {ConvertDateTime(data["updated_at"])}
          </p>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant="text"
            style={{ color: "#6c757d" }}
            onClick={handleOnCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleOnSave}>
            <Typography variant="caption" color="#fff">
              Save
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditPaymentMethodCustomModal;
