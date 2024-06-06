import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const API_HISTORY = 'http://localhost:5000/api/history';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(API_HISTORY);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Historial de Búsquedas
      </Typography>
      {history.length === 0 ? (
        <Typography variant="body1" align="center">
          No hay búsquedas en el historial.
        </Typography>
      ) : (
        history.map((search) => (
          <Box key={search._id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6">
              {search.city}, {search.country}
            </Typography>
            <Typography variant="body1">
              Temperatura: {search.temperature} °C
            </Typography>
            <Typography variant="body1">
              Condición: {search.conditionText}
            </Typography>
            <Typography variant="caption">
              Fecha: {new Date(search.date).toLocaleString()}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default History;
