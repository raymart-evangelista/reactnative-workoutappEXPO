import { AuthContext } from "../contexts/AuthContext"

export default function ProfileScreen({ navigation }) {
  const currentUser = useContext(AuthContext)
  console.log(currentUser)
  return (
    <View>
    </View>
  )
}