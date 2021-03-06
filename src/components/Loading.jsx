import React from 'react';

import { makeStyles } from 'styles';
import { fonts } from 'styles';

import Icon from '@mdi/react';
import { mdiHexagonOutline } from '@mdi/js';

const styles = makeStyles({
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginLeft: 10,
    fontFamily: fonts.andaleMono,
    fontSize: 28,
  },
});

export default function Loading() {
  return (
    <div className={styles('loading')}>
      <Icon size="36px" path={mdiHexagonOutline} spin />
      <div className={styles('text')}>Loading...</div>
    </div>
  );
}
