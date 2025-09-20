import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleIconProps {
  size?: number;
  className?: string;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({ size = 18, className }) => {
  return <FcGoogle size={size} className={className} />;
};

export default GoogleIcon;
