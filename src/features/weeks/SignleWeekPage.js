import { Text } from "react-native-paper";
import { useSelector } from "react-redux";

export const SingleWeekPage = ({ match }) => {
  const { weekId } = match.params

  const week = useSelector(state => state.weeks.find(week => week.id === weekId))

  if (!week) {
    return (
      <>
        <Text>Week not found!</Text>
      </>
    )
  }

  return (
    <>
      <Text>{week.id}</Text>
    </>
  )
}