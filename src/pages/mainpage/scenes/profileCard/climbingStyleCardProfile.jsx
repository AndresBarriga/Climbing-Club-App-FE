import { Card, CardContent, CardMedia, Typography} from "@mui/material";
import psicobloc from "../../../../styles/images/logos/Deep Soloing.jpeg"
import iconboulder from "../../../../styles/images/logos/icon-boulder.png";
import climbingindoors from "../../../../styles/images/logos/indoors.png";
import quickdraw from "../../../../styles/images/logos/quickdraw.png";
import tradi from "../../../../styles/images/logos/tradi.png";
import boulderoutdoors from "../../../../styles/images/logos/boulderoutdoiors.png";

const climbingStyleImages = {
    "Deep water solo": psicobloc,
    "Boulder Indoors": iconboulder,
    "Climb Indoors": climbingindoors,
    "Sports Climbing": quickdraw,
    "Traditional Climbing": tradi,
    "Boulder outdoors": boulderoutdoors,
  };

function ClimbingStyleCardProfile({ climbingStyle }) {
    const image = climbingStyleImages[climbingStyle];
    return (
      image && (
        <Card sx={{ maxWidth: 90, margin: '10px auto' }}>
          <CardMedia
            component="img"
            height="50"
            image={image}
            alt={climbingStyle}
          />
          <CardContent>
            <Typography variant="body2" component="div">
              {climbingStyle}
            </Typography>
          </CardContent>
        </Card>
      )
    );
  }
  


export default ClimbingStyleCardProfile;