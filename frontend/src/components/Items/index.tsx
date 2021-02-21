import React, { Fragment} from "react";

import Create from './Create';
import ItemsList from './List';
import checkAuth from '../../checkAuth';

const Index = () => {
  return (
    <Fragment>
      <Create />
      <ItemsList />
    </Fragment>
  )
};

export default checkAuth(Index);
