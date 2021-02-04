import {withRouter} from 'react-router-dom';

function MainPage({history}) {
  return (
    <div>
      <button onClick={() => history.push('/login')}>Go to login</button>
    </div>
  );
}

export default withRouter(MainPage);
