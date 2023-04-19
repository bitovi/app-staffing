# A living document for documentation on the service layer of Staffing App

# Integrated Libraries and Styles

## [SWR](https://swr.vercel.app/)

SWR, or "Stale while Revalidate", is a 3rd party library this application implements to handle stateful data fetching.

## [MSW](https://mswjs.io/)

MSW, or "Mock Service Worker", is a 3rd party API mocking library this application implements to simulate its backend server during development.

## [CANjs](https://canjs.com/)

CanJS is a 3rd party library this application implements to simulate its database, specifically through the use of the [localStore](https://canjs.com/doc/can-local-store.html) <br/>method to generate stores from fixture data that then gets exported<b>\*\*</b> as a mock consumed by the Mock Service Worker library.<br/>
<b>\*\*</b>These stores are first passed to a requestCreator function that implements the [request handler](https://mswjs.io/docs/basics/request-handler) from the MSW library to actually "mock" that specific API endpoint.

```tsx
return {
    // rest.get is an implementation of the MSW request handler
    getOne: rest.get<undefined, MockResponse<Resource>, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      async (req, res, ctx) => {
        const id = req.params.id;
        const item = await store.getData({ id });

        if (!item) {
          return res(
            ctx.status(404),
            ctx.json({
              error: `Resource ${id} not found.`,
            }),
          );
        }

        return res(
          ctx.status(200),
          ctx.json({
            data: item,
          }),
        );
      },
    ),
```

## [JSON API](https://jsonapi.org/)

JSON API is a formatting standard this application seeks to replicate with its HTTP request and response objects. <br/>
We currently have a page on Swagger dedicated to request and response object expectations https://api.dev.bitovi-staffing.com/docs/static/index.html .<br/>
A big point regarding a JSON API formatted response rather than a typical REST is that the data is contained with an object <br/>
rather than an array and joining operation results go within an "included" field:

```json
{
  "data": [
    {
      "type": "employees",
      "id": "1",
      "attributes": {
        "name": "Carl Person",
        "startDate": "",
        "endDate": ""
      },
      "relationships": {
        "skills": {
          "data": [
            { "type": "skills", "id": 1 },
            { "type": "skills", "id": 2 }
          ]
        }
      }
    },
    {
      "type": "employees",
      "id": "2",
      "attributes": {
        "name": "Greg Carlson",
        "startDate": "",
        "endDate": ""
      },
      "relationships": {
        "skills": {
          "data": [{ "type": "skills", "id": 2 }]
        }
      }
    }
  ],
  "included": [
    {
      "type": "skills",
      "id": "1",
      "attributes": {
        "name": "React"
      }
    },
    {
      "type": "skills",
      "id": "2",
      "attributes": {
        "name": "UX"
      }
    }
  ]
}
```

# Notes on Integration

Our endpoint hooks (useEmployees, useSkills, etc) are all built on our src/services/api/restBuilder file. restBuilder returns three <br/>
hooks: useRestOne, useRestList, useRestActions, which correspond to GET /endpoint/:id, GET /endpoint, and three HTTP request actions: <br/>
POST (handleAdd), PATCH (handleUpdate), and DELETE (handleDelete), respectively. The former two hooks, useRestOne and useRestList, implement <br/>
SWR's useSWR hook, which provides response data in the style of "stale-while-revalidate". This response data will be the data periodically <br/>
refreshed by SWR requests to the server. The latter hook, useRestActions, returns the aformentioned HTTP request actions each of which implement <br/>
SWR's [mutate](https://swr.vercel.app/docs/mutation) object that returns from the useSWRConfig() hook. The methods themselves return different values, either void or string, <br/> but the purpose of Mutate is to update the SWR cache pertaining to the unique key passed to it, and this is how we hook into SWR's <br/>
stateful data fetching.

Therefore, for example, when we call

```tsx
import { useEmployees } 'some/pathway/to/services/api'

const Component = (): JSX.Element => {
    const { useEmployeeList, useEmployeeActions } = useEmployees()
    const { data: employees } = useEmployeeList();
}
```

"useEmployeeList" will be a hook function that when called will return a value, "employees", that will be "Stale While Revalidate" whenever we utilize <br/>other methods from the useEmployeeActions hook, such as addEmployee. When we call addEmployee with a new employee, the data will be added <br/> both to the key-specific cache array of employees as well as a resource-specific cache entry for the new employee, and the Employees array will then be updated with <br/>
the new entry WITHOUT creating an additional GET request to the server.

The SWR library configures its initial cache for the specific key based on the response object from the service layer -- the specific mock <br/>
API endpoint generated by our requestCreator file. Therefore, it's important to note that the initial cache value for each endpoint hook <br/>
is the value returned from the mock API GET endpoint, and any value changes thereafter through the mutate method will happen inside of the useRest <br />
file.

In order to circumvent storing our SWR cache data in the shape of the server and rather keep it in the shape consumable by components, we implemeneted <br/>
[json-api-serializer](https://github.com/danivek/json-api-serializer#readme) in order to **deserialize** our response objects from the server within our fetcher function inside src/services/api/shared.ts. This deserializer will flatten the JSON API formatted response data:

```tsx
{
  data: {
    type: "Employee",
    id: "2",
    attributes: {
      name: "Apple Seed",
      start_date: '',
      end_date: '',
    },
    relationships: {
      skills: {
        data: [
          {
            type: "Skill",
            id: "3",
          }
        ]
      }
    }
  },
  included: {
    type: "Skill",
    id: "3",
    attributes: {
      name: "React",
    }
  }
}
```

into:

```tsx
{
  data: {
    id: "2",
    name: "Apple Seed",
    start_date: '',
    end_date: '',
    skills: [
      {
        id: "3",
        name: "React",
      }
    ]
  }
}
```

as the deserializer will utilize the included field to hydrate the flattened out fields within relationships, at the same time ommitting the "type" property.
<br/><br/>
**NOTE** Were an included field not attached here, and the response object was simply the data field, the resulting object would have

```tsx
{
  data: {
    ...
    skills: [
      {
        type: "Skill",
        id: "3",
      }
    ]
  }

}
```

and the skills array would not be hydrated with attribute information like "name". <br/>

GET requests which stipulate an "included" parameter, such as:

```
GET /employees?included=skills
```
