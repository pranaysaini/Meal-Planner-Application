import React, { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  Tab,
  Tabs,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import { 
  Edit,
  Favorite,
  CalendarToday,
  Delete,
  Person,
  Email,
  Lock
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser, updateUser, deleteUser } from '../utils/api';
import ChangePasswordDialog from './ChangePasswordDialog';
import EditProfileDialog from './EditProfileDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
  tabPanel: {
    padding: theme.spacing(2),
  },
  recipeCard: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  recipeImage: {
    width: 100,
    height: 100,
    objectFit: 'cover',
  },
  recipeContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const classes = useStyles();
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const updatedUser = await updateUser(updatedData);
      setUser(updatedUser);
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleChangePassword = async (passwordData) => {
    try {
      await updateUser({ password: passwordData.newPassword });
      setOpenPasswordDialog(false);
      // Optionally show success message
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      try {
        await deleteUser();
        logout();
        // Redirect happens automatically via AuthContext
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  if (loading) {
    return <Typography>Loading profile...</Typography>;
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper elevation={3}>
        <div className={classes.profileHeader}>
          <Avatar 
            alt={user.username} 
            src={user.avatar || ''} 
            className={classes.avatar}
          />
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user.email}
          </Typography>
          <Box mt={2}>
            <Button 
              variant="outlined" 
              startIcon={<Edit />}
              onClick={() => setOpenEditDialog(true)}
            >
              Edit Profile
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Lock />}
              onClick={() => setOpenPasswordDialog(true)}
              style={{ marginLeft: 8 }}
            >
              Change Password
            </Button>
          </Box>
        </div>

        <Divider />

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Saved Recipes" icon={<Favorite />} />
          <Tab label="Meal Plans" icon={<CalendarToday />} />
          <Tab label="Account Info" icon={<Person />} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>Saved Recipes</Typography>
          {user.savedRecipes?.length > 0 ? (
            <List>
              {user.savedRecipes.map((recipe) => (
                <ListItem key={recipe.recipeId} button>
                  <ListItemAvatar>
                    <Avatar alt={recipe.title} src={recipe.image} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={recipe.title} 
                    secondary={`Recipe ID: ${recipe.recipeId}`} 
                  />
                  <IconButton edge="end">
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No saved recipes yet</Typography>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>Meal Plans</Typography>
          {user.mealPlans?.length > 0 ? (
            <Grid container spacing={2}>
              {user.mealPlans.map((plan, index) => (
                <Grid item xs={12} key={index}>
                  <Paper elevation={2} style={{ padding: 16 }}>
                    <Typography variant="h6">
                      Week of {new Date(plan.weekStart).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {plan.days.length} days planned
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No meal plans created yet</Typography>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>Account Information</Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Username" secondary={user.username} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Email />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CalendarToday />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary="Member Since" 
                secondary={new Date(user.createdAt).toLocaleDateString()} 
              />
            </ListItem>
          </List>
          <Box mt={4}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Box>
        </TabPanel>
      </Paper>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        user={user}
        onSave={handleUpdateProfile}
      />

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        onChangePassword={handleChangePassword}
      />
    </Container>
  );
};

export default Profile;