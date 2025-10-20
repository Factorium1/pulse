'use client'

import { getVersions } from './getVersions'
import { useState, useEffect } from 'react'

const showVersions = (os: string) => {
  // const [versions, setVersions] = useState([]:string[]);
  // useEffect(() => {
  //   setVersions(getVersions(os));
  // }, [os]);
  // return (
  //   versions.map((version) => (
  //     <option value={version} key={version}>
  //       {version}
  //     </option>
  //   ))
  // );
}

export default showVersions
