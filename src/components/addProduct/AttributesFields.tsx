import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Collapse,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useProductContext } from "pages/products/useProductContext";

interface Attribute {
  id: number;
  name: string;
  options: string[];
  position: number;
  visible: boolean;
  variation: boolean;
  isExpanded: boolean;
}

const AttributesFields: React.FC = () => {
  const { productData, setProductData } = useProductContext();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [existingAttribute, setExistingAttribute] = useState("");

  const handleAddAttribute = () => {
    if (newAttributeName.trim()) {
      const newAttribute: Attribute = {
        id: Date.now(),
        name: newAttributeName,
        options: [],
        position: attributes.length + 1,
        visible: true,
        variation: false,
        isExpanded: false
      };
      setAttributes([...attributes, newAttribute]);
      setNewAttributeName("");
    }
  };

  const handleToggleExpand = (id: number) => {
    setAttributes(attributes =>
      attributes.map(attr =>
        attr.id === id ? { ...attr, isExpanded: !attr.isExpanded } : attr
      )
    );
  };

  const handleRemoveAttribute = (id: number) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
  };

  const handleSaveAttributes = () => {
    // Sauvegarder les attributs dans le contexte du produit
    setProductData(prevData => ({
      ...prevData,
      attributes: attributes.map(attr => ({
        id: attr.id,
        name: attr.name,
        options: attr.options,
        position: attr.position,
        visible: attr.visible,
        variation: attr.variation
      }))
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}>
        <Typography variant="subtitle1">
          Ajouter les informations descriptives que les clients vont utiliser
          pour trouver ce produit sur votre boutique, tel que « matière » ou «
          marque ».
        </Typography>
        <IconButton onClick={() => setAttributes([])}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Ajouter un nouvel attribut"
          value={newAttributeName}
          onChange={e => setNewAttributeName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddAttribute}>
          Ajouter
        </Button>
      </Box>

      <FormControl
        fullWidth
        sx={{ mb: 2 }}>
        <InputLabel>Ajouter existant</InputLabel>
        <Select
          value={existingAttribute}
          onChange={e => setExistingAttribute(e.target.value)}>
          <MenuItem value="matiere">Matière</MenuItem>
          <MenuItem value="marque">Marque</MenuItem>
          <MenuItem value="taille">Taille</MenuItem>
        </Select>
      </FormControl>

      {attributes.map(attribute => (
        <Box
          key={attribute.id}
          sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <Typography variant="subtitle2">{attribute.name}</Typography>
            <Box>
              <IconButton
                onClick={() => handleToggleExpand(attribute.id)}
                size="small">
                <ExpandMoreIcon
                  sx={{
                    transform: attribute.isExpanded
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s"
                  }}
                />
              </IconButton>
              <IconButton onClick={() => handleRemoveAttribute(attribute.id)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Collapse in={attribute.isExpanded}>
            <TextField
              label="Options (séparées par des virgules)"
              fullWidth
              multiline
              value={attribute.options.join(", ")}
              onChange={e =>
                setAttributes(attributes =>
                  attributes.map(attr =>
                    attr.id === attribute.id
                      ? {
                          ...attr,
                          options: e.target.value
                            .split(",")
                            .map(opt => opt.trim())
                            .filter(opt => opt !== "")
                        }
                      : attr
                  )
                )
              }
              sx={{ mt: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={attribute.visible}
                  onChange={e =>
                    setAttributes(attributes =>
                      attributes.map(attr =>
                        attr.id === attribute.id
                          ? { ...attr, visible: e.target.checked }
                          : attr
                      )
                    )
                  }
                />
              }
              label="Visible sur la page du produit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={attribute.variation}
                  onChange={e =>
                    setAttributes(attributes =>
                      attributes.map(attr =>
                        attr.id === attribute.id
                          ? { ...attr, variation: e.target.checked }
                          : attr
                      )
                    )
                  }
                />
              }
              label="Utiliser pour les variations"
            />
          </Collapse>
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSaveAttributes}>
          Enregistrer les attributs
        </Button>
      </Box>
    </Box>
  );
};

export default AttributesFields;
