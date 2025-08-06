import { useQuery } from '@apollo/client';
import { Box, Typography, CircularProgress } from '@mui/material';
import { GET_HELLO_WORLD } from '~/shared/queries';

const Home = () => {
  const { data, loading, error } = useQuery(GET_HELLO_WORLD);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="16px">
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box
      padding="16px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
    >
      <Typography variant="h2" component="h1" gutterBottom>
        {data?.helloWorld?.message || 'Hello World'}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        This message is fetched from the GraphQL backend!
      </Typography>
    </Box>
  );
};

export default Home;
