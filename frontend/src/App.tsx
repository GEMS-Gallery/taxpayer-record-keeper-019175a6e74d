import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

function App() {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTid, setSearchTid] = useState('');
  const [searchResult, setSearchResult] = useState<TaxPayer | null>(null);

  const { control, handleSubmit, reset } = useForm<TaxPayer>();

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    setLoading(true);
    try {
      const result = await backend.getTaxPayers();
      setTaxPayers(result);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TaxPayer) => {
    setLoading(true);
    try {
      await backend.addTaxPayer(data.tid, data.firstName, data.lastName, data.address);
      reset();
      fetchTaxPayers();
    } catch (error) {
      console.error('Error adding tax payer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTid) return;
    setLoading(true);
    try {
      const result = await backend.searchTaxPayer(searchTid);
      setSearchResult(result || null);
    } catch (error) {
      console.error('Error searching tax payer:', error);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        TaxPayer Management System
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            TaxPayer Records
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>TID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taxPayers.map((taxPayer) => (
                  <TableRow key={taxPayer.tid}>
                    <TableCell>{taxPayer.tid}</TableCell>
                    <TableCell>{taxPayer.firstName}</TableCell>
                    <TableCell>{taxPayer.lastName}</TableCell>
                    <TableCell>{taxPayer.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {loading && <CircularProgress />}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Add New TaxPayer
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="tid"
              control={control}
              defaultValue=""
              rules={{ required: 'TID is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="TID"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'First Name is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: 'Last Name is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: 'Address is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Add TaxPayer'}
            </Button>
          </form>
          <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>
            Search TaxPayer
          </Typography>
          <TextField
            label="Search by TID"
            fullWidth
            margin="normal"
            value={searchTid}
            onChange={(e) => setSearchTid(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSearch}
            disabled={loading || !searchTid}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
          {searchResult && (
            <div style={{ marginTop: '1rem' }}>
              <Typography variant="subtitle1">Search Result:</Typography>
              <Typography>TID: {searchResult.tid}</Typography>
              <Typography>Name: {searchResult.firstName} {searchResult.lastName}</Typography>
              <Typography>Address: {searchResult.address}</Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
