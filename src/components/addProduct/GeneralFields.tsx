import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PriceFields from "./PriceFields";
import SchedulesFields from "./SchedulesFields";
import { useProductContext } from "pages/products/useProductContext";

interface FileData {
  id: number;
  name: string;
  url: string;
}

const GeneralFields: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1024));
  const { productData, setProductData } = useProductContext();

  // States locaux indépendants du contexte
  const [url, setUrl] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Acheter le produit");
  const [files, setFiles] = useState<FileData[]>([]);
  const [downloadLimit, setDownloadLimit] = useState("");
  const [downloadExpiry, setDownloadExpiry] = useState("");

  // Gestion des fichiers téléchargeables
  const handleAddFile = () => {
    setFiles(prevFiles => [
      ...prevFiles,
      { id: Date.now(), name: "", url: "" }
    ]);
  };

  const handleRemoveFile = (id: number) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const handleFileChange = (
    id: number,
    field: keyof FileData,
    value: string
  ) => {
    setFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === id ? { ...file, [field]: value } : file
      )
    );
  };

  const handleSelectFile = (id: number) => {
    const selectedFile = {
      name: "Fichier sélectionné",
      url: "https://example.com/fichier"
    };
    setFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === id ? { ...file, ...selectedFile } : file
      )
    );
  };

  return (
    <Fade
      in
      timeout={800}
      unmountOnExit
      mountOnEnter>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: 2
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}>
          <PriceFields />
          <SchedulesFields />
        </Box>

        <Box sx={{ flexGrow: 1, mt: isSmallScreen ? 2 : 0 }}>
          <Fade
            in={productData.type === "external"}
            mountOnEnter
            unmountOnExit
            timeout={800}>
            <Box>
              <TextField
                label="URL du produit"
                placeholder="https://"
                fullWidth
                value={url}
                onChange={e => setUrl(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography
                variant="body2"
                color="textSecondary">
                Saisir l'URL externe vers le produit.
              </Typography>

              <TextField
                label="Libellé du bouton"
                placeholder="Acheter le produit"
                fullWidth
                value={buttonLabel}
                onChange={e => setButtonLabel(e.target.value)}
                sx={{ mt: 2, mb: 2 }}
              />
              <Typography
                variant="body2"
                color="textSecondary">
                Ce texte sera visible dans le bouton de lien vers le produit
                externe.
              </Typography>
            </Box>
          </Fade>
          <Collapse
            in={productData.type === "simple" && productData.downloadable}
            mountOnEnter
            unmountOnExit>
            <DownloadableFiles
              files={files}
              handleAddFile={handleAddFile}
              handleRemoveFile={handleRemoveFile}
              handleFileChange={handleFileChange}
              handleSelectFile={handleSelectFile}
              isSmallScreen={isSmallScreen}
            />
            {/* Limite et expiration de téléchargement */}
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Limite de téléchargement"
                fullWidth
                placeholder="Illimitée"
                value={downloadLimit}
                onChange={e => setDownloadLimit(e.target.value)}
                helperText="Laissez vide pour les téléchargements illimités."
                sx={{ mb: 2 }}
              />
              <TextField
                label="Expiration du téléchargement"
                fullWidth
                placeholder="Jamais"
                value={downloadExpiry}
                onChange={e => setDownloadExpiry(e.target.value)}
                helperText="Saisissez le nombre de jours avant qu’un lien de téléchargement n’expire, ou laissez vide."
              />
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Fade>
  );
};

export default GeneralFields;

// Composant des fichiers téléchargeables
const DownloadableFiles = ({
  files,
  handleAddFile,
  handleRemoveFile,
  handleFileChange,
  handleSelectFile,
  isSmallScreen
}: {
  files: FileData[];
  handleAddFile: () => void;
  handleRemoveFile: (id: number) => void;
  handleFileChange: (id: number, field: keyof FileData, value: string) => void;
  handleSelectFile: (id: number) => void;
  isSmallScreen: boolean;
}) => (
  <TableContainer
    component={Paper}
    sx={{ mb: 2, maxHeight: 300, width: "100%" }}>
    <Table
      aria-label="file table"
      stickyHeader
      size="small"
      sx={{ width: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell colSpan={12}>Fichiers téléchargeables</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {files.map(file => (
          <TableRow
            hover
            key={file.id}
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row"
            }}>
            <TableCell sx={{ width: "100%" }}>
              <TextField
                fullWidth
                size="small"
                value={file.name}
                onChange={e =>
                  handleFileChange(file.id, "name", e.target.value)
                }
                placeholder="Nom du fichier"
              />
            </TableCell>
            <TableCell sx={{ width: "100%" }}>
              <TextField
                fullWidth
                size="small"
                value={file.url}
                onChange={e => handleFileChange(file.id, "url", e.target.value)}
                placeholder="URL du fichier"
              />
            </TableCell>
            <TableCell sx={{ width: "100%" }}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                gap={1}
                mt={1}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<AttachFileIcon />}
                  onClick={() => handleSelectFile(file.id)}>
                  Choisir un fichier
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveFile(file.id)}
                  size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell
            colSpan={3}
            align="center">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddFile}>
              Ajouter un fichier
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);
