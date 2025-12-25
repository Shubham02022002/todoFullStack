const Todos = ({ todos }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <span>{todo.completed ? "✅ Completed" : "⏳ Pending"}</span>
        </div>
      ))}
    </div>
  );
};

export default Todos;
