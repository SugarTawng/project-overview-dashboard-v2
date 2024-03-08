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
import { ConvertDateTime } from "../../utils/core_utils";

const PaymentProcessCustomModal = ({ data, openModal, handleCloseModal }) => {
 console.log(data);
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
             value={data["payment_method_id"]}
             InputProps={{
               readOnly: true,
             }}
           />
         </Grid>
         <Grid item spacing={3}>
           <TextField
             label="Time"
             value={data["payment_time_example"]}
             InputProps={{
               readOnly: true,
             }}
           />
         </Grid>
         <Grid item spacing={3}>
           <TextField
             label="Include VAT"
             value={data["include_vat"]}
             InputProps={{
               readOnly: true,
             }}
           />
         </Grid>
         <Grid item spacing={3}>
           <TextField
             label="Total percent payment"
             value={data["total_percent_payment"]}
             InputProps={{
               readOnly: true,
             }}
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
     </Box>
   </Modal>
 );
};

export default PaymentProcessCustomModal;
