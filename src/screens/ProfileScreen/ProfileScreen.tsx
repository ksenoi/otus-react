import React from 'react';
import { Profile } from "src/server.types";
import { useCustomFetch } from 'src/client/myCustomFetch';
import {ProfileForm} from 'src/components/Forms/ProfileForm/ProfileForm'
import {FormWrapper} from 'src/components/FormWrapper/FormWrapper'

export const ProfileScreen = () => {
  const {data, loading, error} = useCustomFetch<Profile>('profile');

  return (
    <FormWrapper error={error} loading={loading}>
       <ProfileForm data={data}/>
    </FormWrapper>
  );
};

export default ProfileScreen;