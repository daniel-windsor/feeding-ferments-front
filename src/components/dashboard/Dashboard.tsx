import React from 'react'

import { useFirebaseStore } from '../../store'

const Dashboard = () => {
  const { user } = useFirebaseStore()

  return (
    <h1>{user?.displayName}</h1>
  )
}

export default Dashboard