import {withRouter} from 'react-router-dom';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import "./table.css";


const service = {
  fetchItems: ({token}) => {
      return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/inventory`, {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }})
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            console.log({response})

            const err = new Error();
            err.status = response.status;
            reject();
          }
          return response.json();
        })
        .then((response) => {
          resolve(response);
        })
      })
    },
  create: (item, token) => {
    const data = JSON.stringify({...item, image: 'none'});

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: data,
    }
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/inventory`, requestOptions)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          console.log({response})

          const err = new Error();
          err.status = response.status;
          throw err;
        }
        return response.json();
      });
  },
  update: (item, token) => {
    const data = JSON.stringify(item);

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: data,
    }

    return fetch(`${process.env.REACT_APP_BACKEND_URL}/inventory/${item.id}`, requestOptions)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          console.log({response})
          const err = new Error();
          err.status = response.status;
          throw err;
        }
        return response.json();
      });
  },
  delete: (item, token) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }

    return fetch(`${process.env.REACT_APP_BACKEND_URL}/inventory/${item.id}`, requestOptions)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          console.log({response})
          const err = new Error();
          err.status = response.status;
          throw err;
        }
        return response.json();
      }).then(() => {return {}});
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const MainPage = ({token}) => {
  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Tasks"
        fetchItems={payload => service.fetchItems({...payload, token})}
      >
        <Fields>
          <Field
            name="item"
            label="Item"
          />
          <Field
            name="description"
            label="Description"
          />
          <Field
            name="date"
            label="Date"
          />
          <Field 
            name="amount" 
            label="Amount"
          />
          <Field
            name="location"
            label="Location"
          />
          <Field 
            name="price" 
            label="Price"
          />
          <Field 
            name="itemType" 
            label="Type"
          />
        </Fields>
        <CreateForm
          title="Item Creation"
          message="Add a new item!"
          trigger="Add Item"
          onSubmit={item => service.create(item, token)}
          submitText="Create"
          validate={(values) => {
            const errors = {};
            if (!values.item) {
              errors.title = 'Please, provide item\'s name';
            }

            if (!values.description) {
              errors.description = 'Please, provide item\'s description';
            }

            return errors;
          }}
        />

        <UpdateForm
          title="Item Update Process"
          message="Item task"
          trigger="Update"
          onSubmit={item => service.update(item, token)}
          submitText="Update"
          validate={(values) => {
            console.log(values)
            const errors = {};

           

            return errors;
          }}
        />

        <DeleteForm
          title="Item Delete Process"
          message="Are you sure you want to delete the item?"
          trigger="Delete"
          onSubmit={item => service.delete(item, token)}
          submitText="Delete"
          validate={(values) => {
            const errors = {};
            if (!values.id) {
              errors.id = 'Please, provide id';
            }
            return errors;
          }}
        />
      </CRUDTable>
    </div>
  );
}

export default withRouter(MainPage);
