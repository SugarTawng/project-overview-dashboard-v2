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

const EditPaymentProcessCustomModal = ({
  data,
  openModal,
  handleCloseModal,
}) => {
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");
  const [includeVAT, setIncludeVAT] = useState("");
  const [totalPercentOfPayment, setTotalPercentOfPayment] = useState("");

  const handleOnSave = async () => {
    const newPaymentMethodProcessData = {
      ...data,
      payment_method_id: method,
      payment_time_example: time,
      include_vat: includeVAT,
      total_percent_payment: totalPercentOfPayment,
      updated_at: new Date().toLocaleString(),
    };
    console.log("data", data);

    try {
      await axios
        .put(
          baseUrl + `/auth/paymentMethodProcess/${data["id"]}`,
          newPaymentMethodProcessData,
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
            Payment Proccess Details
          </Typography>
          <Button variant="text" size="large" onClick={handleCloseModal}>
            <Clear style={{ color: "#616161" }} />
          </Button>
        </Stack>
        <Divider style={{ background: "black" }} />
        <Grid container spacing={1}>
          <Grid item spacing={3}>
            <TextField
              label="Method"
              defaultValue={data["payment_method_id"]}
              onChange={(event) => setMethod(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Time"
              defaultValue={data["payment_time_example"]}
              onChange={(event) => setTime(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Include VAT"
              defaultValue={data["include_vat"]}
              onChange={(event) => setIncludeVAT(event.target.value)}
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              label="Total percent payment"
              defaultValue={data["total_percent_payment"]}
              onChange={(event) => setTotalPercentOfPayment(event.target.value)}
            />
          </Grid>
        </Grid>
        <Divider style={{ background: "black" }} />
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

export default EditPaymentProcessCustomModal;
