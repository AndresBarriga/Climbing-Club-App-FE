import { Card, CardContent, CardMedia, Typography} from "@mui/material";
import psicobloc from "../../../../styles/images/Deep Soloing.jpeg"
import iconboulder from '../../../../styles/images/icon-boulder.png'
import climbingindoors from "../../../../styles/images/indoors.png";
import quickdraw from "../../../../styles/images/quickdraw.png";
import tradi from "../../../../styles/images/tradi.png";
import boulderoutdoors from "../../../../styles/images/boulderoutdoiors.png";


// Mapping of climbing styles to images
const climbingStyleImages = {
    "Deep water solo": psicobloc,
    "Boulder Indoors": iconboulder,
    "Climb Indoors": climbingindoors,
    "Sports Climbing": quickdraw,
    "Traditional Climbing": tradi,
    "Boulder outdoors": boulderoutdoors,
  };
// ClimbingStyleCardProfile component
function ClimbingStyleCardProfile({ climbingStyle }) {
  // Get the image for the climbing style
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