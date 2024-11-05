import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  Switch
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const ProductPublicationSettings = () => {
  const [schedule, setSchedule] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchedule(event.target.checked);
    if (!event.target.checked) {
      // Si la planification est désactivée, on réinitialise à la date actuelle
      setSelectedDate(dayjs());
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography
        variant="h6"
        gutterBottom>
        Paramètres de Publication
      </Typography>

      {/* Statut de publication */}
      <FormControl
        fullWidth
        sx={{ mt: 2 }}>
        <InputLabel id="publication-status-label">
          Statut de publication
        </InputLabel>
        <Select
          labelId="publication-status-label"
          id="publication-status"
          label="Statut de publication"
          defaultValue="">
          <MenuItem value="draft">Brouillon</MenuItem>
          <MenuItem value="pending">En attente de relecture</MenuItem>
          <MenuItem value="published">Publié</MenuItem>
        </Select>
      </FormControl>

      {/* Visibilité */}
      <FormControl
        fullWidth
        sx={{ mt: 2 }}>
        <InputLabel id="visibility-label">Visibilité</InputLabel>
        <Select
          labelId="visibility-label"
          id="visibility"
          label="Visibilité"
          defaultValue="">
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Privé</MenuItem>
          <MenuItem value="password">Protégé par mot de passe</MenuItem>
        </Select>
      </FormControl>

      {/* Date de publication */}
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={schedule}
              onChange={handleScheduleChange}
            />
          }
          label="Planifier la publication"
        />
        {schedule ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date et heure de publication"
              value={selectedDate}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true, sx: { mt: 2 } } }}
            />
          </LocalizationProvider>
        ) : (
          <TextField
            label="Date actuelle de publication"
            value={dayjs().format("DD-MM-YYYY - HH:mm")}
            fullWidth
            disabled
            sx={{ mt: 2 }}
          />
        )}
      </Box>

      {/* Produit en vedette */}
      <FormControlLabel
        control={
          <Checkbox
            name="featured"
            color="primary"
          />
        }
        label="Définir comme produit en vedette"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default ProductPublicationSettings;
