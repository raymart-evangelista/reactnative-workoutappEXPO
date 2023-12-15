- ISSUES
  - UI shows success even though it should fail when user already exists in DB
  - When days are added to the DB, going back to AddWeeksScreen and doing either will clear the days from the DB:
    - 1. Selecting a week
    - 2. Adding a new week
  - When adding/removing a new week/day/exercise, the backend doesn't update the correct index

- TODO
  - add settings screen for user to switch between dark/light mode
  - change design of screens handling data--instead pass params back to MAIN screen where the user can click
  - fix UI/UX
    - styling
      - cards should look nicer
    - buttons/clickable entities
      - must be accessible
  - work on..
    - update ui/ux
      - Home screen
      - Create program screen
      - All programs screen
      - ... more
    - add in login functionality before adding recent programs and more
    - add more functionality
      - recent programs
  SAVE
    - use [this video](https://www.youtube.com/watch?v=LngU_qwAhQA) as reference for passing params to previous screen

- LEARNING OUTCOMES
  - when adding functionality that works by calling the backend, first start with the server folder by creating the backend routes, middleware, utils. second, start creating the frontend services that talk with both the backend and frontend. third, create hooks if necessary. fourth, implement frontend and add useStates and functions necessary for working through the chain.

- RESOURCES
  - Context API
    - [react.dev useContext](https://react.dev/reference/react/useContext)
    - [react.dev createContext](https://react.dev/reference/react/createContext)
    - [Guide to React Context API in Functional Components](https://dev.to/danireptor/guide-to-react-context-api-on-functional-components-1kj4)