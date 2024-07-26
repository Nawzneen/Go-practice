import React from "react";
import { Flex, Input, Button, Spinner } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

const TodoForm = () => {
  const [newTodo, setNewTodo] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const createTodo = async (e: React.FormEvent) => {
    setIsPending(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          body: newTodo,
        }),
      });
      console.log("response", response);
      if (response.ok) {
        console.log("Test");
        alert("Todo Added");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPending(false);
    }
  };
  //   const queryClient = useQueryClient();

  //   const { mutate: createTodo, isPending: isCreating } = useMutation({
  //     mutationKey: ["createTodo"],
  //     mutationFn: async (e: React.FormEvent) => {
  //       e.preventDefault();
  //       try {
  //         const res = await fetch(`http://localhost:5000/api/todos`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //           body: JSON.stringify({ body: newTodo }),
  //         });
  //         const data = await res.json();

  //         if (!res.ok) {
  //           throw new Error(data.error || "Something went wrong");
  //         }

  //         setNewTodo("");
  //         return data;
  //       } catch (error) {

  //         // throw new Error(error);
  //       }
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["todos"] });
  //     },
  //     onError: (error: Error) => {
  //       alert(error.message);
  //     },
  //   });
  return (
    <div className="bg-green-100 p-4 rounded-xl">
      <h2 className="font-bold text-2xl mb-4">Add your todo here</h2>
      <form onSubmit={createTodo}>
        <Flex>
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            ref={(input) => input && input.focus()}
          />
          <Button type="submit" _active={{ transform: "scale(.97)" }}>
            {isPending ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default TodoForm;
