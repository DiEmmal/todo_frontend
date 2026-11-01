import { CustomHeader } from "./shared/components/CustomHeader";
import { TodoContainer } from "./todo/components/TodoContainer";

export function App() {
  return (
    <>
      <CustomHeader title={"Todo web app"} />
      <TodoContainer />
    </>
  );
}
