import React, { useState, useEffect } from "react";
import { Box, FormControlLabel, Switch, Collapse } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useProductContext } from "pages/products/useProductContext";

interface ScheduleFieldsProps {
  label?: string; // Permet de personnaliser l'étiquette du commutateur
}

const SchedulesFields: React.FC<ScheduleFieldsProps> = ({
  label = "Planifier la promo"
}) => {
  const { productData, setProductData } = useProductContext();
  const [schedule, setSchedule] = useState(false);

  const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchedule(event.target.checked);
    // Réinitialiser uniquement si le planning est désactivé
    if (!event.target.checked) {
      setProductData(prevData => ({
        ...prevData,
        date_on_sale_from: null,
        date_on_sale_to: null
      }));
    }
  };

  const handleDateChange = (
    name: "date_on_sale_from" | "date_on_sale_to",
    value: Dayjs | null
  ) => {
    // Vérifier que la date est valide avant de la sauvegarder
    setProductData(prevData => ({
      ...prevData,
      [name]: value && value.isValid() ? value.toISOString() : null // Sauvegarde uniquement si la date est valide
    }));
  };

  useEffect(() => {
    // Si les dates sont définies, active le planning automatiquement
    if (productData.date_on_sale_from || productData.date_on_sale_to) {
      setSchedule(true);
    }
  }, [productData.date_on_sale_from, productData.date_on_sale_to]);

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={schedule}
            onChange={handleScheduleChange}
          />
        }
        label={label} // Utilisation de la propriété label
      />
      <Collapse
        in={schedule}
        mountOnEnter
        unmountOnExit>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Début de la promotion"
            value={
              productData.date_on_sale_from
                ? dayjs(productData.date_on_sale_from)
                : null
            }
            onChange={(newValue: Dayjs | null) =>
              handleDateChange("date_on_sale_from", newValue)
            }
            slotProps={{ textField: { fullWidth: true, sx: { mt: 2 } } }}
          />
          <DatePicker
            label="Fin de la promotion"
            value={
              productData.date_on_sale_to
                ? dayjs(productData.date_on_sale_to)
                : null
            }
            onChange={(newValue: Dayjs | null) =>
              handleDateChange("date_on_sale_to", newValue)
            }
            slotProps={{ textField: { fullWidth: true, sx: { mt: 2 } } }}
          />
        </LocalizationProvider>
      </Collapse>
    </Box>
  );
};

export default SchedulesFields;
