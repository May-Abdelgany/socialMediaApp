import { useAppSelector } from "../user/hooks";
import { selectUser } from "../user/userSelectors";

export function Homepage() {
  const user = useAppSelector(selectUser);
  return (
    <div>
      <h1>Welcome to the Homepage {user?.nameEn}</h1>
      <p>This is the main landing page of the application.</p>
    </div>
  );
}
