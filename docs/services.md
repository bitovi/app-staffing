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
We currently have a page on our Staffing-App Wiki dedicated to formatting expecations https://github.com/bitovi/app-staffing/wiki/API-Specifications <br/>
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

Our endpoint hooks (useEmployees, useSkills, etc) are all built on our useRest hook for the time-being, which useRest itself actually <br/>
implements SWR's useSWR hook. The methods returned from useRest are implementations of SWR's [mutate](https://swr.vercel.app/docs/mutation) <br/>
object that returns from the useSWRConfig() hook. The methods themselves return different values, but the purpose of Mutate is to update <br/>
the local cache pertaining to the unique key passed to it, and this is how we hook into SWR's stateful data fetching.<br/>

Therefore, for example, when we call

```tsx
import { useEmployees } 'some/pathway/to/services/api'

const Component = (): JSX.Element => {
    const { Employees, addEmployee } = useEmployees()
}
```

"Employees" will be a stateful value that will be "Stale While Revalidate" whenever we utilize other methods from the useEmployees hook,<br/>
such as addEmployee. When we call addEmployee with a new employee, the data will be added to the key-specific Employees cache, and update </br>
Employees.

The SWR library configures its initial cache for the specific key based on the response object from the service layer -- the specific mock <br/>
API endpoint generated by our requestCreator file. Therefore, it's important to note that the initial cache value for each endpoint hook <br/>
is the value returned from the mock API GET endpoint, and any value changes thereafter through the mutate method will happen inside of the useRest </br>
file.

Our end
[Mutations](https://swr.vercel.app/docs/mutation)