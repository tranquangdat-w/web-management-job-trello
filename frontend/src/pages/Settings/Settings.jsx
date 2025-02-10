import { useLocation } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import { Account } from './Account'
import { Security } from './Security'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SecurityIcon from '@mui/icons-material/Security'
import { Link } from 'react-router-dom'

export const Settings = () => {
  const location = useLocation()

  const getDefaultTabFromURL = () => {
    if (location.pathname === '/setting/account') {
      return '1'
    }

    return '2'
  }

  const [tab, setTab] = useState(getDefaultTabFromURL())

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <AppBar />
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Tab">
            <Tab
              icon={<AccountCircleIcon />}
              iconPosition="start"
              label="Account"
              value="1"
              component={Link}
              to="/setting/account" />
            <Tab
              icon={<SecurityIcon />}
              iconPosition="start"
              label="Security"
              value="2"
              component={Link}
              to="/setting/security" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Account />
        </TabPanel>

        <TabPanel value="2">
          <Security />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

