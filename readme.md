- ISSUES
  - UI shows success even though it should fail when user already exists in DB
  - When days are added to the DB, going back to AddWeeksScreen and doing either will clear the days from the DB:
    - 1. Selecting a week
    - 2. Adding a new week
  - When adding/removing a new week/day/exercise, the backend doesn't update the correct index

- TODO
  - change design of screens handling data--instead pass params back to MAIN screen where the user can click
  - fix UI/UX
    - styling
      - cards should look nicer
    - buttons/clickable entities
      - must be accessible
  SAVE
    - use [this video](https://www.youtube.com/watch?v=LngU_qwAhQA) as reference for passing params to previous screen