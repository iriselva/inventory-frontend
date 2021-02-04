import {withRouter} from 'react-router-dom';

function FrontPage({history}) {
  return (
    <div>
      <button onClick={() => history.push('/login')}>Go to login</button>
    </div>
  );
}

export default withRouter(FrontPage);
