import { Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';

export const MuiPicker = ({ onDateSelected })  => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");

    const formatDate = (date) => {
        if (date) {
            return dayjs(date).format("DD/MM/YYYY");
        }
        return ""; // Return an empty string if the date is not selected
    };

    const handleDateChange = (e) => {
        const newDate = e;
        setSelectedDate(newDate);
        const formatted = formatDate(newDate);
        setFormattedDate(formatted);
        console.log("Selected Date:", formattedDate);

         // Call the callback function with the formatted date
         onDateSelected(formatted);
    };

    return (
        <Stack spacing={4} sx={{ width: "250" }}>
            <DatePicker
                label="Select your Birthdate"
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        value: formatDate(selectedDate), // Set the formatted date as the value
                    }
                }}
            />
        </Stack>
    );
}