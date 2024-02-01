import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { NavigationState } from './types';
import { TOKEN_KEY, storage } from 'src/client/storahe';

export const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = storage.get(TOKEN_KEY);
  //console.log("ProtectedRoute token=",{token})
  const location = useLocation();
  //console.log("ProtectedRoute location=",{location})
  if (token) return <>{children}</>;
  return <Navigate to="/auth" state={{ from: location } as NavigationState} replace />;
};
