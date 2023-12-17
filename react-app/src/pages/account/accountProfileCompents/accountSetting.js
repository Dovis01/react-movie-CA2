import React, {useState} from 'react';
import { Container, Grid, TextField, FormControl, Select, MenuItem, Button } from '@mui/material';
import Typography from "@mui/material/Typography";

function AccountSettings() {
    const [country, setCountry] = useState('china');

    const countryCitiesMap = {
        america: [
            "New York", "California", "Washington", "Texas", "Florida", "Illinois", "Pennsylvania", "Ohio"
        ],
        england: [
            "London", "Manchester", "Liverpool", "Birmingham", "Leeds", "Bristol", "Newcastle", "Sheffield"
        ],
        ireland: [
            "Dublin", "Cork", "Galway", "Limerick", "Waterford", "Drogheda", "Dundalk", "Bray"
        ],
        france: [
            "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier"
        ],
        germany: [
            "Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne", "Stuttgart", "Düsseldorf", "Dresden"
        ],
        japan: [
            "Tokyo", "Osaka", "Kyoto", "Hokkaido", "Nagoya", "Fukuoka", "Sapporo", "Kobe"
        ],
        australia: [
            "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Hobart"
        ],
        china: [
            "Beijing", "Shanghai", "Nanjing", "Hangzhou","Nantong","Suzhou","Wuxi","Xuzhou","Rugao","Dongtai"
        ],
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={5} xl={12} sx={{marginLeft:'-18px'}}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        First Name
                    </Typography>
                    <TextField
                        label="First Name"
                        fullWidth
                        defaultValue="Tim"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Last Name
                    </Typography>
                    <TextField
                        label="Last Name"
                        fullWidth
                        defaultValue="Cook"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{mt:'-21px'}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Phone Number
                    </Typography>
                    <TextField
                        label="Phone Number"
                        fullWidth
                        defaultValue="(408) 996–1010"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{mt:'-21px'}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Email Address
                    </Typography>
                    <TextField
                        label="Email Address"
                        fullWidth
                        defaultValue="tcook@apple.com"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{mt:'-21px'}}>
                    <FormControl fullWidth>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            City
                        </Typography>
                        <Select
                            defaultValue=""
                            variant="outlined"
                        >
                            {countryCitiesMap[country].map((city) => (
                                <MenuItem key={city} value={city.toLowerCase()}>{city}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} sx={{mt:'-21px'}}>
                    <FormControl fullWidth>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Country
                        </Typography>
                        <Select
                            value={country}
                            onChange={handleCountryChange}
                            defaultValue="china"
                            variant="outlined"
                        >
                            <MenuItem value="china">China</MenuItem>
                            <MenuItem value="america">America</MenuItem>
                            <MenuItem value="england">England</MenuItem>
                            <MenuItem value="ireland">Ireland</MenuItem>
                            <MenuItem value="australia">Australia</MenuItem>
                            <MenuItem value="japan">Japan</MenuItem>
                            <MenuItem value="france">France</MenuItem>
                            <MenuItem value="germany">Germany</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} xl={12} sx={{mt:'-6px'}}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Contact Address
                    </Typography>
                    <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="Contact Address"
                        placeholder="Placeholder"
                        multiline
                        maxRows={3}
                        inputProps={{
                            maxLength: 291
                        }}
                    />
                </Grid>
                <Grid item xs={12} sx={{mt:'1px'}}>
                    <Button variant="contained" color="primary" fullWidth sx={{height:'36.5px'}}>
                        Update Account Information
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AccountSettings;