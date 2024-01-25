'use client'

import Image from 'next/image'
import React from 'react'
import classes from './index.module.scss'
import { useAuth } from '../../../_providers/Auth'

export const UserInfo = () => {

  const {user} = useAuth();

  return (
    <div className={classes.profile}>
      <Image src="/assets/icons/profile.svg" alt='profile' width={50} height={50} />

      <div className={classes.profileInfo}>
        <p className={classes.name}>{user?.name}</p>
        <p className={classes.email}>{user?.email}</p>
      </div>
    </div>
  )
}
