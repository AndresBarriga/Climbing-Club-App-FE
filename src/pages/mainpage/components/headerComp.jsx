import { Typography, Box} from "@mui/material";
import { grey, green } from "@mui/material/colors";

// COMPONENT THAT WILL BE RENDERED ON DASHBOARD PAGE; DEPENDING THE SECTION WILL HAVE DIFFERENT TITLE. EXAMPLE -> DASHBOARD. Welcome to your dashboard
const HeaderComp = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={grey}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={green}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default HeaderComp;