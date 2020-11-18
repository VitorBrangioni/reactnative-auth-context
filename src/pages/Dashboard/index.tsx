import React, {useContext} from 'react';
import {View, Button} from 'react-native';

import AuthContext from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const {signOut} = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <View>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Dashboard;
