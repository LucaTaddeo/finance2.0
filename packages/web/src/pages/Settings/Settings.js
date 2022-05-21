import React from 'react';
import CenteredPageLayout from "../../components/CenteredPageLayout";
import useMobileDetect from 'use-mobile-detect-hook';
import {Button} from "@nextui-org/react";
import useAuth from "../../helpers/useAuth";

const Settings = (props) => {
    const device = useMobileDetect();
    const auth = useAuth();
  return (
   <CenteredPageLayout title={"Settings"}>
       {device.isMobile() && <Button ghost style={{width:"100%"}} onClick={() => auth.logout()}>Logout</Button>}
   </CenteredPageLayout>
  );
}

export default Settings;