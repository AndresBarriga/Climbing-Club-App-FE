import { Typography, Box, Divider, Button, Paper } from '@mui/material';
import psicobloc from '../../../../../styles/images/Deep Soloing.jpeg'
import iconboulder from "../../../../../styles/images/icon-boulder.png"
import climbingindoors from "../../../../../styles/images/indoors.png"
import quickdraw from "../../../../../styles/images/quickdraw.png"
import tradi from "../../../../../styles/images/tradi.png"
import boulderoutdoors from "../../../../../styles/images/boulderoutdoiors.png"
import ReviewClimbingStyleCardSmall from './reviewClimbingStyleCardSmall';





function ReviewStep({ formData, setActiveStep , handleFormSubmit}) {

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
};
const handleBack = () => {
  setActiveStep((prevStep) => prevStep - 1);
};

  const timeMapping = {
    earlyMorning: 'Early Morning',
    morning: 'Morning',
    midday: 'Midday',
    afternoon: 'Afternoon',
    lateAfternoon: 'Late Afternoon',
    wholeDay: 'Whole Day',
  };

  const styleImages = {
    'Climb Indoors': climbingindoors,
    'Boulder Indoors': iconboulder,
    'Sports Climbing': quickdraw,
    'Traditional Climbing': tradi,
    'Deep water solo': psicobloc,
    'Boulder outdoors': boulderoutdoors,
  };


  return (

    <Box sx={{ width: '100%', padding: 2 }}>
      <h1 className=" text-base sm:text-xl text-green-900 font-extrabold sm:mx-4 mb-2 sm:py-2">Last Step: Check your Climbing Request 🤓 📝</h1>
      <h2 className=" text-base sm:text-lg font-bold text-gray-700 sm:mx-4 mb-2 sm:py-2">Make sure all details are right❗❗ 🚨</h2>
      <Divider />

      <Typography className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }} variant="h5" >📌 I want to climb in: <span className="text-gray-700">{formData.area} {formData.region} </span></Typography>
      <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
        {!formData.areaChecked && formData.selectedRoutes && formData.selectedRoutes.length > 0 && (
          <>
            <Typography variant="h6" className="text-green-900 " sx={{ fontWeight: 'fontWeightMedium' }} >We could go to:</Typography>
            {formData.selectedRoutes.map((route, index) => (
              <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={index}>• {route.name}, it is a {route.route_style}</Typography>
            ))}
          </>
        )}
        {formData.areaChecked && (
          <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-red-700">* Request it is active for the whole area</Typography>
        )}
      </Box>
      <Divider />

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }} className="text-green-900 ">⏳ 📅  The time that fits me best is </Typography>
        <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
          {formData.timeData.isCompletelyFlexible ? (
            <Typography>Completely Flexible</Typography>
          ) : formData.timeData.startDate && formData.timeData.endDate ? (
            formData.timeData.startDate.isSame(formData.timeData.endDate, 'day') ? (
              <>
                <Typography sx={{ fontWeight: 'fontWeightMedium', fontSize: '1.1rem', marginTop:2 }} className="text-gray-700" >On: {formData.timeData.startDate.format('DD-MM-YYYY')} at {formData.timeData.startTime}</Typography>
              </>
            ) : (
              <>
                <Typography sx={{ fontWeight: 'fontWeightLight', fontSize: '1.1rem', marginTop:2 }} className="text-gray-700" >I want to make a trip starting on : <span className='font-medium'>{formData.timeData.startDate.format('DD-MM-YYYY')}</span>  and finishing on : <span className='font-medium'>{formData.timeData.endDate.format('DD-MM-YYYY')}</span></Typography>
                  </>
            )
          ) : (
            <>
              <Typography variant="h6" className="text-green-900 " sx={{ fontWeight: 'fontWeightMedium' }} >Any of the following days:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                formData.timeData[day] && formData.timeData[day].length > 0 && (
                  <Box sx={{ width: '50%', marginTop: 1 }}>
                    <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={day}> • {day}</Typography>
                    <Typography className="text-gray-700">at the {formData.timeData[day].map(time => timeMapping[time]).join(', ')}</Typography>
                  </Box>)
              ))}
              </Box>
            </>
          )}
        </Box>
        <Divider />

        <Typography className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }} variant="h5" >🧗🏼 I want to practice</Typography>
        <Box sx={{ marginLeft: 2, marginBottom: 2 }}>

          <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', flexWrap: 'wrap' }}>
            {formData.climbingStyle.map(style => (
              <ReviewClimbingStyleCardSmall
                key={style}
                image={styleImages[style]}
                text={style}
                isSelected={true}
                size="20px"
                disabled={true}
                style={{ margin: 0 }}
              />

            ))}
          </div>
        </Box>
        <Divider />
        <Box sx={{ marginTop: 2 }}>
        {Object.values(formData.material).some(value => value) && (
    <>

          <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}>🛠️ 🧰 The climbing equipment I bring </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 2, marginBottom: 2 }}>
            {Object.entries(formData.material).map(([item, value]) => (
              item !== 'Belay Device' && (
                <Box key={item} sx={{ width: '33.33%', padding: 1 }}>
                  <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={item}>
                    • {item}: {value.amount && `x${value.amount}`}
                    {value.size && ` / Size - ${value.size}`}
                  </Typography>
                </Box>
              )
            ))}
            {formData.material['Belay Device'] && (
              <Box sx={{ width: '33.33%', padding: 1 }}>
                <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" >• Belay Device: {formData.material['Belay Device']}</Typography>
              </Box>)}
          </Box>
          <Divider />
          </>
           )}
        </Box>
        
        <Box sx={{ marginTop: 2 }}>
        {Object.values(formData.neededMaterial).some(value => value) && (
    <>
          <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}> 🛠️ ♻️ The material I need you to bring</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 2, marginBottom: 2 }}>
            {Object.entries(formData.neededMaterial).map(([item, value]) => (
              item !== 'Belay Device' && (
                <Box key={item} sx={{ width: '33.33%', padding: 1 }}>
                  <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={item}>
                    • {item}: {value.amount && `x${value.amount}`}
                    {value.size && `, Size - ${value.size}`}
                  </Typography>
                  </Box>
              )
            ))}
            {formData.neededMaterial['Belay Device'] && (
              <Box sx={{ width: '33.33%', padding: 1 }}>
                <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" > • Belay Device: {formData.neededMaterial['Belay Device']}</Typography>
              </Box>
            )}
          </Box>
          <Divider />
          </>
            )}
        </Box>


      </Box>
      
      <Box sx={{ marginTop: 2 }}>
        
        <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}>Message 📣 💬</Typography>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 1, marginBottom: 2 }}>

          {formData.message ? (
            <Typography>{formData.message}</Typography>
          ) : (
            <Typography sx={{ color: 'grey.500', fontStyle: 'italic' }}>No message provided.</Typography>
          )}
        </Paper>
      </Box>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
                <Button variant="contained" color="primary" onClick={() => handleFormSubmit(formData)}>Submit</Button>
            </div>
    </Box>
  );
}



export default ReviewStep;